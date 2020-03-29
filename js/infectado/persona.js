function aleatorio(piso,techo){
	return Math.floor(Math.random() * (techo - piso + 1)) + piso;
}

function Persona(x,y){
	this.imgPersona = $("#persona")[0];
    this.imgInfectado = $("#infectado")[0];	
    this.width=$('#mi_canvas').width();
    this.height=$('#mi_canvas').height();
    
	this.x = aleatorio(0,this.width);
    this.y = aleatorio(0,this.height);
    //this.x = aleatorio(0,1000);
	//this.y = aleatorio(0,500);
    this.velocidad = 0;
    this.infectado=false;
    this.inmune=false;
    this.tiempoMax=300;
    this.cont=0;
    this.controlY=Math.floor((Math.random() * 1) + 0);
 
        // controlX, determina dirección vertical: 1-derecha|0-izquierda
    this.controlX=Math.floor((Math.random() * 1) + 0);


	while(this.velocidad == 0)
		this.velocidad=aleatorio(-3,3);
			
	this.dibujar = function(ctx){
        if(this.inmune==true){
            var img = this.imgPersona;
            this.cont=this.tiempoMax;
        }

        else{
            if(this.infectado==true && this.cont<this.tiempoMax){
                var img = this.imgInfectado;
                this.cont++;
            }
            else if (this.infectado==true && this.cont==this.tiempoMax){
                var img = this.imgPersona;
                this.inmune=true;
            }
            else{
                var img = this.imgPersona;
            }
        }
		
		ctx.drawImage(img,this.x,this.y);
	}
	
	this.actualizar = function(){


		this.velocidad=1;
        
        if(this.controlY==1)
        {
            this.y+=this.velocidad;
        }else{
            this.y-=this.velocidad;
        }
        if(this.y<0)
        {
            this.controlY=1;
            this.y=this.velocidad;
        }else if(this.y>=this.height){
            this.controlY=0;
            this.y=this.height;
        }

        // horizontal
        if(this.controlX==1)
        {
            this.x+=this.velocidad;
        }else{
            this.x-=this.velocidad;
        }

        if(this.x<0)
        {
            this.controlX=1;
            this.x=this.velocidad;
        }else if(this.x>=this.width){
            this.controlX=0;
            this.x=this.width;
        }
        
        
    }
    
    this.colision = function(personas){
        for(j=0;j<personas.length;j++){
            var distancia=Math.sqrt( Math.pow( (personas[j].x-this.x), 2)+Math.pow( (personas[j].y-this.y),2));
            if(distancia<20 && personas[j].infectado==true){
                this.infectado=true;
            }
            if(distancia<20 && personas[j].inmune==true){
                this.infectado=false;
            }
        }
}
}

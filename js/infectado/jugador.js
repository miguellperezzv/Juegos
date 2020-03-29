function Jugador(){
	this.x = 310;
	this.y = 15;
	this.imgJugador = $("#jugador")[0]; 
	this.imgInfectado = $("#infectado")[0];
	
	this.infectado = false;
	this.puntos = 0;
	this.seguro = "arriba";
	this.width=$('#mi_canvas').width();
    this.height=$('#mi_canvas').height();
	
	this.dibujar = function(ctx){
		if(this.infectado==true){
			var img = this.imgInfectado;
		}
		if(this.infectado==false){
			var img = this.imgJugador;
		}
		
		var x = this.x;
		var y = this.y;
		ctx.drawImage(img, x, y);
		ctx.save();
		ctx.fillStyle = "#ff0000";
		ctx.font = "12px sans-serif";
		ctx.fillText("puntos: "+ this.puntos, x, y + 65);
		
		if(this.sprite==1){
			ctx.fillStyle = "#ff0000";
			ctx.font = "20px sans-serif";
			ctx.fillText("INFECTADO", x+65, y + 25);
		}
		ctx.restore();
	}
	
	this.actualizar = function(accion){
		if(accion=="arriba" && this.y > 15){
			this.y -= 10;
			//this.sprite = 1;
		}
		if(accion=="abajo"  && this.y < this.height){
			this.y += 10;
			//this.sprite = 0;
		}
		if(accion=="izquierda"){
			this.x -= 10;
			//this.sprite = 1;
		}
		if(accion=="derecha"){
			this.x += 10;
			//this.sprite = 0;
        }
        
        
		this.x = (this.width + this.x)%this.width;
		this.y = (this.height + this.y)%this.height;
		this.puntos++;
		
	}
	
	this.colision = function(x,y){
		var distancia=Math.sqrt( Math.pow( (x-this.x), 2)+Math.pow( (y-this.y),2));
		if(distancia<this.imgJugador.width)
		   return true;
		else
		   return false;	
	}
}
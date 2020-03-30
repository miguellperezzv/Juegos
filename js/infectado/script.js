
var jugando =1;


$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	miCanvas = $("#mi_canvas")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	jugador = new Jugador();
	personas = [];

	for (j=0;j<200;j++){
		personas[j] = new Persona();
	}
	run();	
	
	$('#info').click(function(){
        alert("EVITE CONTAGIARSE");
	});
	
	$('#btnPuntajes').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
		$('.popup-overlay').height($(window).height());
		mostrarPuntaje();
		return false;
    });
    
    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });
    
    $("#iniciar").click(function(){	
		if(jugando==false)
			inicio();	
	});
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		jugador.actualizar('arriba');
	if(event.which==40 || event.which==83)
	jugador.actualizar('abajo');
	if(event.which==39 || event.which==68)
	jugador.actualizar('derecha');
	if(event.which==37 || event.which==65)
	jugador.actualizar('izquierda');
	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");
		 
	if(this.jugando==1){  
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		this.erradicado=0;
		jugador.dibujar(contextoBuffer);
		for(i=0;i<personas.length;i++){
			if(i==10){
				personas[i].infectado=true;
				
			}
			personas[i].dibujar(contextoBuffer);
			personas[i].actualizar();
			personas[i].colision(personas);
			if(jugador.colision(personas[i].x,personas[i].y)==true && personas[i].infectado ==true){
				jugador.infectado==true;
				this.jugando=2 ;
				//alert("jugadro inf");
				$('#pierde')[0].play();
			}
		}	
		//prueba comprobación ganar
		if(jugador.puntos>0){
			personasInfectadas=false;
			for(i=0;i<personas.length;i++){
				if (personas[i].infectado==true){
					personasInfectadas=true;
				}
			}
			if(personasInfectadas==false){
				console.log("NO MÁS PERSONAS INFCTADAS")
				this.jugando==3;
			}
		}
		
		
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		
	}
	
	if (this.jugando ==2){
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		
		jugador.infectado=false;
		jugador.dibujar(contextoBuffer);
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GAMEOVER", 300, 440);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "15px sans-serif";
		contextoBuffer.fillText("try again", 550, 460);
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}
	if(this.jugando==3){
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		
		jugador.infectado=false;
		jugador.dibujar(contextoBuffer);
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GANASTE!", 300, 440);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "15px sans-serif";
		contextoBuffer.fillText("PARTIDA TERMINADA", 550, 460);
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}
	
}


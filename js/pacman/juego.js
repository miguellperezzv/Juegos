var jugando;
var menu;
var gameover;
var puntajeFinal;
var teclaD;
var mensaje;
var cont;

inicio();

function inicio(){
	menu = true
	jugando = false;
	gameover = false;
	puntajeFinal = false;

	canvas = document.getElementById('micanvas');
	canvas.width = 448;
	canvas.height = 544;

	contexto = canvas.getContext("2d");
	buffer = document.createElement('canvas');

	bloques = new Bloques();
	pacman = new Pacman();
	fantasmas = [new Fantasma('rojo'),new Fantasma('rosa'),new Fantasma('azul'), new Fantasma('naranja')];
	comida = new Food();

	menu = true;
	cont = 1;
	puntaje = 0;

	run();
}

function run(){ 
	buffer.width = canvas.width;
	buffer.height = canvas.height;
	contextoBuffer = buffer.getContext("2d");

	if(menu){
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

		bloques.pintarMapa(contextoBuffer);
		comida.ponerComida(contextoBuffer);
		pacman.pintarPacman(contextoBuffer);

		ponerMenu(contextoBuffer, true);
		$('#micanvas').click(function(){
			menu = false;
			jugando = true;
			cont = 0;
		});
		
		contexto.clearRect(0,0,canvas.width,canvas.height);
		contexto.drawImage(buffer, 0, 0);	
	}
		 
	if(jugando){
		// Juego
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

		bloques.pintarMapa(contextoBuffer);

		comida.ponerComida(contextoBuffer);
		//console.log(puntaje);
		comido = comida.comer(pacman.pos_pacman, puntaje);
		puntaje = comido[0];
		fantasmaComer = comido[1];
		
		if(comida.comida.length == 0){
			comida.reiniciar();
		}

		pacman.pintarPacman(contextoBuffer);
		pacman.moverPacman();

		for(var i=0; i<fantasmas.length; i++){
			fantasmas[i].pintarFantasma(contextoBuffer);
			fantasmas[i].moverFantasma();

			if(fantasmaComer){
				// Pacman comio la galleta grande y los fantasmas pasan a su forma debil
				fantasmas[i].estado = false;
			}
			
			// Colision de pacman con los fantasmas
			if(pacman.colisionFantasma(fantasmas[i].pos_fantasma)){
				if(fantasmas[i].estado){
					// Cuando colisionan en la forma normal de los fantasmas
					jugando = false;
					gameover = true;
				}else{
					// Cuando estan en su forma debil, se reinicia al fantasma en cuestion en la base
					fantasmas[i].reiniciar();
					puntaje += 200;
				}
			}

			// Tiempo de recuperacion de los fantasmas a su forma normal
			if(!fantasmas[i].estado){
				if(cont % 1200 == 0){
					fantasmas[i].estado = true;
				}
			}
		}

		ponerPuntaje(contextoBuffer);

		// contador que ayuda a contar el tiempo de los fantasmas en su forma debil

		contexto.clearRect(0,0,canvas.width,canvas.height);
		contexto.drawImage(buffer, 0, 0);
		
	}

	if(gameover){
		// Game over
		if(pacman.vidas > 1){
			pacman.vidas--;
			jugando = true;
			gameover = false;
			reiniciar();
			mensaje = "Te quedan "+pacman.vidas+" vidas";
			alert(mensaje);
		}else{
			jugando = false;
			reiniciar();
			pacman.vidas = 4;
			comida.reiniciar();
				
			menu = false;
			gameover = false;
			puntajeFinal = true;
		}
	}

	if(puntajeFinal){
		// Se muestra la pantalla de gameover
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

		bloques.pintarMapa(contextoBuffer);
		comida.ponerComida(contextoBuffer);
		pacman.pintarPacman(contextoBuffer);

		ponerMenu(contextoBuffer, false);
		$('#micanvas').click(function(){
			// Si le dan click al canvas el juego se reinicia

			// Capturar el puntaje y guardarlo
			menu = true;
			puntajeFinal = false;
			puntaje = 0;
			cont = 0;

		});
		
		contexto.clearRect(0,0,canvas.width,canvas.height);
		contexto.drawImage(buffer, 0, 0);	
	}

	cont++;
	setTimeout("run()",10);
}

function reiniciar(){
	pacman.reiniciar();

	for(var i=0; i<fantasmas.length; i++){
		fantasmas[i].reiniciar();
	}

}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		pacman.actualizar('arriba');
	if(event.which==40 || event.which==83)
		pacman.actualizar('abajo');
	if(event.which==39 || event.which==68)
		pacman.actualizar('derecha');
	if(event.which==37 || event.which==65)
		pacman.actualizar('izquierda');
	
}

function ponerPuntaje(context){
	context.fillStyle = "green";
	context.font = "bold 18px sans-serif";
	context.fillText(puntaje, 200, 530);
}

function ponerMenu(context, main){
	context.fillStyle = "rgba(0, 0, 0, 0.8)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	logo = new Image();
	logo.src = "../imagenes/pacman/logo.png";
	context.drawImage(logo, 30, 0);

	context.fillStyle = "yellow";
	context.font = "bold 20px sans-serif";
	if(main){
		if(cont % 50 < 25)
			context.fillText("Clic para empezar", 130, 350);
	}else{
		context.fillText("Puntaje: "+puntaje, 140, 320);
		if(cont % 50 < 25)
			context.fillText("Clic para volver a jugar", 110, 350);
	}
}

document.addEventListener("keydown",capturaTeclado);

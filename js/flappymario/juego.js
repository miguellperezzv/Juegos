var jugando = false;
var contador = 0;
var habilitado = true;
var colision = false;

document.addEventListener('keydown', function(e){
  if(e.keyCode == 32 || e.keyCode == 38){
    if (contador<1){
        contador++;
    }
    jugando = true;
    if(habilitado){
      saltar();
    }
	else{
		habilitado = true;
		jugando = false;
		colision = false;
		flappy = {y: 250, vy: 0, gravedad: 1, salto: 12, vymax: 9, saltando: false};
		nivel = {velocidad:6, puntuacion: 0};
		tuboA = {x: ancho+120, y: 190};
		constante = tuboA.y + brecha;
		fondog = {x: 0, y: 0};
		tubo = [];
		tubo[0] = { x : ancho, y : 0};
		contador == 0;
	}
  }
});


var ancho=555, alto=660, suelo=544;
var canvas, contexto;
var imgFondo, imgTuboA, imgTuboB, imgTuboC, imgTuboD, imgAveA, imgAveB, imgAveC;

function cargarImagenes(){
  imgFondo = new Image();
  imgFondo.src = 'mockups/fondofinal.jpg';
  imgTuboA = new Image();
  imgTuboA.src = 'mockups/tuberia.png';
  imgTuboB = new Image();
  imgTuboB.src = 'mockups/tuberiab.png';
  imgAveA = new Image();
  imgAveA.src = 'mockups/avev11.png';
}

function inicializar(){
  canvas = document.getElementById('canvas');
  contexto = canvas.getContext('2d');
  cargarImagenes();
}

function borrarCanvas(){
  canvas.width = ancho;
  canvas.height = alto;
}

var tuboAbajoy;

var flappy = {y: 250, vy: 0, gravedad: 1, salto: 12, vymax: 9, saltando: false};
var nivel = {velocidad:6, puntuacion: 0};
var brecha = 110;
var tuboA = {x: ancho+120, y: 190};
var constante = tuboA.y + brecha;
var fondog = {x: 0, y: 0};

var tubo = [];

tubo[0] = { x : ancho, y : 0}

function dibujarFondo(){
  contexto.drawImage(imgFondo,fondog.x,0,ancho,alto,0,fondog.y,ancho,alto);
}

function logicaFondo(){
  if(fondog.x > ancho){
    fondog.x = 0;
  }else{
    fondog.x += nivel.velocidad;
  }
}



function dibujarFlappy(){
  contexto.drawImage(imgAveA,0,0,26,38,150,flappy.y,26,38);
}

function dibujarTubos(){

    for(var i = 0; i < tubo.length; i++){

        constante = imgTuboA.height + brecha;
        contexto.drawImage(imgTuboA,tubo[i].x,tubo[i].y);
        contexto.drawImage(imgTuboB,tubo[i].x,tubo[i].y + constante);
        tuboAbajoy = tubo[i].y + constante;
        tubo[i].x=tubo[i].x-10;

        if( tubo[i].x == 125 ){
            tubo.push({
                x : canvas.width,
                y : Math.floor(Math.random()*imgTuboA.height)-imgTuboA.height
            });
        }

        if(tubo[i].x <=188 && tubo[i].x >=98){
          if (flappy.y >= tubo[i].y && flappy.y <= tubo[i].y + 242 || flappy.y + 26 <= tuboAbajoy +500 && flappy.y + 26 >= tuboAbajoy){
            jugando = false;
            habilitado = false;
            flappy.gravedad = 0;
            flappy.vy = 0;
			colision = true
            contador++;
          }
		  
        }

        if(tubo[i].x == 5){
            nivel.puntuacion++;
        }



    }



}




function saltar(){
  flappy.saltando = true;
  flappy.vy = flappy.salto;
}

function gravedad(){
  if(flappy.saltando){
    if(flappy.y - flappy.vy - flappy.gravedad > suelo){
      flappy.saltando = false;
      flappy.vy = 0;
      flappy.y = suelo;
      jugando = false;
      habilitado = false;
      contador++;
    }else{
      flappy.vy -= flappy.gravedad;
      flappy.y -= flappy.vy;
    }
  }
}



function puntuacion(){
	contexto.font = "30px impact";
	contexto.fillStyle = '#FFFC33';
	contexto.fillText("Puntos:",0,50);
	contexto.fillText(`${nivel.puntuacion}`,100,50);
	if(jugando == false && habilitado == true){
		contexto.font = "30px impact";
        contexto.fillText('presione barra espaciadora',40,180)
	}
	
	if(colision == true){
		contexto.font = "60px impact";	
	    contexto.fillText('JUEGO TERMINADO',40,150);
	}
}






//------------------------------------------------------------------------------
//bucle principal

var FPS = 40;
setInterval(function(){
  principal();
},1000/FPS);

function principal(){
  borrarCanvas();
  gravedad();
  if (jugando ){
    logicaFondo();
  }
  dibujarFondo();
  if (jugando ){
    dibujarTubos();
  }
  puntuacion();
  dibujarFlappy();
  /*dibujarTuboA();*/

}

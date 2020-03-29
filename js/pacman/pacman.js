function Pacman(){
	this.pos_pacman = [13*16,23*16];
	this.pacDireccion = 0;
	this.imagen = new Image();
	this.imagen.src = "img/sprites.png";
	this.sprite = 0;
	this.vidas = 4;

	// Sprites de pacman
	this.pacman = [
		[[0,0],[1,0],[2,0],[1,0]], // Sprites derecha
		[[0,1],[1,1],[2,0],[1,1]], // Sprites izquierda
		[[0,2],[1,2],[2,0],[1,2]], // Sprites Arriba
		[[0,3],[1,3],[2,0],[1,3]]  // Sprites Abajo
	];

	this.muerte = [
		[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0]
	];

	this.pintarPacman = function(context){
		context.drawImage(this.imagen, 
			this.pacman[this.pacDireccion][Math.trunc(this.sprite%8/2)][0]*16, this.pacman[this.pacDireccion][Math.trunc(this.sprite%8/2)][1]*16, 
			16, 16, this.pos_pacman[0], this.pos_pacman[1], 32, 32);

		for(var i=1; i<this.vidas; i++){
			context.drawImage(this.imagen,
				this.pacman[0][0][0]*16, this.pacman[0][0][1]*16, 
				16, 16, i*16, 520, 16, 16);	
		}

		this.sprite++;
	}

	this.moverPacman = function(){
		if(!new Bloques().colision(this.pos_pacman, this.pacDireccion)){
			if(this.pos_pacman[1] % 16 == 0){
				if(this.pacDireccion == 0) this.pos_pacman[0]+=2;
				if(this.pacDireccion == 1) this.pos_pacman[0]-=2;
			}
			if(this.pos_pacman[0] % 16 == 0){
				if(this.pacDireccion == 2) this.pos_pacman[1]-=2;
				if(this.pacDireccion == 3) this.pos_pacman[1]+=2;
			}
		}

		if(this.pos_pacman[0] < -32){
			this.pos_pacman[0] = 448;
		}else if(this.pos_pacman[0] > 448){
			this.pos_pacman[0] = -32;
		}
	}

	this.actualizar = function(direccion){
		if(direccion == 'arriba'){
			this.pacDireccion = 2;
		}
		if(direccion == 'abajo'){
			this.pacDireccion = 3;
		}
		if(direccion == 'derecha'){
			this.pacDireccion = 0;
		}
		if(direccion == 'izquierda'){
			this.pacDireccion = 1;
		}
	}

	this.colisionFantasma = function(posFantasma){
		posCentroPacman = [this.pos_pacman[0]+16,this.pos_pacman[1]+16];
		posCentroFantasma = [posFantasma[0]+16,posFantasma[1]+16];

		if(Math.trunc(posCentroPacman[0]/16) == Math.trunc(posCentroFantasma[0]/16) && Math.trunc(posCentroPacman[1]/16) == Math.trunc(posCentroFantasma[1]/16)){
			return true;
		}

		return false;
	}

	this.reiniciar = function(){
		this.pos_pacman = [13*16,23*16];
		this.pacDireccion = 0;
		this.sprite = 0;
	}
}
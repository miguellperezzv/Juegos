function Fantasma(color){

	this.imagen = new Image();
	this.imagen.src = "img/sprites.png";

	if(color == 'rojo'){
		this.pos_fantasma = [192,224];
		this.fantasma = [
			[[0,4],[1,4]], //derecha
			[[2,4],[3,4]], //izquierda
			[[4,4],[5,4]], //arriba
			[[6,4],[7,4]]  //abajo
		];
	}else if(color == 'rosa'){
		this.pos_fantasma = [224,224];
		this.fantasma = [
			[[0,5],[1,5]], //derecha
			[[2,5],[3,5]], //izquierda
			[[4,5],[5,5]], //arriba
			[[6,5],[7,5]]  //abajo
		];
	}else if(color == 'azul'){
		this.pos_fantasma = [224,224];
		this.fantasma = [
			[[0,6],[1,6]], //derecha
			[[2,6],[3,6]], //izquierda
			[[4,6],[5,6]], //arriba
			[[6,6],[7,6]]  //abajo
		];
	}else if(color == 'naranja'){
		this.pos_fantasma = [192,224];
		this.fantasma = [
			[[0,7],[1,7]], //derecha
			[[2,7],[3,7]], //izquierda
			[[4,7],[5,7]], //arriba
			[[6,7],[7,7]]  //abajo
		];
	}

	this.fanDireccion = 0;
	this.estado = true;
	this.sprite = 0;

	this.fantasmaLoco = [
		[8,4],[9,4],[10,4],[11,4]
	];

	this.pintarFantasma = function(context){
		// Dibujar los fantasmas
		if(this.estado){
			context.drawImage(this.imagen, this.fantasma[this.fanDireccion][this.sprite%2][0]*16, this.fantasma[this.fanDireccion][this.sprite%2][1]*16, 16, 16, this.pos_fantasma[0], this.pos_fantasma[1], 32, 32);
		}else{
			context.drawImage(this.imagen, this.fantasmaLoco[Math.trunc(this.sprite%8/2)][0]*16, this.fantasmaLoco[Math.trunc(this.sprite%8/2)][1]*16, 16, 16, this.pos_fantasma[0], this.pos_fantasma[1], 32, 32);	
		}

		this.sprite++;
	}

	this.moverFantasma = function(){
		if(!new Bloques().colision(this.pos_fantasma, this.fanDireccion)){
			if(this.pos_fantasma[1] % 16 == 0){
				if(this.fanDireccion == 0) this.pos_fantasma[0]+=2;
				if(this.fanDireccion == 1) this.pos_fantasma[0]-=2;
			}
			if(this.pos_fantasma[0] % 16 == 0){
				if(this.fanDireccion == 2) this.pos_fantasma[1]-=2;
				if(this.fanDireccion == 3) this.pos_fantasma[1]+=2;
			}
		}else{
			if(this.fanDireccion == 0 || this.fanDireccion == 1){
				this.fanDireccion = Math.floor(Math.random() * 2) + 2;
			}else if(this.fanDireccion == 2 || this.fanDireccion == 3){
				this.fanDireccion = Math.floor(Math.random() * 2);
			}
		}
	}

	this.reiniciar = function(){
		if(Math.floor(Math.random() * 2) == 0){
			this.pos_fantasma = [192,224];
		}else{
			this.pos_fantasma = [224,224];
		}

		this.fanDireccion = 0;
		this.estado = true;
		this.sprite = 0;	
	}
}
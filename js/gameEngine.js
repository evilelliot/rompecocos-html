$(document).ready(function () {
    class Rompecocos{
        columnas = 3;
        filas = 3;
        totalPiezas;
        piezas;
        coordenadasVacio = [2,2];
        indexes = [];
    
        constructor() {
            this.totalPiezas = (this.columnas * this.filas);
            this.piezas      = $(".pieza");
            this.init();
        }
    
        init() {
            for(let y = 0; y < this.filas; y++){
                for(let x = 0 ; x < this.columnas; x++){
                    let piezaID = x + y * this.columnas;
                    if( piezaID + 1 >= this.totalPiezas){ 
                        break; 
                    }else{
                        let _pieza = this.piezas[piezaID];
                        this.intercambioFicha(piezaID, x, y);
                        _pieza.addEventListener('click', (e)=> this.onClickPieza(piezaID));
                        this.indexes.push(piezaID);
                    }
                }
            }
            this.indexes.push(this.totalPiezas - 1);
            this.randomize(80);
        }
        // Reacomdar el indice de cada pieza del set a un lugar al azar dentro del array.
        randomize(x) {
            for(let i=0; i < x; i++){
                let randompiezaID = Math.floor(Math.random() * (this.totalPiezas - 1));
                let cambio = this.moverPieza(randompiezaID);
                if(!cambio){
                    i--;
                }
            }
        }
        // Mover una pieza.
        moverPieza(piezaID) {
            let pieza = this.piezas[piezaID];
            let coordenadas = this.esValido(pieza);
            if(coordenadas != null){
                this.intercambioFicha(piezaID, this.coordenadasVacio[0],this.coordenadasVacio[1]);
                this.indexes[this.coordenadasVacio[0] + this.coordenadasVacio[1] * this.columnas] = this.indexes[coordenadas[0] + coordenadas[1] * this.columnas];
                this.coordenadasVacio[0] = coordenadas[0];
                this.coordenadasVacio[1] = coordenadas[1];
                return true;
            }
            return false;
        }
        // Verificar si el bloque se puede mover.
        esValido(block){
            let posPieza    = [parseInt(block.style.left),parseInt(block.style.top)];
            let piezaWidth  = block.clientWidth;
            let coordenadas = [posPieza[0] / piezaWidth, posPieza[1] / piezaWidth];
            let diff        = [Math.abs(coordenadas[0] - this.coordenadasVacio[0]), Math.abs(coordenadas[1] - this.coordenadasVacio[1])];
            let valido      = (diff[0] == 1 && diff[1] == 0) || (diff[0] == 0 && diff[1] == 1);
            if(valido){
                return coordenadas;
            }else{
                return null;
            }
        }
        // Intercambiar la posición de la pieza usando css
        intercambioFicha(piezaID,x,y){
            let pieza        = this.piezas[piezaID];
            pieza.style.left = (x * pieza.clientWidth) + "px";
            pieza.style.top  = (y * pieza.clientWidth) + "px";
        }
        // Movemos una pieza y revisamos si el juego se ha resuelto.
        onClickPieza(piezaID){
            // Cambio de estado.
            var audio = $("#audio")[0];
		    audio.play();
            if(this.moverPieza(piezaID)){
                if(this.gameOver()){
                    var audio = $("#win")[0];
		            audio.play();
                    swal("🥳¡Ganaste!🥳");
                    
                }
            }
        }
        // Verificar si el juego se ha terminado.
        gameOver(){
            for(let i = 0; i < this.indexes.length; i++){
                if(i == this.coordenadasVacio[0] + this.coordenadasVacio[1] * this.columnas){
                    continue;
                }else{
                    if(this.indexes[i] != i) { 
                        return false;
                    }
                }
            }
            return true;
        }   
    }
    
    var game = new Rompecocos();//instantiate a new Game
        
});
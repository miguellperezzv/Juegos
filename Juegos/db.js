var db = openDatabase ("myDB", "1.0", "JUEGOS", 2*1024*1024);

    db.transaction (function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS Juego (id_Juego INTEGER PRIMARY KEY, nombre TEXT) ");
        tx.executeSql("CREATE TABLE IF NOT EXISTS Puntaje (id_Puntaje INTEGER PRIMARY KEY, nombre TEXT, puntaje INTEGER) ");
    }
     );

function cargado(){
    document.getElementById("btnGuardar").addEventListener('click',guardarPuntaje())
}

function guardarPuntaje(){
    var puntaje= document.getElementById("puntajeInfectado").innerText;
    tx.executeSql('INSERT INTO Puntaje (id_Puntaje, nombre, puntaje)', [1,"Miguel",puntaje])
}
var db = openDatabase ("myDB", "1.0", "JUEGOS", 2*1024*1024);

    db.transaction (function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS Juego (id_Juego INTEGER PRIMARY KEY, nombre TEXT) ");
        tx.executeSql("CREATE TABLE IF NOT EXISTS Puntaje (id_Puntaje INTEGER PRIMARY KEY, nombre TEXT, puntaje INTEGER) ");
    }
     );

function cargado(){
    document.getElementById("btnGuardar").addEventListener('click',guardarPuntaje())
    mostrarPuntaje();
}



function guardarPuntaje(){
    var puntaje= document.getElementById("puntajeInfectado").innerText;
    tx.executeSql('INSERT INTO Puntaje (id_Puntaje, nombre, puntaje)', [1,"Miguel",puntaje])
    mostrarPuntaje();
}

function mostrarPuntaje(){
    var table = $("#tbody_puntaje_infectado");
    var tr ='';
    tr += '<tr>';
    tr += '<td>' + "NOMBRE"+ '</td>'; 
    tr += '<td>' + "PUNTAJE" + '</td>'; 
    tr += '</tr>';
    table.innerHTML=tr;
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM Puntajes', [], function(tx, resultado){
            var rows = resultado.rows;
            var tr ='';
            for (var i =0; i<rows.length;){
                tr += '<tr>';
                tr += '<td>' + rows[i].nombre + '</td>'; 
                tr += '<td>' + rows[i].puntaje + '</td>'; 
                tr += '</tr>';
            }
            table.innerHTML = tr;
        });
    });
}


require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();
const main =async () =>{


  let opt='';
  const tareas =new Tareas();

  const tareasDB = leerDB();
  if (tareasDB) {// cargar tareas
    tareas.cargarTareasFromArray(tareasDB);
  }
  //await pausa();
    
  do {
    //Imprimier el menu
    opt = await inquirerMenu();
    

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc);
      break;
    
      case '2':
        tareas.listadoCompleto();
      break;

      case '3':
        tareas.listarPendientesCompletadas();
      break;

      case '4':
        tareas.listarPendientesCompletadas(false);
      break;

      case '5'://completado ||pendiente
       const ids = await mostrarListadoCheckList( tareas.listadoArr )
        tareas.toggleCompletadas( ids );
      break;

      case '6'://borrar
       const id = await listadoTareasBorrar(tareas.listadoArr);
       if(id!=='0'){
          const ok = await confirmar('¿Esta seguro?'); 
          if( ok ){ 
            tareas.borrarTarea(id);
            console.log('Tarea borrada');
          }
       }
      break;
      
    }


    guardarDB( tareas.listadoArr );

    await pausa();
      
  }while (opt !== '0');
    
    //pausa();


}

main();

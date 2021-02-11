const Tarea =require('./tarea');
require ('colors');
/*
    _listado:
         { uuid-465-55123-5415: {id: 12, desc:ashdjas, completado EN:15/45/2131} }
         { uuid-465-55123-5415: {id: 12, desc:ashdjas, completado EN:15/45/2131} }
         { uuid-465-55123-5415: {id: 12, desc:ashdjas, completado EN:15/45/2131} }
*/


class Tareas {
    _listado = {};


    get listadoArr(){
        const listado = [];
        //regresa un arreglo de todas las llaves
        Object.keys(this._listado).forEach( key => {
           
           const tarea = this._listado[key];
            listado.push(tarea)
        });
        return listado;
    }

    constructor (){
        this._listado = {};
    }


    borrarTarea( id  = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }


    

    cargarTareasFromArray(tareas=[]){
        tareas.forEach(tarea => {
            this._listado[tarea.id] =tarea;
        });
    }


    crearTarea( desc = '') {
        const tarea= new Tarea(desc);
        //{ id : tarea}
        this._listado[tarea.id] = tarea;
    }
    //tarea
    listadoCompleto () {
        /*this.listadoArr.forEach((element, index) => {
           console.log( `${ `${index+1}.`.green } ${element.desc} :: ${
                (element.completadoEn!==null)? 
                `${'Completado'.green}` : `${'Pendiente'.red}` }`);
        });*/
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i+1}`.green;
            const {desc, completadoEn}= tarea;
            const estado = (completadoEn)
                                ? 'Completado'.green
                                : 'Pendiente'. red;
            console.log(`${idx} ${desc} :: ${estado}`)
        });
    }


    //tarea
    listarPendientesCompletadas (completadas = true){

        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {
            
            const {desc, completadoEn}= tarea;
            const estado = (completadoEn)
                                ? 'Completado'.green
                                : 'Pendiente'.red;

            if(completadas){//mostrar completadas
                
                if (completadoEn) {
                    contador +=1;
                    console.log(`${(contador+'.').green} ${desc} :: ${completadoEn.green}`);
                }
            }else{//mostrar las pendientes
                
                if (!completadoEn) {
                    contador +=1;
                    console.log(`${(contador+'.').green} ${desc} :: ${estado}`);
                }
            }
           
        });

    }
    

    toggleCompletadas( ids = [] ){

        ids.forEach(id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if( !ids.includes(tarea.id) ){
                 this._listado[tarea.id].completadoEn =null; 
            }
        });




    }
}

module.exports =Tareas;
const totalPorPagina = 10;
var dhxSidebar = null;
var dhxLayout  = null;
var sHtmlConsulta = "";

var carreras = [];
var semestres = [];
var grupos = [];
var asignaturas = [];
var profesores = [];
var alumnos = [];

var DTAlumno = null;
var DTProfesor = null;
var DTCarrera = null;
var DTSemestre = null;
var DTGrupo = null;
var DTAsignatura = null;
var DTHorarioAlumno = null;

const confDTAlumno = {
    "language": { "sUrl": "./assets/js/dataTables_Espanol.json" },
    "paging": true,
    "pageLength": 10,
    "lengthChange": false,
    "pageResize": true,
    "pagingType": "simple_numbers",
    "info": false,
    "ordering": true,
    "searching": false,
    "autoWidth": false, 
    "responsive": true,
    "select": true
    ,"processing": true // DAPC 20220119
    ,"serverSide": false // DAPC 20220119
    ,dom: 'l<"cls-btn-export"B>frtip', //Blfrtip  lBfrtip
    buttons: [       
        {
            text: '.',
            extend: 'excel'
            ,className: 'export-excel'
            ,title: "datos_corte_" + (new Date().toISOString().slice(0,10)) +"_"+ (new Date().getTime()),
            extension: '.xls'
        }
    ]
    ,"rowCallback": function(row, data, index  ){
    },
    "columnDefs": [
         { "name": "idalumno", "data": "idalumno", "className": "text-center", "targets": 0 }
        ,{ "name": "matricula", "data": "matricula", "className": "text-center", "targets": 1 }
        ,{ "name": "nombre", "data": "nombre", "className": "", "targets": 2 }
        ,{ "name": "primer_apellodo", "data": "primer_apellodo", "className": "", "targets": 3 }
        ,{ "name": "segundo_apellido", "data": "segundo_apellido", "className": "text-center", "targets": 4 }
        ,{ "name": "email", "data": "email", "className": "", "targets": 5 }
        ,{ "name": "dtcreacion", "data": "dtcreacion", "className": "text-center", "targets": 6,"visible":false }
        ,{ "name": "dtmodificacion", "data": "dtmodificacion", "className": "text-center", "targets": 7,"visible":false }
        ,{ "name": "lactivo", "data": "lactivo", "className": "text-center", "targets": 8,
            render : function ( data, type, row, meta ) {
                return  (data)== 1 ? '<i class="text-success fa fa-check-circle" aria-hidden="true"></i>' : '<i class="text-danger fa fa-times"></i>';
            }
        }
        ,{ "name": "acciones", "data": "acciones", "className": "", "targets": 9 ,"visible": true,
             render : function ( data, type, row, meta ) {
                 // return data;
                 return type === 'display'  ?
                 `<button data-id="${row.idalumno}" onclick='updateAlumno(${JSON.stringify(row)})' type="button" class="btn update btn-primary btn-sm" ><i class="fa fa-pencil" ></i></button>
                 <button data-id="${row.idalumno}" onclick='deleteAlumno(${JSON.stringify(row)})' class="btn delete btn-danger btn-sm" ><i class='fa fa-trash'></i></button>` : data;
             }
         }
    ]    
};
const confDTProfesor = {
    "language": { "sUrl": "./assets/js/dataTables_Espanol.json" },
    "paging": true,
    "pageLength": 10,
    "lengthChange": false,
    "pageResize": true,
    "pagingType": "simple_numbers",
    "info": false,
    "ordering": true,
    "searching": false,
    "autoWidth": false, 
    "responsive": true,
    "select": true
    ,"processing": true // DAPC 20220119
    ,"serverSide": false // DAPC 20220119
    ,dom: 'l<"cls-btn-export"B>frtip', //Blfrtip  lBfrtip
    buttons: [       
        {
            text: '.',
            extend: 'excel'
            ,className: 'export-excel'
            ,title: "datos_corte_" + (new Date().toISOString().slice(0,10)) +"_"+ (new Date().getTime()),
            extension: '.xls'
        }
    ]
    ,"rowCallback": function(row, data, index  ){
    },
    "columnDefs": [
         { "name": "idprofesor", "data": "idprofesor", "className": "text-center", "targets": 0 }
        ,{ "name": "cedula", "data": "cedula", "className": "text-center", "targets": 1 }
        ,{ "name": "nombre", "data": "nombre", "className": "", "targets": 2 }
        ,{ "name": "primer_apellodo", "data": "primer_apellodo", "className": "", "targets": 3 }
        ,{ "name": "segundo_apellido", "data": "segundo_apellido", "className": "text-center", "targets": 4 }
        ,{ "name": "email", "data": "email", "className": "", "targets": 5 }
        ,{ "name": "dtcreacion", "data": "dtcreacion", "className": "text-center", "targets": 6,"visible":false }
        ,{ "name": "dtmodificacion", "data": "dtmodificacion", "className": "text-center", "targets": 7,"visible":false }
        ,{ "name": "lactivo", "data": "lactivo", "className": "text-center", "targets": 8,
            render : function ( data, type, row, meta ) {
                return  (data)== 1 ? '<i class="text-success fa fa-check-circle" aria-hidden="true"></i>' : '<i class="text-danger fa fa-times"></i>';
            }
        }
        ,{ "name": "acciones", "data": "acciones", "className": "", "targets": 9 ,"visible": true,
             render : function ( data, type, row, meta ) {
                 // return data;
                 return type === 'display'  ?
                 `<button data-id="${row.idprofesor}" onclick='updateProfesor(${JSON.stringify(row)})' type="button" class="btn update btn-primary btn-sm" ><i class="fa fa-pencil" ></i></button>
                 <button data-id="${row.idprofesor}" onclick='deleteProfesor(${JSON.stringify(row)})' class="btn delete btn-danger btn-sm" ><i class='fa fa-trash'></i></button>` : data;
             }
         }
    ]    
};

const confDTCarrera = {
    "language": { "sUrl": "./assets/js/dataTables_Espanol.json" },
    "paging": true,
    "pageLength": 10,
    "lengthChange": false,
    "pageResize": true,
    "pagingType": "simple_numbers",
    "info": false,
    "ordering": true,
    "searching": false,
    "autoWidth": false, 
    "responsive": true,
    "select": true
    ,"processing": true // DAPC 20220119
    ,"serverSide": false // DAPC 20220119
    ,dom: 'l<"cls-btn-export"B>frtip', //Blfrtip  lBfrtip
    buttons: [       
        {
            text: '.',
            extend: 'excel'
            ,className: 'export-excel'
            ,title: "datos_corte_" + (new Date().toISOString().slice(0,10)) +"_"+ (new Date().getTime()),
            extension: '.xls'
        }
    ]
    ,"rowCallback": function(row, data, index  ){
    },
    "columnDefs": [
         { "name": "idcarrera", "data": "idcarrera", "className": "text-center", "targets": 0 }
        ,{ "name": "clave", "data": "clave", "className": "text-center", "targets": 1 }
        ,{ "name": "nombre", "data": "nombre", "className": "", "targets": 2 }
        ,{ "name": "no_semestres", "data": "no_semestres", "className": "", "targets": 3 }
        ,{ "name": "dtcreacion", "data": "dtcreacion", "className": "text-center", "targets": 4 }
        ,{ "name": "dtmodificacion", "data": "dtmodificacion", "className": "", "targets": 5 }
        ,{ "name": "lactivo", "data": "lactivo", "className": "text-center", "targets": 6,
            render : function ( data, type, row, meta ) {
                return  (data)== 1 ? '<i class="text-success fa fa-check-circle" aria-hidden="true"></i>' : '<i class="text-danger fa fa-times"></i>';
            }
        }
        ,{ "name": "acciones", "data": "acciones", "className": "", "targets": 7 ,"visible": true,
             render : function ( data, type, row, meta ) {
                 // return data;
                 return type === 'display'  ?
                 `<button data-id="${row.idcarrera}" onclick='updateCarrera(${JSON.stringify(row)})' type="button" class="btn update btn-primary btn-sm" ><i class="fa fa-pencil" ></i></button>
                 <button data-id="${row.idcarrera}" onclick='deleteCarrera(${JSON.stringify(row)})' class="btn delete btn-danger btn-sm" ><i class='fa fa-trash'></i></button>` : data;
             }
         }
    ]    
};


const confDTSemestre = {
    "language": { "sUrl": "./assets/js/dataTables_Espanol.json" },
    "paging": true,
    "pageLength": 10,
    "lengthChange": false,
    "pageResize": true,
    "pagingType": "simple_numbers",
    "info": false,
    "ordering": true,
    "searching": false,
    "autoWidth": false, 
    "responsive": true,
    "select": true
    ,"processing": true // DAPC 20220119
    ,"serverSide": false // DAPC 20220119
    ,dom: 'l<"cls-btn-export"B>frtip', //Blfrtip  lBfrtip
    buttons: [       
        {
            text: '.',
            extend: 'excel'
            ,className: 'export-excel'
            ,title: "datos_corte_" + (new Date().toISOString().slice(0,10)) +"_"+ (new Date().getTime()),
            extension: '.xls'
        }
    ]
    ,"rowCallback": function(row, data, index  ){
    },
    "columnDefs": [
         { "name": "idsemestre", "data": "idcarrera", "className": "text-center", "targets": 0 }
        ,{ "name": "idcarrera", "data": "idcarrera", "className": "text-center", "targets": 1,"visible":false }
        ,{ "name": "carrera", "data": "carrera", "className": "text-center", "targets": 2 }
        ,{ "name": "clave", "data": "clave", "className": "text-center", "targets": 3 }
        ,{ "name": "semestre", "data": "semestre", "className": "", "targets": 4 }
        ,{ "name": "dtinicio", "data": "dtinicio", "className": "", "targets": 5 }
        ,{ "name": "dtfin", "data": "dtfin", "className": "text-center", "targets": 6 }
        ,{ "name": "dtcreacion", "data": "dtcreacion", "className": "text-center", "targets": 7 }
        ,{ "name": "dtmodificacion", "data": "dtmodificacion", "className": "", "targets": 8 }
        ,{ "name": "lactivo", "data": "lactivo", "className": "text-center", "targets": 9,
            render : function ( data, type, row, meta ) {
                return  (data)== 1 ? '<i class="text-success fa fa-check-circle" aria-hidden="true"></i>' : '<i class="text-danger fa fa-times"></i>';
            }
        }
        ,{ "name": "acciones", "data": "acciones", "className": "", "targets": 10 ,"visible": true,
             render : function ( data, type, row, meta ) {
                 // return data;
                 return type === 'display'  ?
                 `<button data-id="${row.idsemestre}" onclick='updateSemestre(${JSON.stringify(row)})' type="button" class="btn update btn-primary btn-sm" ><i class="fa fa-pencil" ></i></button>
                 <button data-id="${row.idsemestre}" onclick='deleteSemestre(${JSON.stringify(row)})' class="btn delete btn-danger btn-sm" ><i class='fa fa-trash'></i></button>` : data;
             }
         }
    ]    
};


const confDTGrupo = {
    "language": { "sUrl": "./assets/js/dataTables_Espanol.json" },
    "paging": true,
    "pageLength": 10,
    "lengthChange": false,
    "pageResize": true,
    "pagingType": "simple_numbers",
    "info": false,
    "ordering": true,
    "searching": false,
    "autoWidth": false, 
    "responsive": true,
    "select": true
    ,"processing": true // DAPC 20220119
    ,"serverSide": false // DAPC 20220119
    ,dom: 'l<"cls-btn-export"B>frtip', //Blfrtip  lBfrtip
    buttons: [       
        {
            text: '.',
            extend: 'excel'
            ,className: 'export-excel'
            ,title: "datos_corte_" + (new Date().toISOString().slice(0,10)) +"_"+ (new Date().getTime()),
            extension: '.xls'
        }
    ]
    ,"rowCallback": function(row, data, index  ){
    },
    "columnDefs": [
         { "name": "idgrupo", "data": "idgrupo", "className": "text-center", "targets": 0 }
        ,{ "name": "idprofesor", "data": "idprofesor", "className": "text-center", "targets": 1,"visible":false }
        ,{ "name": "profesor", "data": "idprofesor", "className": "text-center", "targets": 2 }
        ,{ "name": "clave", "data": "clave", "className": "text-center", "targets": 3 }
        ,{ "name": "nombre", "data": "nombre", "className": "", "targets": 4 }
        ,{ "name": "capacidad", "data": "capacidad", "className": "", "targets": 5 }
        ,{ "name": "turno", "data": "turno", "className": "", "targets": 6 }
        ,{ "name": "dtcreacion", "data": "dtcreacion", "className": "text-center", "targets": 7 }
        ,{ "name": "dtmodificacion", "data": "dtmodificacion", "className": "", "targets": 8 }
        ,{ "name": "lactivo", "data": "lactivo", "className": "text-center", "targets": 9,
            render : function ( data, type, row, meta ) {
                return  (data)== 1 ? '<i class="text-success fa fa-check-circle" aria-hidden="true"></i>' : '<i class="text-danger fa fa-times"></i>';
            }
        }
        ,{ "name": "acciones", "data": "acciones", "className": "", "targets": 10 ,"visible": true,
             render : function ( data, type, row, meta ) {
                 // return data;
                 return type === 'display'  ?
                 `<button data-id="${row.idgrupo}" onclick='updateCarrera(${JSON.stringify(row)})' type="button" class="btn update btn-primary btn-sm" ><i class="fa fa-pencil" ></i></button>
                 <button data-id="${row.idgrupo}" onclick='deleteCarrera(${JSON.stringify(row)})' class="btn delete btn-danger btn-sm" ><i class='fa fa-trash'></i></button>` : data;
             }
         }
    ]    
};


const confDTAsignatura = {
    "language": { "sUrl": "./assets/js/dataTables_Espanol.json" },
    "paging": true,
    "pageLength": 10,
    "lengthChange": false,
    "pageResize": true,
    "pagingType": "simple_numbers",
    "info": false,
    "ordering": true,
    "searching": false,
    "autoWidth": false, 
    "responsive": true,
    "select": true
    ,"processing": true // DAPC 20220119
    ,"serverSide": false // DAPC 20220119
    ,dom: 'l<"cls-btn-export"B>frtip', //Blfrtip  lBfrtip
    buttons: [       
        {
            text: '.',
            extend: 'excel'
            ,className: 'export-excel'
            ,title: "datos_corte_" + (new Date().toISOString().slice(0,10)) +"_"+ (new Date().getTime()),
            extension: '.xls'
        }
    ]
    ,"rowCallback": function(row, data, index  ){
    },
    "columnDefs": [
         { "name": "idasignatura", "data": "idasignatura", "className": "text-center", "targets": 0 }
        ,{ "name": "idprofesor", "data": "idprofesor", "className": "text-center", "targets": 1,"visible":false }
        ,{ "name": "profesor", "data": "idprofesor", "className": "text-center", "targets": 2 }
        ,{ "name": "clave", "data": "clave", "className": "text-center", "targets": 3 }
        ,{ "name": "nombre", "data": "nombre", "className": "", "targets": 4 }
        ,{ "name": "observaciones", "data": "observaciones", "className": "", "targets": 5 }
        ,{ "name": "creditos", "data": "creditos", "className": "", "targets": 6 }
        ,{ "name": "dtcreacion", "data": "dtcreacion", "className": "text-center", "targets": 7 }
        ,{ "name": "dtmodificacion", "data": "dtmodificacion", "className": "", "targets": 8 }
        ,{ "name": "lactivo", "data": "lactivo", "className": "text-center", "targets": 9,
            render : function ( data, type, row, meta ) {
                return  (data)== 1 ? '<i class="text-success fa fa-check-circle" aria-hidden="true"></i>' : '<i class="text-danger fa fa-times"></i>';
            }
        }
        ,{ "name": "acciones", "data": "acciones", "className": "", "targets": 10 ,"visible": true,
             render : function ( data, type, row, meta ) {
                 // return data;
                 return type === 'display'  ?
                 `<button data-id="${row.idgrupo}" onclick='updateCarrera(${JSON.stringify(row)})' type="button" class="btn update btn-primary btn-sm" ><i class="fa fa-pencil" ></i></button>
                 <button data-id="${row.idgrupo}" onclick='deleteCarrera(${JSON.stringify(row)})' class="btn delete btn-danger btn-sm" ><i class='fa fa-trash'></i></button>` : data;
             }
         }
    ]    
};


const confDTHorario = {
    "language": { "sUrl": "./assets/js/dataTables_Espanol.json" },
    "paging": true,
    "pageLength": 10,
    "lengthChange": false,
    "pageResize": true,
    "pagingType": "simple_numbers",
    "info": false,
    "ordering": true,
    "searching": false,
    "autoWidth": false, 
    "responsive": true,
    "select": true
    ,"processing": true // DAPC 20220119
    ,"serverSide": false // DAPC 20220119
    ,dom: 'l<"cls-btn-export"B>frtip', //Blfrtip  lBfrtip
    buttons: [       
        {
            text: '.',
            extend: 'excel'
            ,className: 'export-excel'
            ,title: "datos_corte_" + (new Date().toISOString().slice(0,10)) +"_"+ (new Date().getTime()),
            extension: '.xls'
        }
    ]
    ,"rowCallback": function(row, data, index  ){
    },
    "columnDefs": [
         { "name": "idhorario", "data": "idhorario", "className": "text-center", "targets": 0 }
        ,{ "name": "idasignatura", "data": "idasignatura", "className": "text-center", "targets": 1,"visible":false }
        ,{ "name": "asignatura", "data": "asignatura", "className": "text-center", "targets": 2 }
        ,{ "name": "idalumno", "data": "idalumno", "className": "text-center", "targets": 3,"visible":false }
        ,{ "name": "alumno", "data": "alumno", "className": "text-center", "targets": 4 }
        ,{ "name": "idsemestre", "data": "idsemestre", "className": "text-center", "targets": 5,"visible":false }
        ,{ "name": "semestre", "data": "semestre", "className": "text-center", "targets": 6 }
        ,{ "name": "idgrupo", "data": "idgrupo", "className": "text-center", "targets": 7,"visible":false }
        ,{ "name": "grupo", "data": "grupo", "className": "text-center", "targets": 8 }
        ,{ "name": "dias_semana", "data": "dias_semana", "className": "text-center", "targets": 9 }
        ,{ "name": "hora_inicio", "data": "hora_inicio", "className": "", "targets": 10 }
        ,{ "name": "hora_fin", "data": "hora_fin", "className": "", "targets": 11 }
        ,{ "name": "aula", "data": "aula", "className": "", "targets": 12 }
        ,{ "name": "dtcreacion", "data": "dtcreacion", "className": "text-center", "targets": 13 }
        ,{ "name": "dtmodificacion", "data": "dtmodificacion", "className": "", "targets": 14 }
        ,{ "name": "lactivo", "data": "lactivo", "className": "text-center", "targets": 15,
            render : function ( data, type, row, meta ) {
                return  (data)== 1 ? '<i class="text-success fa fa-check-circle" aria-hidden="true"></i>' : '<i class="text-danger fa fa-times"></i>';
            }
        }
        ,{ "name": "acciones", "data": "acciones", "className": "", "targets": 16 ,"visible": true,
             render : function ( data, type, row, meta ) {
                 // return data;
                 return type === 'display'  ?
                 `<button data-id="${row.idgrupo}" onclick='updateCarrera(${JSON.stringify(row)})' type="button" class="btn update btn-primary btn-sm" ><i class="fa fa-pencil" ></i></button>
                 <button data-id="${row.idgrupo}" onclick='deleteCarrera(${JSON.stringify(row)})' class="btn delete btn-danger btn-sm" ><i class='fa fa-trash'></i></button>` : data;
             }
         }
    ]    
};

const config_data = [
    { "id": "Alumnos", "value": "Alumnos", "icon": "mdi mdi-account" },
    { "type": "separator" },
    { "id": "Profesores", "value": "Profesores", "icon": "mdi mdi-account" },
    { "type": "separator" },
    { "id": "Carreras", "value": "Carreras", "icon": "mdi mdi-book" },
    { "type": "separator" },
    { "id": "Semestres", "value": "Semestres", "icon": "mdi mdi-calendar-blank" },
    { "type": "separator" },
];

$(document ).ready(function() {

    dhxLayout = new dhx.Layout("main", {
        type: "line",    
        cols: [
            { id: "sidebar", header: "DevCamp", collapsable: true, width: "150px", resizable: false },
            { id: "body", resizable: true}
        ]
    });

    dhxSidebar = new dhx.Sidebar(dhxLayout.getCell("sidebar"), 
        { 
            css: "dhx_widget--border_right",
            width:"100px"
        }
    ); 

    dhxSidebar.data.parse(config_data);

    dhxSidebar.events.on("Click", function(id,e){
        var dhxLytInner = null;
        var sInnerHtml = "";
        dhxSidebar.select(id);
             
        switch (id){
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            case 'Alumnos':{
                dhxLytInner = new dhx.Layout(null, {
                    type: "line",
                    cols: [
                        {
                            rows:[
                                { id: "contenido", resizable: true},
                            ]
                        }
                    ]
                });
                dhxLayout.getCell("body").attach(dhxLytInner);
                dhxLytInner.getCell("contenido").attachHTML(fnObtenerAlumnos());
            }//fin: case 'Boletaje'
            break;
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            case 'Profesores':{
                dhxLytInner = new dhx.Layout(null, {
                    type: "line",
                    cols: [
                        {
                            rows:[
                                { id: "contenido", resizable: true},
                            ]
                        }
                    ]
                });
                dhxLayout.getCell("body").attach(dhxLytInner);
                dhxLytInner.getCell("contenido").attachHTML(fnObtenerProfesores());
            }//fin: case 'Boletaje'
            break;
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            case 'Carreras':{
                dhxLytInner = new dhx.Layout(null, {
                    type: "line",
                    cols: [
                        {
                            rows:[
                                { id: "contenido", resizable: true},
                            ]
                        }
                    ]
                });
                dhxLayout.getCell("body").attach(dhxLytInner);
                dhxLytInner.getCell("contenido").attachHTML(fnObtenerCarreras());
            }//fin: case 'Boletaje'
            break;
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            case 'Semestres':{
                dhxLytInner = new dhx.Layout(null, {
                    type: "line",
                    cols: [
                        {
                            rows:[
                                { id: "contenido", resizable: true},
                            ]
                        }
                    ]
                });
                dhxLayout.getCell("body").attach(dhxLytInner);
                dhxLytInner.getCell("contenido").attachHTML(fnObtenerSemestres());
            }//fin: case 'Boletaje'
            break;
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            case 'Grupo':{
                dhxLytInner = new dhx.Layout(null, {
                    type: "line",
                    cols: [
                        {
                            rows:[
                                { id: "contenido", resizable: true},
                            ]
                        }
                    ]
                });
                dhxLayout.getCell("body").attach(dhxLytInner);
                dhxLytInner.getCell("contenido").attachHTML(fnObtenerProfesores());
            }//fin: case 'Boletaje'
            break;
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            case 'Asignatura':{
                dhxLytInner = new dhx.Layout(null, {
                    type: "line",
                    cols: [
                        {
                            rows:[
                                { id: "contenido", resizable: true},
                            ]
                        }
                    ]
                });
                dhxLayout.getCell("body").attach(dhxLytInner);
                dhxLytInner.getCell("contenido").attachHTML(fnObtenerProfesores());
            }//fin: case 'Boletaje'
            break;
            //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            case 'Horario_Alumno':{
                dhxLytInner = new dhx.Layout(null, {
                    type: "line",
                    cols: [
                        {
                            rows:[
                                { id: "contenido", resizable: true},
                            ]
                        }
                    ]
                });
                dhxLayout.getCell("body").attach(dhxLytInner);
                dhxLytInner.getCell("contenido").attachHTML(fnObtenerProfesores());
            }//fin: case 'Boletaje'
            break;
        }//fin:switch (id)
    });//fin:events.on("Click"        
});//fin:$( document )
//-------------------------------------------------------------------------------------------------
function fnObtenerAlumnos(){
    var sTemplate   = "";
    var htmlObject  = null;

    try {
        if (typeof(DTAlumno) !== "undefined" && DTAlumno !== null ) {
            DTAlumno.clear();
            DTAlumno.destroy();
        }//fin:if (typeof(DTAlumno) !== "undefined" && DTAlumno !== null )

        $('div#Alumnos').remove();

        sTemplate = `
        <div style="margin-top: 50px;">
        <h4 style="margin-bottom: 0px;"> &nbsp; <a id="botonAgregar" onclick="fnAgregarAlumno(this)" class="mb-2 text-center btn btn-primary">Agregar</a> &nbsp; &nbsp; &nbsp; &nbsp; <a id="Alumno" onclick="fnDescargarCSV(this)" class="mb-2 text-center btn btn-primary">DESCARGAR CSV</a></h4>
        <div class="ml-2 mr-2 row dflex justify-content-center"></div>
        <div id="error" class="alert alert-secondary alert-dismissible fade show" role="alert"></div>
        <div id="respuesta" class="mt-3">
            <div class="table-responsive" data-topline="1">
            <table data-dttable='1' style="background: transparent;" width='100%' id='tbl-alumno' class='table dt-responsive responsive hover nowrap'>
                <thead>
                    <tr style="color:#fffff; background: transparent;" id="tr-head-alumno">
                        <th>idalumno</th>
                        <th>matricula</th>
                        <th>nombre</th>  
                        <th>primer_apellodo</th>
                        <th>segundo_apellido</th>
                        <th>email</th>
                        <th>dtcreacion</th>
                        <th>dtmodificacion</th>
                        <th>lactivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody style="color:#fffff; background: transparent;" id="body-alumno"></tbody>
            </table>
          </div>
        </div></div>`;
           
        htmlObject = document.createElement('div');
        htmlObject.setAttribute("id","Alumnos");
        htmlObject.setAttribute("style","width:100%; height:100%; overflow: scroll;");
        htmlObject.innerHTML = sTemplate;      
        $('div[aria-label="tab-content-contenido"]').append(htmlObject);
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        $.ajax({
            url:window.location.href + "api/alumno",
            type: "post",
            "data": {
                "opcion": 1
            },
            beforeSend: function(){
                $.blockUI({ message:'<h3><img src="/assets/images/ajax-loader.gif" width="45" height="40" />Un momento por favor...</h3>'});
            },
            success:function(jresult){
                $.unblockUI();
                if(jresult.errors.length <= 0){
                    if(jresult.data.length > 0){
                        $("#respuesta").show();
                        $("#error").hide();
                        DTAlumno = $('table#tbl-alumno').DataTable(confDTAlumno);
                        DTAlumno.clear().draw();
                        $.each(jresult.data, function(_index, _oData ) {
                            DTAlumno.row.add({
                                 "idalumno": _oData.idalumno
                                ,"matricula": _oData.matricula
                                ,"nombre": _oData.nombre
                                ,"primer_apellodo": _oData.primer_apellodo
                                ,"segundo_apellido": _oData.segundo_apellido
                                ,"email": _oData.email
                                ,"dtcreacion": _oData.dtcreacion
                                ,"dtmodificacion": _oData.dtmodificacion
                                ,"lactivo": _oData.lactivo
                                ,"acciones": "-"
                            });
                        });
                        DTAlumno.draw();
                        DTAlumno.columns.adjust().draw();
                    }//fin:if
                    else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Aviso',
                            text: "No existen registros aun, favor de agregarlos para visualizarlos en este apartado"
                        });
                    }//fin:else
                }//fin:if
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Aviso',
                        text: jresult.errors
                    });
                }//fin:if(data.Errors.length <= 0)
            },
            error: function(xhrCS, statusCS) {
                Swal.fire({
                    icon: 'error',
                    title: 'Aviso',
                    text: xhrCS.status
                });
            }
        }); //fin:$.ajax()
        
    }//fin:try
    catch (error) { 
        Swal.fire({ icon: 'error', title: 'Aviso', text: error});
    } 
    return sTemplate;
}//fin:fnObtenerAlumnos
function fnAgregarAlumno(_this){
    var sTituloModal = "Agregar tipo de obra";
    $('div#divmodal div.modal-body').empty();

    sTemplate = `
    <form id="formulario" onsubmit="return crearAlumno(event);">
    <div value="Errors.length > 0"  style="display: none" id="divError" class="m-1 alert alert-danger" role="alert">

    </div>
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">matricula</label>
                <input name="matricula" id="matricula" value="" class="form-control" rows="4" required maxlength="55"></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">nombre</label>
                <input name="nombre" id="nombre" value="" class="form-control" rows="4" required maxlength="100"></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">primer_apellodo</label>
                <input name="primer_apellodo" id="primer_apellodo" value="" class="form-control" rows="4" required maxlength="55"></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">segundo_apellido</label>
                <input name="segundo_apellido" id="segundo_apellido" value="" class="form-control" rows="4" required maxlength="55"></input>
            </div>
        </div>
        <div class="col-12">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">email</label>
                <input type="email" name="email" id="email" value="" class="form-control" rows="4" required maxlength="100" ></input>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="submit"  class="btn btn-primary">Guardar</button>
    </div>
    </form>`;

    $('div#divmodal div.modal-body').html(sTemplate);
    $('div#divmodal h5.modal-titulo').html(sTituloModal);
    $('div#divmodal').modal('show');
}
//-------------------------------------------------------------------------------------------------
function crearAlumno(event){
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());
    $.ajax({
        url: "/api/createalumno"
        , type: "post"
        , datatype:"json"
        , data: {
            "datos":value,
        }
        , beforeSend:function(request){
        }
        , success: function(jresult, textStatus, jQxhr ){
            $.unblockUI();
            if(jresult.errors.length > 0){ 
                $("li#divError").html("");
                $("li#lista").remove();
                $.each(jresult.errors, function(_index, _oData)
                {
                    var errores = `<li id="lista">${_oData}</li>`;
                    document.getElementById('divError').innerHTML += errores
                })
                $("div#divError").show();
            }//fin:if
            else{
                $("li#divError").html("");
                $("li#divError").hide();
                $("li#lista").remove();
                Swal.fire({ icon: 'success', title: 'Exito', text: "Registro exitoso" });
                document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
            }//fin:else
        },
        error: function(xhrCS, statusCS) {
            console.log(xhrCS)
        }
    }); 
}
//-------------------------------------------------------------------------------------------------
function updateAlumno(datos){
    var sTemplate  = ""; 
    $('div#divmodal div.modal-body').empty();      
    var sTituloModal = "Actualizar Alumno";
    sTemplate = `
        <form id="formulario" onsubmit="return modificarAlumno(event);">
            <div value="Errors.length > 0"  style="display: none" id="divError" class="m-1 alert alert-danger" role="alert">

            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">matricula</label>
                        <input name="matricula" id="matricula" value="${datos.matricula}" class="form-control" rows="4" required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">nombre</label>
                        <input name="nombre" id="nombre" value="${datos.nombre}" class="form-control" rows="4" required maxlength="100"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">primer_apellodo</label>
                        <input name="primer_apellodo" id="primer_apellodo" value="${datos.primer_apellodo}" class="form-control" rows="4" required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">segundo_apellido</label>
                        <input name="segundo_apellido" id="segundo_apellido" value="${datos.segundo_apellido}" class="form-control" rows="4" required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">email</label>
                        <input type="email" name="email" id="email" value="${datos.email}" class="form-control" rows="4" required maxlength="100" ></input>
                    </div>
                </div>

                <div class="col-4 form-check">
                    <div class="form-group">
                        <input type ="checkbox" id="lactivo" name="lactivo" ${(datos.lactivo==1)?"checked":""} />
                        <label class="form-check-label" for="gridCheck">¿activo?</label>
                    </div>
                </div>
                <input name="idalumno" id="idalumno" value="${datos.idalumno}" class=" form-control" rows="4" hidden></input>
                <input name="dtcreacion" id="dtcreacion" value="${datos.dtcreacion}" class=" form-control" rows="4" hidden></input>
            </div>
            <div class="modal-footer">
                <button type="submit"  class="btn btn-primary">Guardar</button>
            </div>
        </form>
    `;

    $('div#divmodal div.modal-body').html(sTemplate);
    $('div#divmodal h5.modal-titulo').html(sTituloModal);
    $('div#divmodal').modal('show');
}
//-------------------------------------------------------------------------------------------------
function modificarAlumno(event){
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());
    $.ajax({
        url: "/api/updatealumno"
        , type: "post"
        , datatype:"json"
        , data: {
            "datos":value,
        }
        , beforeSend:function(request){
        }
        , success: function(jresult, textStatus, jQxhr ){
            $.unblockUI();
            if(jresult.errors.length > 0){ 
                $("li#divError").html("");
                $("li#lista").remove();
                $.each(jresult.errors, function(_index, _oData)
                {
                    var errores = `<li id="lista">${_oData}</li>`;
                    document.getElementById('divError').innerHTML += errores
                })
                $("div#divError").show();
            }//fin:if
            else{
                $("li#divError").html("");
                $("li#lista").hide();
                $("li#lista").remove();
                Swal.fire({ icon: 'success', title: 'Exito', text: "Modificacion exitosa" });
                document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
            }//fin:else
        },
        error: function(xhrCS, statusCS) {
            console.log(xhrCS)
        }
    });
}
//-------------------------------------------------------------------------------------------------
function deleteAlumno(datos){
    Swal.fire({
        title: '¿Eliminar?',
        text: "Esta accion no se podra revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/api/deletealumno"
                , type: "post"
                , datatype:"json"
                , data: {
                    "iid":datos.idalumno,
                }
                , beforeSend:function(request){
                }
                , success: function(jresult, textStatus, jQxhr ){
                    $.unblockUI();
                    if(jresult.errors.length > 0){
                        $.each(jresult.errors, function(_index, _oData)
                        {
                            Swal.fire({ icon: 'error', title: 'Error', text: _oData });
                        })
                    }//fin:if
                    else{
                        Swal.fire({ icon: 'success', title: 'Exito', text: "Se cambio activo del registro a false" });
                        document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
                    }//fin:else
                },
                error: function(xhrCS, statusCS) {
                    console.log(xhrCS)
                }
            });
            
        }
    });
}
//-------------------------------------------------------------------------------------------------
function fnDescargarCSV(_this){
    var odivParentID = $(_this)[0].id;
    console.log(odivParentID);
    switch(odivParentID){
        case "Alumno":
            if (typeof(DTAlumno) !== "undefined" && DTAlumno !== null ) {
                $(_this).parent().parent().find("button.dt-button.export-excel").get(0).click();
            }//fin:if
        break;
        case "Profesor":
            if (typeof(DTProfesor) !== "undefined" && DTProfesor !== null ) {
                $(_this).parent().parent().find("button.dt-button.export-excel").get(0).click();
            }//fin:if
        break;
        case "Carrera":
            if (typeof(DTCarrera) !== "undefined" && DTCarrera !== null ) {
                $(_this).parent().parent().find("button.dt-button.export-excel").get(0).click();
            }//fin:if
        break;
        case "Semestre":
            if (typeof(DTSemestre) !== "undefined" && DTSemestre !== null ) {
                $(_this).parent().parent().find("button.dt-button.export-excel").get(0).click();
            }//fin:if
        break;
        case "Grupo":
            if (typeof(DTGrupo) !== "undefined" && DTGrupo !== null ) {
                $(_this).parent().parent().find("button.dt-button.export-excel").get(0).click();
            }//fin:if
        break;
        case "Asignatura":
            if (typeof(DTAsignatura) !== "undefined" && DTAsignatura !== null ) {
                $(_this).parent().parent().find("button.dt-button.export-excel").get(0).click();
            }//fin:if
        break;
    }//fin:switch(odivParentID
}//fin:fnDescargarCSV
//-------------------------------------------------------------------------------------------------
function fnObtenerProfesores(){
    var sTemplate   = "";
    var htmlObject  = null;

    try {
        if (typeof(DTProfesor) !== "undefined" && DTProfesor !== null ) {
            DTProfesor.clear();
            DTProfesor.destroy();
        }//fin:if (typeof(DTProfesor) !== "undefined" && DTProfesor !== null )

        $('div#Profesores').remove();

        sTemplate = `
        <div style="margin-top: 50px;">
        <h4 style="margin-bottom: 0px;"> &nbsp; <a id="botonAgregar" onclick="fnAgregarProfesor(this)" class="mb-2 text-center btn btn-primary">Agregar</a> &nbsp; &nbsp; &nbsp; &nbsp; <a id="Profesor" onclick="fnDescargarCSV(this)" class="mb-2 text-center btn btn-primary">DESCARGAR CSV</a></h4>
        <div class="ml-2 mr-2 row dflex justify-content-center"></div>
        <div id="error" class="alert alert-secondary alert-dismissible fade show" role="alert"></div>
        <div id="respuesta" class="mt-3">
            <div class="table-responsive" data-topline="1">
            <table data-dttable='1' style="background: transparent;" width='100%' id='tbl-profesor' class='table dt-responsive responsive hover nowrap'>
                <thead>
                    <tr style="color:#fffff; background: transparent;" id="tr-head-profesor">
                        <th>idprofesor</th>
                        <th>cedula</th>
                        <th>nombre</th>  
                        <th>primer_apellodo</th>
                        <th>segundo_apellido</th>
                        <th>email</th>
                        <th>dtcreacion</th>
                        <th>dtmodificacion</th>
                        <th>lactivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody style="color:#fffff; background: transparent;" id="body-profesor"></tbody>
            </table>
          </div>
        </div></div>`;
           
        htmlObject = document.createElement('div');
        htmlObject.setAttribute("id","Profesores");
        htmlObject.setAttribute("style","width:100%; height:100%; overflow: scroll;");
        htmlObject.innerHTML = sTemplate;      
        $('div[aria-label="tab-content-contenido"]').append(htmlObject);
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        $.ajax({
            url:window.location.href + "api/profesor",
            type: "post",
            "data": {
                "opcion": 1
            },
            beforeSend: function(){
                $.blockUI({ message:'<h3><img src="/assets/images/ajax-loader.gif" width="45" height="40" />Un momento por favor...</h3>'});
            },
            success:function(jresult){
                $.unblockUI();
                if(jresult.errors.length <= 0){
                    if(jresult.data.length > 0){
                        $("#respuesta").show();
                        $("#error").hide();
                        DTProfesor = $('table#tbl-profesor').DataTable(confDTProfesor);
                        DTProfesor.clear().draw();
                        $.each(jresult.data, function(_index, _oData ) {
                            DTProfesor.row.add({
                                 "idprofesor": _oData.idprofesor
                                ,"cedula": _oData.cedula
                                ,"nombre": _oData.nombre
                                ,"primer_apellodo": _oData.primer_apellodo
                                ,"segundo_apellido": _oData.segundo_apellido
                                ,"email": _oData.email
                                ,"dtcreacion": _oData.dtcreacion
                                ,"dtmodificacion": _oData.dtmodificacion
                                ,"lactivo": _oData.lactivo
                                ,"acciones": "-"
                            });
                        });
                        DTProfesor.draw();
                        DTProfesor.columns.adjust().draw();
                    }//fin:if
                    else{
                        $("#error").hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Aviso',
                            text: "No existen registros aun, favor de agregarlos para visualizarlos en este apartado"
                        });
                    }//fin:else
                }//fin:if
                else{
                    $("#error").hide();
                    Swal.fire({
                        icon: 'error',
                        title: 'Aviso',
                        text: jresult.errors
                    });
                }//fin:if(data.Errors.length <= 0)
            },
            error: function(xhrCS, statusCS) {
                Swal.fire({
                    icon: 'error',
                    title: 'Aviso',
                    text: xhrCS.status
                });
            }
        }); //fin:$.ajax()
        
    }//fin:try
    catch (error) { 
        Swal.fire({ icon: 'error', title: 'Aviso', text: error});
    } 
    return sTemplate;
}//fin:fnObtenerProfesores
function fnAgregarProfesor(_this){
    var sTituloModal = "Agregar tipo de obra";
    $('div#divmodal div.modal-body').empty();

    sTemplate = `
    <form id="formulario" onsubmit="return crearProfesor(event);">
    <div value="Errors.length > 0"  style="display: none" id="divError" class="m-1 alert alert-danger" role="alert">

    </div>
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">cedula</label>
                <input name="cedula" id="cedula" value="" class="form-control" rows="4" required maxlength="55"></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">nombre</label>
                <input name="nombre" id="nombre" value="" class="form-control" rows="4" required maxlength="100"></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">primer_apellodo</label>
                <input name="primer_apellodo" id="primer_apellodo" value="" class="form-control" rows="4" required maxlength="55"></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">segundo_apellido</label>
                <input name="segundo_apellido" id="segundo_apellido" value="" class="form-control" rows="4" required maxlength="55"></input>
            </div>
        </div>
        <div class="col-12">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">email</label>
                <input type="email" name="email" id="email" value="" class="form-control" rows="4" required maxlength="100" ></input>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="submit"  class="btn btn-primary">Guardar</button>
    </div>
    </form>`;

    $('div#divmodal div.modal-body').html(sTemplate);
    $('div#divmodal h5.modal-titulo').html(sTituloModal);
    $('div#divmodal').modal('show');
}
//-------------------------------------------------------------------------------------------------
function crearProfesor(event){
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());
    $.ajax({
        url: "/api/createprofesor"
        , type: "post"
        , datatype:"json"
        , data: {
            "datos":value,
        }
        , beforeSend:function(request){
        }
        , success: function(jresult, textStatus, jQxhr ){
            $.unblockUI();
            if(jresult.errors.length > 0){ 
                $("li#divError").html("");
                $("li#lista").remove();
                $.each(jresult.errors, function(_index, _oData)
                {
                    var errores = `<li id="lista">${_oData}</li>`;
                    document.getElementById('divError').innerHTML += errores
                })
                $("div#divError").show();
            }//fin:if
            else{
                $("li#divError").html("");
                $("li#divError").hide();
                $("li#lista").remove();
                Swal.fire({ icon: 'success', title: 'Exito', text: "Registro exitoso" });
                document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
            }//fin:else
        },
        error: function(xhrCS, statusCS) {
            console.log(xhrCS)
        }
    }); 
}
//-------------------------------------------------------------------------------------------------
function updateProfesor(datos){
    var sTemplate  = ""; 
    $('div#divmodal div.modal-body').empty();      
    var sTituloModal = "Actualizar Alumno";
    sTemplate = `
        <form id="formulario" onsubmit="return modificarProfesor(event);">
            <div value="Errors.length > 0"  style="display: none" id="divError" class="m-1 alert alert-danger" role="alert">

            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">cedula</label>
                        <input name="cedula" id="cedula" value="${datos.cedula}" class="form-control" rows="4" required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">nombre</label>
                        <input name="nombre" id="nombre" value="${datos.nombre}" class="form-control" rows="4" required maxlength="100"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">primer_apellodo</label>
                        <input name="primer_apellodo" id="primer_apellodo" value="${datos.primer_apellodo}" class="form-control" rows="4" required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">segundo_apellido</label>
                        <input name="segundo_apellido" id="segundo_apellido" value="${datos.segundo_apellido}" class="form-control" rows="4" required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">email</label>
                        <input type="email" name="email" id="email" value="${datos.email}" class="form-control" rows="4" required maxlength="100" ></input>
                    </div>
                </div>

                <div class="col-4 form-check">
                    <div class="form-group">
                        <input type ="checkbox" id="lactivo" name="lactivo" ${(datos.lactivo==1)?"checked":""} />
                        <label class="form-check-label" for="gridCheck">¿activo?</label>
                    </div>
                </div>
                <input name="idprofesor" id="idprofesor" value="${datos.idprofesor}" class=" form-control" rows="4" hidden></input>
                <input name="dtcreacion" id="dtcreacion" value="${datos.dtcreacion}" class=" form-control" rows="4" hidden></input>
            </div>
            <div class="modal-footer">
                <button type="submit"  class="btn btn-primary">Guardar</button>
            </div>
        </form>
    `;

    $('div#divmodal div.modal-body').html(sTemplate);
    $('div#divmodal h5.modal-titulo').html(sTituloModal);
    $('div#divmodal').modal('show');
}
//-------------------------------------------------------------------------------------------------
function modificarProfesor(event){
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());
    $.ajax({
        url: "/api/updateprofesor"
        , type: "post"
        , datatype:"json"
        , data: {
            "datos":value,
        }
        , beforeSend:function(request){
        }
        , success: function(jresult, textStatus, jQxhr ){
            $.unblockUI();
            if(jresult.errors.length > 0){ 
                $("li#divError").html("");
                $("li#lista").remove();
                $.each(jresult.errors, function(_index, _oData)
                {
                    var errores = `<li id="lista">${_oData}</li>`;
                    document.getElementById('divError').innerHTML += errores
                })
                $("div#divError").show();
            }//fin:if
            else{
                $("li#divError").html("");
                $("li#divError").hide();
                $("li#lista").remove();
                Swal.fire({ icon: 'success', title: 'Exito', text: "Modificacion exitosa" });
                document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
            }//fin:else
        },
        error: function(xhrCS, statusCS) {
            console.log(xhrCS)
        }
    });
}
//-------------------------------------------------------------------------------------------------
function deleteProfesor(datos){
    Swal.fire({
        title: '¿Eliminar?',
        text: "Esta accion no se podra revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/api/deleteprofesor"
                , type: "post"
                , datatype:"json"
                , data: {
                    "iid":datos.idprofesor,
                }
                , beforeSend:function(request){
                }
                , success: function(jresult, textStatus, jQxhr ){
                    $.unblockUI();
                    if(jresult.errors.length > 0){
                        $.each(jresult.errors, function(_index, _oData)
                        {
                            Swal.fire({ icon: 'error', title: 'Error', text: _oData });
                        })
                    }//fin:if
                    else{
                        Swal.fire({ icon: 'success', title: 'Exito', text: "Se cambio activo del registro a false" });
                        document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
                    }//fin:else
                },
                error: function(xhrCS, statusCS) {
                    console.log(xhrCS)
                }
            });
            
        }
    });
}


//-------------------------------------------------------------------------------------------------
function fnObtenerCarreras(){
    var sTemplate   = "";
    var htmlObject  = null;

    try {
        if (typeof(DTCarrera) !== "undefined" && DTCarrera !== null ) {
            DTCarrera.clear();
            DTCarrera.destroy();
        }//fin:if (typeof(DTCarrera) !== "undefined" && DTCarrera !== null )

        $('div#Carreras').remove();

        sTemplate = `
        <div style="margin-top: 50px;">
        <h4 style="margin-bottom: 0px;"> &nbsp; <a id="botonAgregar" onclick="fnAgregarCarrera(this)" class="mb-2 text-center btn btn-primary">Agregar</a> &nbsp; &nbsp; &nbsp; &nbsp; <a id="Carrera" onclick="fnDescargarCSV(this)" class="mb-2 text-center btn btn-primary">DESCARGAR CSV</a></h4>
        <div class="ml-2 mr-2 row dflex justify-content-center"></div>
        <div id="error" class="alert alert-secondary alert-dismissible fade show" role="alert"></div>
        <div id="respuesta" class="mt-3">
            <div class="table-responsive" data-topline="1">
            <table data-dttable='1' style="background: transparent;" width='100%' id='tbl-carrera' class='table dt-responsive responsive hover nowrap'>
                <thead>
                    <tr style="color:#fffff; background: transparent;" id="tr-head-carrera">
                        <th>idcarrera</th>  
                        <th>clave</th>
                        <th>nombre</th>
                        <th>no_semestres</th>
                        <th>dtcreacion</th>
                        <th>dtmodificacion</th>
                        <th>lactivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody style="color:#fffff; background: transparent;" id="body-carrera"></tbody>
            </table>
          </div>
        </div></div>`;
           
        htmlObject = document.createElement('div');
        htmlObject.setAttribute("id","Carreras");
        htmlObject.setAttribute("style","width:100%; height:100%; overflow: scroll;");
        htmlObject.innerHTML = sTemplate;      
        $('div[aria-label="tab-content-contenido"]').append(htmlObject);
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        $.ajax({
            url:window.location.href + "api/carrera",
            type: "post",
            "data": {
                "opcion": 1
            },
            beforeSend: function(){
                $.blockUI({ message:'<h3><img src="/assets/images/ajax-loader.gif" width="45" height="40" />Un momento por favor...</h3>'});
            },
            success:function(jresult){
                $.unblockUI();
                if(jresult.errors.length <= 0){
                    if(jresult.data.length > 0){
                        $("#respuesta").show();
                        $("#error").hide();
                        DTCarrera = $('table#tbl-carrera').DataTable(confDTCarrera);
                        DTCarrera.clear().draw();
                        $.each(jresult.data, function(_index, _oData ) {
                            DTCarrera.row.add({
                                 "idcarrera": _oData.idcarrera
                                ,"clave": _oData.clave
                                ,"nombre": _oData.nombre
                                ,"no_semestres": _oData.no_semestres
                                ,"dtcreacion": _oData.dtcreacion
                                ,"dtmodificacion": _oData.dtmodificacion
                                ,"lactivo": _oData.lactivo
                                ,"acciones": "-"
                            });
                        });
                        DTCarrera.draw();
                        DTCarrera.columns.adjust().draw();
                    }//fin:if
                    else{
                        $("#error").hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Aviso',
                            text: "No existen registros aun, favor de agregarlos para visualizarlos en este apartado"
                        });
                    }//fin:else
                }//fin:if
                else{
                    $("#error").hide();
                    Swal.fire({
                        icon: 'error',
                        title: 'Aviso',
                        text: jresult.errors
                    });
                }//fin:if(data.Errors.length <= 0)
            },
            error: function(xhrCS, statusCS) {
                Swal.fire({
                    icon: 'error',
                    title: 'Aviso',
                    text: xhrCS.status
                });
            }
        }); //fin:$.ajax()
        
    }//fin:try
    catch (error) { 
        Swal.fire({ icon: 'error', title: 'Aviso', text: error});
    } 
    return sTemplate;
}//fin:fnObtenerCarreras
function fnAgregarCarrera(_this){
    var sTituloModal = "Agregar tipo de obra";
    $('div#divmodal div.modal-body').empty();

    sTemplate = `
    <form id="formulario" onsubmit="return crearCarrera(event);">
    <div value="Errors.length > 0"  style="display: none" id="divError" class="m-1 alert alert-danger" role="alert">

    </div>
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">clave</label>
                <input name="clave" id="clave" value="" class="form-control" rows="4" required maxlength="55"></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">nombre</label>
                <input name="nombre" id="nombre" value="" class="form-control" rows="4" required maxlength="100"></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">no_semestres</label>
                <input type="number" name="no_semestres" id="no_semestres" value="" class="form-control" rows="4" required maxlength="55"></input>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="submit"  class="btn btn-primary">Guardar</button>
    </div>
    </form>`;

    $('div#divmodal div.modal-body').html(sTemplate);
    $('div#divmodal h5.modal-titulo').html(sTituloModal);
    $('div#divmodal').modal('show');
}
//-------------------------------------------------------------------------------------------------
function crearCarrera(event){
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());
    $.ajax({
        url: "/api/createcarrera"
        , type: "post"
        , datatype:"json"
        , data: {
            "datos":value,
        }
        , beforeSend:function(request){
        }
        , success: function(jresult, textStatus, jQxhr ){
            $.unblockUI();
            if(jresult.errors.length > 0){ 
                $("li#divError").html("");
                $("li#lista").remove();
                $.each(jresult.errors, function(_index, _oData)
                {
                    var errores = `<li id="lista">${_oData}</li>`;
                    document.getElementById('divError').innerHTML += errores
                })
                $("div#divError").show();
            }//fin:if
            else{
                $("li#divError").html("");
                $("li#divError").hide();
                $("li#lista").remove();
                Swal.fire({ icon: 'success', title: 'Exito', text: "Registro exitoso" });
                document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
            }//fin:else
        },
        error: function(xhrCS, statusCS) {
            console.log(xhrCS)
        }
    }); 
}
//-------------------------------------------------------------------------------------------------
function updateCarrera(datos){
    var sTemplate  = ""; 
    $('div#divmodal div.modal-body').empty();      
    var sTituloModal = "Actualizar Alumno";
    sTemplate = `
        <form id="formulario" onsubmit="return modificarCarrera(event);">
            <div value="Errors.length > 0"  style="display: none" id="divError" class="m-1 alert alert-danger" role="alert">

            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">clave</label>
                        <input name="clave" id="clave" value="${datos.clave}" class="form-control" rows="4" required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">nombre</label>
                        <input name="nombre" id="nombre" value="${datos.nombre}" class="form-control" rows="4" required maxlength="100"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">no_semestres</label>
                        <input name="no_semestres" id="no_semestres" value="${datos.no_semestres}" class="form-control" rows="4" required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-4 form-check">
                    <div class="form-group">
                        <input type ="checkbox" id="lactivo" name="lactivo" ${(datos.lactivo==1)?"checked":""} />
                        <label class="form-check-label" for="gridCheck">¿activo?</label>
                    </div>
                </div>
                <input name="idcarrera" id="idcarrera" value="${datos.idcarrera}" class=" form-control" rows="4" hidden></input>
                <input name="dtcreacion" id="dtcreacion" value="${datos.dtcreacion}" class=" form-control" rows="4" hidden></input>
            </div>
            <div class="modal-footer">
                <button type="submit"  class="btn btn-primary">Guardar</button>
            </div>
        </form>
    `;

    $('div#divmodal div.modal-body').html(sTemplate);
    $('div#divmodal h5.modal-titulo').html(sTituloModal);
    $('div#divmodal').modal('show');
}
//-------------------------------------------------------------------------------------------------
function modificarCarrera(event){
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());
    $.ajax({
        url: "/api/updatecarrera"
        , type: "post"
        , datatype:"json"
        , data: {
            "datos":value,
        }
        , beforeSend:function(request){
        }
        , success: function(jresult, textStatus, jQxhr ){
            $.unblockUI();
            if(jresult.errors.length > 0){ 
                $("li#divError").html("");
                $("li#lista").remove();
                $.each(jresult.errors, function(_index, _oData)
                {
                    var errores = `<li id="lista">${_oData}</li>`;
                    document.getElementById('divError').innerHTML += errores
                })
                $("div#divError").show();
            }//fin:if
            else{
                $("li#divError").html("");
                $("li#divError").hide();
                $("li#lista").remove();
                Swal.fire({ icon: 'success', title: 'Exito', text: "Modificacion exitosa" });
                document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
            }//fin:else
        },
        error: function(xhrCS, statusCS) {
            console.log(xhrCS)
        }
    });
}
//-------------------------------------------------------------------------------------------------
function deleteCarrera(datos){
    Swal.fire({
        title: '¿Eliminar?',
        text: "Esta accion no se podra revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/api/deletecarrera"
                , type: "post"
                , datatype:"json"
                , data: {
                    "iid":datos.idcarrera,
                }
                , beforeSend:function(request){
                }
                , success: function(jresult, textStatus, jQxhr ){
                    $.unblockUI();
                    if(jresult.errors.length > 0){
                        $.each(jresult.errors, function(_index, _oData)
                        {
                            Swal.fire({ icon: 'error', title: 'Error', text: _oData });
                        })
                    }//fin:if
                    else{
                        Swal.fire({ icon: 'success', title: 'Exito', text: "Se cambio activo del registro a false" });
                        document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
                    }//fin:else
                },
                error: function(xhrCS, statusCS) {
                    console.log(xhrCS)
                }
            });
            
        }
    });
}

//-------------------------------------------------------------------------------------------------
function fnObtenerSemestres(){
    var sTemplate   = "";
    var htmlObject  = null;

    try {
        if (typeof(DTSemestre) !== "undefined" && DTSemestre !== null ) {
            DTSemestre.clear();
            DTSemestre.destroy();
        }//fin:if (typeof(DTSemestre) !== "undefined" && DTSemestre !== null )

        $('div#Semestres').remove();

        sTemplate = `
        <div style="margin-top: 50px;">
        <h4 style="margin-bottom: 0px;"> &nbsp; <a id="botonAgregar" onclick="fnAgregarSemestre(this)" class="mb-2 text-center btn btn-primary">Agregar</a> &nbsp; &nbsp; &nbsp; &nbsp; <a id="Semestre" onclick="fnDescargarCSV(this)" class="mb-2 text-center btn btn-primary">DESCARGAR CSV</a></h4>
        <div class="ml-2 mr-2 row dflex justify-content-center"></div>
        <div id="error" class="alert alert-secondary alert-dismissible fade show" role="alert"></div>
        <div id="respuesta" class="mt-3">
            <div class="table-responsive" data-topline="1">
            <table data-dttable='1' style="background: transparent;" width='100%' id='tbl-semestre' class='table dt-responsive responsive hover nowrap'>
                <thead>
                    <tr style="color:#fffff; background: transparent;" id="tr-head-semestre">
                        <th>idsemestre</th>  
                        <th>idcarrera</th>
                        <th>carrera</th>
                        <th>clave</th>
                        <th>semestre</th>
                        <th>dtinicio</th>
                        <th>dtfin</th>
                        <th>dtcreacion</th>
                        <th>dtmodificacion</th>
                        <th>lactivo</th>
                        <th>acciones</th>
                    </tr>
                </thead>
                <tbody style="color:#fffff; background: transparent;" id="body-semestre"></tbody>
            </table>
          </div>
        </div></div>`;
           
        htmlObject = document.createElement('div');
        htmlObject.setAttribute("id","Semestres");
        htmlObject.setAttribute("style","width:100%; height:100%; overflow: scroll;");
        htmlObject.innerHTML = sTemplate;      
        $('div[aria-label="tab-content-contenido"]').append(htmlObject);
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        $.ajax({
            url:window.location.href + "api/semestre",
            type: "post",
            "data": {
                "opcion": 1
            },
            beforeSend: function(){
                $.blockUI({ message:'<h3><img src="/assets/images/ajax-loader.gif" width="45" height="40" />Un momento por favor...</h3>'});
            },
            success:function(jresult){
                $.unblockUI();
                if(jresult.errors.length <= 0){
                    if(jresult.data.length > 0){
                        $("#respuesta").show();
                        $("#error").hide();
                        DTSemestre = $('table#tbl-semestre').DataTable(confDTSemestre);
                        DTSemestre.clear().draw();
                        $.each(jresult.data, function(_index, _oData ) {
                            DTSemestre.row.add({
                                 "idsemestre": _oData.idsemestre
                                ,"idcarrera": _oData.idcarrera
                                ,"carrera": _oData.nombre
                                ,"clave": _oData.clave
                                ,"semestre": _oData.semestre
                                ,"dtinicio": _oData.dtinicio
                                ,"dtfin": _oData.dtfin
                                ,"dtcreacion": _oData.dtcreacion
                                ,"dtmodificacion": _oData.dtmodificacion
                                ,"lactivo": _oData.lactivo
                                ,"acciones": "-"
                            });
                        });
                        DTSemestre.draw();
                        DTSemestre.columns.adjust().draw();
                    }//fin:if
                    else{
                        $("#error").hide();
                        Swal.fire({
                            icon: 'error',
                            title: 'Aviso',
                            text: "No existen registros aun, favor de agregarlos para visualizarlos en este apartado"
                        });
                    }//fin:else
                }//fin:if
                else{
                    $("#error").hide();
                    Swal.fire({
                        icon: 'error',
                        title: 'Aviso',
                        text: jresult.errors
                    });
                }//fin:if(data.Errors.length <= 0)
            },
            error: function(xhrCS, statusCS) {
                $.unblockUI();
                Swal.fire({
                    icon: 'error',
                    title: 'Aviso',
                    text: xhrCS.status
                });
            }
        }); //fin:$.ajax()
        
    }//fin:try
    catch (error) { 
        Swal.fire({ icon: 'error', title: 'Aviso', text: error});
    } 
    return sTemplate;
}//fin:fnObtenerSemestres
async function fnAgregarSemestre(_this){
    var sTituloModal = "Semestre";
    $('div#divmodal div.modal-body').empty();

    carreras = await fetch(window.location.href +'api/carrera', {
        headers:{
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: ""
    });

    const datas = await carreras.json();

    sTemplate = `
    <form id="formulario" onsubmit="return crearSemestre(event);">
    <div value="Errors.length > 0"  style="display: none" id="divError" class="m-1 alert alert-danger" role="alert">

    </div>
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">carrera</label>
                <select name="" onchange="cambiarCarrera(event)">`;
                
                datas.data.forEach(datas2 => {
                    sTemplate += `<option value="${datas2.idcarrera}">${datas2.nombre}</option>`;
                });
                sTemplate     += `
                </select>
                <input name="idcarrera" id="idcarrera" value="" class="form-control" rows="4" hidden required maxlength="55"></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">clave</label>
                <input name="clave" id="clave" value="" class="form-control" rows="4" required maxlength="55"></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">semestre</label>
                <input name="semestre" id="semestre" value="" class="form-control" rows="4" required maxlength="100"></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">dtinicio</label>
                <input type="date" name="dtinicio" id="dtinicio" value="" class="form-control" rows="4" ></input>
            </div>
        </div>
        <div class="col-6">
            <div class="form-group">
                <label for="exampleFormControlTextarea1">dtfin</label>
                <input type="date" name="dtfin" id="dtfin" value="" class="form-control" rows="4" required></input>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="submit"  class="btn btn-primary">Guardar</button>
    </div>
    </form>`;

    $('div#divmodal div.modal-body').html(sTemplate);
    $('div#divmodal h5.modal-titulo').html(sTituloModal);
    $('div#divmodal').modal('show');
}

function cambiarCarrera(e){
    document.getElementById("idcarrera").value = e.target.value
}
//-------------------------------------------------------------------------------------------------
function crearSemestre(event){
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());
    $.ajax({
        url: "/api/createsemestre"
        , type: "post"
        , datatype:"json"
        , data: {
            "datos":value,
        }
        , beforeSend:function(request){
        }
        , success: function(jresult, textStatus, jQxhr ){
            $.unblockUI();
            if(jresult.errors.length > 0){ 
                $("li#divError").html("");
                $("li#lista").remove();
                $.each(jresult.errors, function(_index, _oData)
                {
                    var errores = `<li id="lista">${_oData}</li>`;
                    document.getElementById('divError').innerHTML += errores
                })
                $("div#divError").show();
            }//fin:if
            else{
                $("li#divError").html("");
                $("li#divError").hide();
                $("li#lista").remove();
                Swal.fire({ icon: 'success', title: 'Exito', text: "Registro exitoso" });
                document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
            }//fin:else
        },
        error: function(xhrCS, statusCS) {
            console.log(xhrCS)
        }
    }); 
}
//-------------------------------------------------------------------------------------------------
async function updateSemestre(datos){
    var sTemplate  = ""; 
    $('div#divmodal div.modal-body').empty();      
    var sTituloModal = "Actualizar Alumno";
    carreras = await fetch(window.location.href +'api/carrera', {
        headers:{
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: ""
    });

    const datas = await carreras.json();
    sTemplate = `
        <form id="formulario" onsubmit="return modificarSemestre(event);">
            <div value="Errors.length > 0"  style="display: none" id="divError" class="m-1 alert alert-danger" role="alert">

            </div>
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">carrera</label>
                        <select name="" onchange="cambiarCarrera(event)">`;
                        
                        datas.data.forEach(datas2 => {
                            if(datas2.idcarrera!=datos.idcarrera){
                                sTemplate += `<option value="${datas2.idcarrera}">${datas2.nombre}</option>`;
                            }else{
                                sTemplate += `<option selected value="${datas2.idcarrera}">${datas2.nombre}</option>`;
                            }
                        });
                        
                        sTemplate     += `
                        </select>
                        <input name="idcarrera" id="idcarrera" value="${datos.idcarrera}" class="form-control" rows="4" hidden required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">clave</label>
                        <input name="clave" id="clave" value="${datos.clave}" class="form-control" rows="4" required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">semestre</label>
                        <input name="semestre" id="semestre" value="${datos.semestre}" class="form-control" rows="4" required maxlength="100"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">dtinicio</label>
                        <input type="date" name="dtinicio" id="dtinicio" value="${new Date(datos.dtinicio).toISOString().slice(0, 10)}" class="form-control" rows="4" required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">dtfin</label>
                        <input type="date" name="dtfin" id="dtfin" value="${new Date(datos.dtfin).toISOString().slice(0, 10)}" class="form-control" rows="4" required maxlength="55"></input>
                    </div>
                </div>
                <div class="col-4 form-check">
                    <div class="form-group">
                        <input type ="checkbox" id="lactivo" name="lactivo" ${(datos.lactivo==1)?"checked":""} />
                        <label class="form-check-label" for="gridCheck">¿activo?</label>
                    </div>
                </div>
                <input name="idsemestre" id="idsemestre" value="${datos.idsemestre}" class=" form-control" rows="4" hidden></input>
                <input name="dtcreacion" id="dtcreacion" value="${datos.dtcreacion}" class=" form-control" rows="4" hidden></input>
            </div>
            <div class="modal-footer">
                <button type="submit"  class="btn btn-primary">Guardar</button>
            </div>
        </form>
    `;

    $('div#divmodal div.modal-body').html(sTemplate);
    $('div#divmodal h5.modal-titulo').html(sTituloModal);
    $('div#divmodal').modal('show');
}
//-------------------------------------------------------------------------------------------------
function modificarSemestre(event){
    event.preventDefault();
    const data = new FormData(event.target);

    const value = Object.fromEntries(data.entries());
    $.ajax({
        url: "/api/updatesemestre"
        , type: "post"
        , datatype:"json"
        , data: {
            "datos":value,
        }
        , beforeSend:function(request){
        }
        , success: function(jresult, textStatus, jQxhr ){
            $.unblockUI();
            if(jresult.errors.length > 0){ 
                $("li#divError").html("");
                $("li#lista").remove();
                $.each(jresult.errors, function(_index, _oData)
                {
                    var errores = `<li id="lista">${_oData}</li>`;
                    document.getElementById('divError').innerHTML += errores
                })
                $("div#divError").show();
            }//fin:if
            else{
                $("li#divError").html("");
                $("li#divError").hide();
                $("li#lista").remove();
                Swal.fire({ icon: 'success', title: 'Exito', text: "Modificacion exitosa" });
                document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
            }//fin:else
        },
        error: function(xhrCS, statusCS) {
            console.log(xhrCS)
        }
    });
}
//-------------------------------------------------------------------------------------------------
function deleteSemestre(datos){
    Swal.fire({
        title: '¿Eliminar?',
        text: "Esta accion no se podra revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/api/deletesemestre"
                , type: "post"
                , datatype:"json"
                , data: {
                    "iid":datos.idsemestre,
                }
                , beforeSend:function(request){
                }
                , success: function(jresult, textStatus, jQxhr ){
                    $.unblockUI();
                    if(jresult.errors.length > 0){
                        $.each(jresult.errors, function(_index, _oData)
                        {
                            Swal.fire({ icon: 'error', title: 'Error', text: _oData });
                        })
                    }//fin:if
                    else{
                        Swal.fire({ icon: 'success', title: 'Exito', text: "Se cambio activo del registro a false" });
                        document.getElementsByClassName("dhx_button dhx_sidebar-button dhx_sidebar-button--active")[0].click();
                    }//fin:else
                },
                error: function(xhrCS, statusCS) {
                    console.log(xhrCS)
                }
            });
            
        }
    });
}
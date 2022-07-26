<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();
    //---------------------------------------------------------------------------------------------
    $app->get('/', function ($request, $response, $args) {

        $titlepage  = "";
        $sUrlRecibo = "";
    
        switch($this->get('settings')['environment']){
            case "dev":  
                $titlepage = "[DESARROLLO]"; 
                $sUrlRecibo = $this->get('settings')['variables']['desarrollo']['urlrecibo'];
            break;
            case "prod": 
                $titlepage = "[PRODUCCION]"; 
                $sUrlRecibo = $this->get('settings')['variables']['produccion']['urlrecibo'];
            break;
        }//fin:switch    
    
        return $this->view->render($response, 'home.twig', ['environment' => $titlepage, 'urlrecibo'=> $sUrlRecibo]);
        //return $this->view->render($response, 'home.twig', ['environment' => $titlepage] );        
    })->setName('home');    
    //---------------------------------------------------------------------------------------------
    $app->group('/api', function () {                                                  

        $this->post('/alumno',              \ConsultaController::class . ':getAlumnos');  
        $this->post('/updatealumno',        \ConsultaController::class . ':updateAlumno');
        $this->post('/createalumno',        \ConsultaController::class . ':createAlumno');
        $this->post('/deletealumno',        \ConsultaController::class . ':deleteAlumno');

        $this->post('/profesor',              \ConsultaController::class . ':getProfesores');  
        $this->post('/updateprofesor',        \ConsultaController::class . ':updateProfesor');
        $this->post('/createprofesor',        \ConsultaController::class . ':createProfesor');
        $this->post('/deleteprofesor',        \ConsultaController::class . ':deleteProfesor');

        $this->post('/carrera',              \ConsultaController::class . ':getCarreras');  
        $this->post('/updatecarrera',        \ConsultaController::class . ':updateCarrera');
        $this->post('/createcarrera',        \ConsultaController::class . ':createCarrera');
        $this->post('/deletecarrera',        \ConsultaController::class . ':deleteCarrera');

        $this->post('/semestre',              \ConsultaController::class . ':getSemestre');  
        $this->post('/updatesemestre',        \ConsultaController::class . ':updateSemestre');
        $this->post('/createsemestre',        \ConsultaController::class . ':createSemestre');
        $this->post('/deletesemestre',        \ConsultaController::class . ':deleteSemestre');

        $this->post('/grupo',              \ConsultaController::class . ':getGrupos');  
        $this->post('/updategrupo',        \ConsultaController::class . ':updateGrupo');
        $this->post('/creategrupo',        \ConsultaController::class . ':createGrupo');
        $this->post('/deletegrupo',        \ConsultaController::class . ':deleteGrupo');

        $this->post('/asignatura',              \ConsultaController::class . ':getAsignaturas');  
        $this->post('/updateasignatura',        \ConsultaController::class . ':updateAsignatura');
        $this->post('/createasignatura',        \ConsultaController::class . ':createAsignatura');
        $this->post('/deleteasignatura',        \ConsultaController::class . ':deleteAsignatura');

        $this->post('/horarioalumno',              \ConsultaController::class . ':getHorariosAlumno');  
        $this->post('/updatehorarioalumno',        \ConsultaController::class . ':updateHorarioAlumno');
        $this->post('/createhorarioalumno',        \ConsultaController::class . ':createHorarioAlumno');
        $this->post('/deletehorarioalumno',        \ConsultaController::class . ':deleteHorarioAlumno');
    });//fin:group 
    //---------------------------------------------------------------------------------------------
};

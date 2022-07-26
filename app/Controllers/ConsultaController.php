<?php
    namespace App\Controllers;

    use Exception;
    use Carbon\Carbon;
    use App\Models\DTOAlumno;
    use App\Models\DTOProfesor;
    use App\Models\DTOCarreras;
    use App\Models\DTOSemestre;

    use Illuminate\Database\Capsule\Manager as DB;
    Use Illuminate\Support\Facades\BD;
    //use Illuminate\Support\Facades\Config;
    
    use Psr\Container\ContainerInterface;

    class ConsultaController{

        protected $container;
        //---------------------------------------------------------------------
        public function __construct(ContainerInterface $container) {
            $this->container = $container;
        }//fin:__construct
        //---------------------------------------------------------------------
        public function getAlumnos($request, $response, $args){
            $data = $request->getParsedBody();
            $error = [];           
            $query = null;
            $aRespuesta = [];
            $aResultSet = [];
            $aInputs    = [];
            $aValores   = [];
            $aConditionsAND = [];
            $aConditionsOR  = [];

            try {
                if (count($error) <= 0) {
                    $aResultSet     = DTOAlumno::orderby("dtcreacion",'Desc')->get();
                }//fin:if
            }//fin:try            
            catch (Exception $Exc) { array_push($error, $Exc->getMessage());}

            //return $response->withHeader('Content-type', 'application/json')->withJson(["Errors" => $error, "data" => $aRespuesta]);
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $aResultSet]);
        }//fin:getAlumnos
        //---------------------------------------------------------------------
        public function createAlumno($request, $response){
            $datos = $request->getParsedBody();
            $data = $datos["datos"];
            $error = [];
            $aRespuesta = [];
            try {
                if (!isset($data["matricula"]) || $data["matricula"] == ""){
                    array_push($error, "Falta el parametro matricula ");
                }
                if (!isset($data["nombre"]) || $data["nombre"] == ""){
                    array_push($error, "Falta el parametro nombre ");
                }
                if (!isset($data["primer_apellodo"]) || $data["primer_apellodo"] == ""){
                    array_push($error, "Falta el parametro primer_apellodo ");
                }
                if (!isset($data["segundo_apellido"]) || $data["segundo_apellido"] == ""){
                    array_push($error, "Falta el parametro segundo_apellido ");
                }
                if (!isset($data["email"]) || $data["email"] == ""){
                    array_push($error, "Falta el parametro email ");
                }
                if (count($error) <= 0) {
                    
                    $aAlumno = DTOAlumno::where(["matricula" =>  $data["matricula"]])->first();
                    if($aAlumno == null){
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOAlumno::insert(
                            array(
                                'matricula'         =>  $data["matricula"],
                                'nombre'            =>   $data["nombre"],
                                'primer_apellodo'   =>  $data["primer_apellodo"],
                                'segundo_apellido'  =>  $data["segundo_apellido"],
                                'email'             =>  $data["email"],
                                'dtcreacion'        =>  date("Y-m-d H:i:s", time()),
                                'lactivo'           =>  true,
                            )
                        );
                    }else{
                        array_push($error, "Ya existe un alumno registrado con esta matricula");
                    }
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $aRespuesta]);
        }//fin:createAlumno
        //---------------------------------------------------------------------
        public function updateAlumno($request, $response, $args){
            $datos = $request->getParsedBody();
            $data = $datos["datos"];
            $error = [];
            $aRespuesta = [];
            try {
                if (!isset($data["idalumno"]) || $data["idalumno"] == ""){
                    array_push($error, "Falta el parametro idalumno ");
                }
                if (!isset($data["matricula"]) || $data["matricula"] == ""){
                    array_push($error, "Falta el parametro matricula ");
                }
                if (!isset($data["nombre"]) || $data["nombre"] == ""){
                    array_push($error, "Falta el parametro nombre ");
                }
                if (!isset($data["primer_apellodo"]) || $data["primer_apellodo"] == ""){
                    array_push($error, "Falta el parametro primer_apellodo ");
                }
                if (!isset($data["segundo_apellido"]) || $data["segundo_apellido"] == ""){
                    array_push($error, "Falta el parametro segundo_apellido ");
                }
                if (!isset($data["email"]) || $data["email"] == ""){
                    array_push($error, "Falta el parametro email ");
                }
                if (!isset($data["dtcreacion"]) || $data["dtcreacion"] == ""){
                    array_push($error, "Falta el parametro dtcreacion ");
                }
                if (!isset($data["lactivo"]) ||$data["lactivo"] == null){
                    $data["lactivo"] = 0;
                }
                else{
                    $data["lactivo"] = $data["lactivo"]=="on" ? 1 : 0;
                }
        
                if (count($error) <= 0) {
                    $aAlumno = DTOAlumno::where(["matricula" =>  $data["matricula"]])->first();
                    $aAlumnoId = DTOAlumno::where(["idalumno" =>  $data["idalumno"]])->first();
                    if($aAlumno == null || $aAlumno == $aAlumnoId){
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOAlumno::where(['idalumno' => $data["idalumno"]])->update(
                            array(
                                'matricula'         =>  $data["matricula"],
                                'nombre'            =>   $data["nombre"],
                                'primer_apellodo'   =>  $data["primer_apellodo"],
                                'segundo_apellido'  =>  $data["segundo_apellido"],
                                'email'             =>  $data["email"],
                                'dtcreacion'        =>  $data["dtcreacion"],
                                'dtmodificacion'    =>  date("Y-m-d H:i:s", time()),
                                'lactivo'           =>   $data["lactivo"],
                            )
                        );
                    }else{
                        array_push($error, "Ya existe un profesor registrado con esta matricula");
                    }
                    
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $aRespuesta]);
            //return ["Errors" => $error, "data" => $aRespuesta];
        }//fin:updateAlumno
        public function deleteAlumno($request, $response, $args){
            $data = $request->getParsedBody();
            $error = [];
            $aRespuesta = [];
            try {
                if ( isset($data["iid"])) {
                    if (!isset($data["iid"]) || $data["iid"] == ""){
                        array_push($error, "Falta el parametro iid ");
                    }
                }
                else {
                    array_push($error, "Faltan parametros");
                }//fin:else

                if (count($error) <= 0) {
                    $aRespuesta = DTOAlumno::where(["idalumno" =>  $data["iid"]])->get();
                    if(count($aRespuesta)>=0)
                    {
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOAlumno::where(['idalumno' => $data["iid"]])->update(
                            array(
                                'dtmodificacion'   =>  date("Y-m-d H:i:s", time()),
                                'lactivo'     =>   0,
                            )
                        );
                    }
                    else
                    {
                        array_push($error, "Ocurrio un error al eliminar, contacte a un administrador.");
                    }
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["Errors" => $error, "data" => $aRespuesta]);
            //return ["Errors" => $error, "data" => $aRespuesta];
        }//fin:deleteAlumno

        public function getProfesores($request, $response, $args){
            $data = $request->getParsedBody();
            $error = [];           
            $query = null;
            $aRespuesta = [];
            $aResultSet = [];
            $aInputs    = [];
            $aValores   = [];
            $aConditionsAND = [];
            $aConditionsOR  = [];

            try {
                if (count($error) <= 0) {
                    $aResultSet     = DTOProfesor::orderby("dtcreacion",'Desc')->get();
                }//fin:if
            }//fin:try            
            catch (Exception $Exc) { array_push($error, $Exc->getMessage());}

            //return $response->withHeader('Content-type', 'application/json')->withJson(["Errors" => $error, "data" => $aRespuesta]);
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $aResultSet]);
        }//fin:getProfesores
        //---------------------------------------------------------------------
        public function createProfesor($request, $response){
            $datos = $request->getParsedBody();
            $data = $datos["datos"];
            $error = [];
            $aRespuesta = [];
            try {
                if (!isset($data["cedula"]) || $data["cedula"] == ""){
                    array_push($error, "Falta el parametro cedula ");
                }
                if (!isset($data["nombre"]) || $data["nombre"] == ""){
                    array_push($error, "Falta el parametro nombre ");
                }
                if (!isset($data["primer_apellodo"]) || $data["primer_apellodo"] == ""){
                    array_push($error, "Falta el parametro primer_apellodo ");
                }
                if (!isset($data["segundo_apellido"]) || $data["segundo_apellido"] == ""){
                    array_push($error, "Falta el parametro segundo_apellido ");
                }
                if (!isset($data["email"]) || $data["email"] == ""){
                    array_push($error, "Falta el parametro email ");
                }
                if (count($error) <= 0) {
                    $aProfesor = DTOProfesor::where(["cedula" =>  $data["cedula"]])->first();
                    if($aProfesor == null){
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOProfesor::insert(
                            array(
                                'cedula'         =>  $data["cedula"],
                                'nombre'            =>   $data["nombre"],
                                'primer_apellodo'   =>  $data["primer_apellodo"],
                                'segundo_apellido'  =>  $data["segundo_apellido"],
                                'email'             =>  $data["email"],
                                'dtcreacion'        =>  date("Y-m-d H:i:s", time()),
                                'lactivo'           =>  true,
                            )
                        );
                    }else{
                        array_push($error, "Ya existe un profesor registrado con esta cedula");
                    }                    
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $data]);
        }//fin:createProfesor
        //---------------------------------------------------------------------
        public function updateProfesor($request, $response, $args){
            $datos = $request->getParsedBody();
            $data = $datos["datos"];
            $error = [];
            $aRespuesta = [];
            try {
                if (!isset($data["idprofesor"]) || $data["idprofesor"] == ""){
                    array_push($error, "Falta el parametro idprofesor ");
                }
                if (!isset($data["cedula"]) || $data["cedula"] == ""){
                    array_push($error, "Falta el parametro cedula ");
                }
                if (!isset($data["nombre"]) || $data["nombre"] == ""){
                    array_push($error, "Falta el parametro nombre ");
                }
                if (!isset($data["primer_apellodo"]) || $data["primer_apellodo"] == ""){
                    array_push($error, "Falta el parametro primer_apellodo ");
                }
                if (!isset($data["segundo_apellido"]) || $data["segundo_apellido"] == ""){
                    array_push($error, "Falta el parametro segundo_apellido ");
                }
                if (!isset($data["email"]) || $data["email"] == ""){
                    array_push($error, "Falta el parametro email ");
                }
                if (!isset($data["dtcreacion"]) || $data["dtcreacion"] == ""){
                    array_push($error, "Falta el parametro dtcreacion ");
                }
                if (!isset($data["lactivo"]) ||$data["lactivo"] == null){
                    $data["lactivo"] = 0;
                }
                else{
                    $data["lactivo"] = $data["lactivo"]=="on" ? 1 : 0;
                }
        
                if (count($error) <= 0) {
                    $aProfesor = DTOProfesor::where(["cedula" =>  $data["cedula"]])->first();
                    $aProfesorId = DTOProfesor::where(["idprofesor" =>  $data["idprofesor"]])->first();
                    if($aProfesor == null || $aProfesor == $aProfesorId){
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOProfesor::where(['idprofesor' => $data["idprofesor"]])->update(
                            array(
                                'cedula'         =>  $data["cedula"],
                                'nombre'            =>   $data["nombre"],
                                'primer_apellodo'   =>  $data["primer_apellodo"],
                                'segundo_apellido'  =>  $data["segundo_apellido"],
                                'email'             =>  $data["email"],
                                'dtcreacion'        =>  $data["dtcreacion"],
                                'dtmodificacion'    =>  date("Y-m-d H:i:s", time()),
                                'lactivo'           =>   $data["lactivo"],
                            )
                        );
                    }else{
                        array_push($error, "Ya existe un profesor registrado con esta cedula");
                    }
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $aRespuesta]);
            //return ["Errors" => $error, "data" => $aRespuesta];
        }//fin:updateProfesor
        public function deleteProfesor($request, $response, $args){
            $data = $request->getParsedBody();
            $error = [];
            $aRespuesta = [];
            try {
                if ( isset($data["iid"])) {
                    if (!isset($data["iid"]) || $data["iid"] == ""){
                        array_push($error, "Falta el parametro iid ");
                    }
                }
                else {
                    array_push($error, "Faltan parametros");
                }//fin:else

                if (count($error) <= 0) {
                    $aRespuesta = DTOProfesor::where(["idprofesor" =>  $data["iid"]])->get();
                    if(count($aRespuesta)>=0)
                    {
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOProfesor::where(['idprofesor' => $data["iid"]])->update(
                            array(
                                'dtmodificacion'   =>  date("Y-m-d H:i:s", time()),
                                'lactivo'     =>   0,
                            )
                        );
                    }
                    else
                    {
                        array_push($error, "Ocurrio un error al eliminar, contacte a un administrador.");
                    }
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $aRespuesta]);
            //return ["Errors" => $error, "data" => $aRespuesta];
        }//fin:deleteProfesor
        public function getCarreras($request, $response, $args){
            $data = $request->getParsedBody();
            $error = [];           
            $query = null;
            $aRespuesta = [];
            $aResultSet = [];
            $aInputs    = [];
            $aValores   = [];
            $aConditionsAND = [];
            $aConditionsOR  = [];

            try {
                if (count($error) <= 0) {
                    $aResultSet     = DTOCarreras::orderby("dtcreacion",'Desc')->get();
                }//fin:if
            }//fin:try            
            catch (Exception $Exc) { array_push($error, $Exc->getMessage());}

            //return $response->withHeader('Content-type', 'application/json')->withJson(["Errors" => $error, "data" => $aRespuesta]);
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $aResultSet]);
        }//fin:getProfesores
        //---------------------------------------------------------------------
        public function createCarrera($request, $response){
            $datos = $request->getParsedBody();
            $data = $datos["datos"];
            $error = [];
            $aRespuesta = [];
            try {
                if (!isset($data["clave"]) || $data["clave"] == ""){
                    array_push($error, "Falta el parametro clave ");
                }
                if (!isset($data["nombre"]) || $data["nombre"] == ""){
                    array_push($error, "Falta el parametro nombre ");
                }
                if (!isset($data["no_semestres"]) || $data["no_semestres"] == ""){
                    array_push($error, "Falta el parametro primer_apellodo ");
                }
                if (count($error) <= 0) {
                    $aProfesor = DTOCarreras::where(["clave" =>  $data["clave"]])->first();
                    if($aProfesor == null){
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOCarreras::insert(
                            array(
                                'clave'             =>  $data["clave"],
                                'nombre'            =>   $data["nombre"],
                                'no_semestres'      =>  $data["no_semestres"],
                                'dtcreacion'        =>  date("Y-m-d H:i:s", time()),
                                'lactivo'           =>  true,
                            )
                        );
                    }else{
                        array_push($error, "Ya existe un profesor registrado con esta clave");
                    }                    
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $data]);
        }//fin:createProfesor
        //---------------------------------------------------------------------
        public function updateCarrera($request, $response, $args){
            $datos = $request->getParsedBody();
            $data = $datos["datos"];
            $error = [];
            $aRespuesta = [];
            try {
                if (!isset($data["idcarrera"]) || $data["idcarrera"] == ""){
                    array_push($error, "Falta el parametro idcarrera ");
                }
                if (!isset($data["clave"]) || $data["clave"] == ""){
                    array_push($error, "Falta el parametro clave ");
                }
                if (!isset($data["nombre"]) || $data["nombre"] == ""){
                    array_push($error, "Falta el parametro nombre ");
                }
                if (!isset($data["no_semestres"]) || $data["no_semestres"] == ""){
                    array_push($error, "Falta el parametro no_semestres ");
                }
                if (!isset($data["dtcreacion"]) || $data["dtcreacion"] == ""){
                    array_push($error, "Falta el parametro dtcreacion ");
                }
                if (!isset($data["lactivo"]) ||$data["lactivo"] == null){
                    $data["lactivo"] = 0;
                }
                else{
                    $data["lactivo"] = $data["lactivo"]=="on" ? 1 : 0;
                }
        
                if (count($error) <= 0) {
                    $aProfesor = DTOCarreras::where(["clave" =>  $data["clave"]])->first();
                    $aProfesorId = DTOCarreras::where(["idcarrera" =>  $data["idcarrera"]])->first();
                    if($aProfesor == null || $aProfesor == $aProfesorId){
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOCarreras::where(['idcarrera' => $data["idcarrera"]])->update(
                            array(
                                'clave'             =>  $data["clave"],
                                'nombre'            =>   $data["nombre"],
                                'no_semestres'      =>  $data["no_semestres"],
                                'dtcreacion'        =>  $data["dtcreacion"],
                                'dtmodificacion'    =>  date("Y-m-d H:i:s", time()),
                                'lactivo'           =>   $data["lactivo"],
                            )
                        );
                    }else{
                        array_push($error, "Ya existe un profesor registrado con esta clave");
                    }
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $aRespuesta]);
            //return ["Errors" => $error, "data" => $aRespuesta];
        }//fin:updateProfesor
        public function deleteCarrera($request, $response, $args){
            $data = $request->getParsedBody();
            $error = [];
            $aRespuesta = [];
            try {
                if ( isset($data["iid"])) {
                    if (!isset($data["iid"]) || $data["iid"] == ""){
                        array_push($error, "Falta el parametro iid ");
                    }
                }
                else {
                    array_push($error, "Faltan parametros");
                }//fin:else

                if (count($error) <= 0) {
                    $aRespuesta = DTOCarreras::where(["idcarrera" =>  $data["iid"]])->get();
                    if(count($aRespuesta)>=0)
                    {
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOCarreras::where(['idcarrera' => $data["iid"]])->update(
                            array(
                                'dtmodificacion'   =>  date("Y-m-d H:i:s", time()),
                                'lactivo'     =>   0,
                            )
                        );
                    }
                    else
                    {
                        array_push($error, "Ocurrio un error al eliminar, contacte a un administrador.");
                    }
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $aRespuesta]);
            //return ["Errors" => $error, "data" => $aRespuesta];
        }//fin:deleteProfesor

        public function getSemestre($request, $response, $args){
            $data = $request->getParsedBody();
            $error = [];           
            $query = null;
            $aRespuesta = [];
            $aResultSet = [];
            $aInputs    = [];
            $aValores   = [];
            $aConditionsAND = [];
            $aConditionsOR  = [];

            try {
                $aRespuesta = DB::connection("CONEXION")->select("
                    select se.*,ca.nombre from semestre se 
                    join carrera ca on ca.idcarrera = se.idcarrera
                    where se.idcarrera = ca.idcarrera
                    ");
            }//fin:try            
            catch (Exception $Exc) { array_push($error, $Exc->getMessage());}

            //return $response->withHeader('Content-type', 'application/json')->withJson(["Errors" => $error, "data" => $aRespuesta]);
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $aRespuesta]);
        }//fin:getProfesores
        //---------------------------------------------------------------------
        public function createSemestre($request, $response){
            $datos = $request->getParsedBody();
            $data = $datos["datos"];
            $error = [];
            $aRespuesta = [];
            try {
                if (!isset($data["idcarrera"]) || $data["idcarrera"] == ""){
                    array_push($error, "Falta el parametro idcarrera ");
                }
                if (!isset($data["clave"]) || $data["clave"] == ""){
                    array_push($error, "Falta el parametro clave ");
                }
                if (!isset($data["semestre"]) || $data["semestre"] == ""){
                    array_push($error, "Falta el parametro semestre ");
                }
                if (!isset($data["dtinicio"]) || $data["dtinicio"] == ""){
                    array_push($error, "Falta el parametro dtinicio ");
                }
                if (!isset($data["dtfin"]) || $data["dtfin"] == ""){
                    array_push($error, "Falta el parametro dtfin ");
                }
                
                if (count($error) <= 0) {
                    $aProfesor = DTOSemestre::where(["clave" =>  $data["clave"]])->first();
                    if($aProfesor == null){
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOSemestre::insert(
                            array(
                                'idcarrera'             =>  $data["idcarrera"],
                                'clave'            =>   $data["clave"],
                                'semestre'      =>  $data["semestre"],
                                'dtinicio'            =>   $data["dtinicio"],
                                'dtfin'      =>  $data["dtfin"],
                                'dtcreacion'        =>  date("Y-m-d H:i:s", time()),
                                'lactivo'           =>  true,
                            )
                        );
                    }else{
                        array_push($error, "Ya existe un profesor registrado con esta clave");
                    }                    
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $data]);
        }//fin:createProfesor
        //---------------------------------------------------------------------
        public function updateSemestre($request, $response, $args){
            $datos = $request->getParsedBody();
            $data = $datos["datos"];
            $error = [];
            $aRespuesta = [];
            try {
                if (!isset($data["idcarrera"]) || $data["idcarrera"] == ""){
                    array_push($error, "Falta el parametro idcarrera ");
                }
                if (!isset($data["clave"]) || $data["clave"] == ""){
                    array_push($error, "Falta el parametro clave ");
                }
                if (!isset($data["semestre"]) || $data["semestre"] == ""){
                    array_push($error, "Falta el parametro semestre ");
                }
                if (!isset($data["dtinicio"]) || $data["dtinicio"] == ""){
                    array_push($error, "Falta el parametro dtinicio ");
                }
                if (!isset($data["dtfin"]) || $data["dtfin"] == ""){
                    array_push($error, "Falta el parametro dtfin ");
                }

                if (!isset($data["lactivo"]) ||$data["lactivo"] == null){
                    $data["lactivo"] = 0;
                }
                else{
                    $data["lactivo"] = $data["lactivo"]=="on" ? 1 : 0;
                }
        
                if (count($error) <= 0) {
                    $aProfesor = DTOSemestre::where(["clave" =>  $data["clave"]])->first();
                    $aProfesorId = DTOSemestre::where(["idsemestre" =>  $data["idsemestre"]])->first();
                    if($aProfesor == null || $aProfesor == $aProfesorId){
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOSemestre::where(['idsemestre' => $data["idsemestre"]])->update(
                            array(
                                'idcarrera'             =>  $data["idcarrera"],
                                'clave'            =>   $data["clave"],
                                'semestre'      =>  $data["semestre"],
                                'dtinicio'            =>   $data["dtinicio"],
                                'dtfin'      =>  $data["dtfin"],
                                'dtcreacion'        =>  $data["dtcreacion"],
                                'dtmodificacion'    =>  date("Y-m-d H:i:s", time()),
                                'lactivo'           =>   $data["lactivo"],
                            )
                        );
                    }else{
                        array_push($error, "Ya existe un semestre registrado con esta clave");
                    }
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $data]);
            //return ["Errors" => $error, "data" => $aRespuesta];
        }//fin:updateProfesor
        public function deleteSemestre($request, $response, $args){
            $data = $request->getParsedBody();
            $error = [];
            $aRespuesta = [];
            try {
                if ( isset($data["iid"])) {
                    if (!isset($data["iid"]) || $data["iid"] == ""){
                        array_push($error, "Falta el parametro iid ");
                    }
                }
                else {
                    array_push($error, "Faltan parametros");
                }//fin:else

                if (count($error) <= 0) {
                    $aRespuesta = DTOSemestre::where(["idsemestre" =>  $data["iid"]])->get();
                    if(count($aRespuesta)>=0)
                    {
                        date_default_timezone_set('America/Mexico_City');
                        $aRespuesta = DTOSemestre::where(['idsemestre' => $data["iid"]])->update(
                            array(
                                'dtmodificacion'   =>  date("Y-m-d H:i:s", time()),
                                'lactivo'     =>   0,
                            )
                        );
                    }
                    else
                    {
                        array_push($error, "Ocurrio un error al eliminar, contacte a un administrador.");
                    }
                }
            }//fin:try
            catch (Exception $Exc) {
                array_push($error, $Exc->getMessage());
            }
            return $response->withHeader('Content-type', 'application/json')->withJson(["errors" => $error, "data" => $aRespuesta]);
            //return ["Errors" => $error, "data" => $aRespuesta];
        }//fin:deleteProfesor
}//fin:class

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class DTOAlumno extends Model {
    protected $connection = 'CONEXION';
    protected $table = 'dbo.alumno';
    protected $primaryKey = "idalumno";
    protected $fillable = [	
        "idalumno",
        "matricula",
        "nombre",
        "primer_apellodo",
        "segundo_apellido",
        "email",
        "dtcreacion",
        "dtmodificacion",
        "lactivo"
    ];
    public $timestamps = false;
}
?>
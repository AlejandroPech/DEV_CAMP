<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class DTOProfesor extends Model {
    protected $connection = 'CONEXION';
    protected $table = 'dbo.profesor';
    protected $primaryKey = "idprofesor";
    protected $fillable = [	
        "idprofesor",
        "cedula",
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
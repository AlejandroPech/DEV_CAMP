<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class DTOCarreras extends Model {
    protected $connection = 'CONEXION';
    protected $table = 'dbo.carrera';
    protected $primaryKey = "idcarrera";
    protected $fillable = [
        "idcarrera",
        "clave",
        "nombre",
        "no_semestres",
        "dtcreacion",
        "dtmodificacion",
        "lactivo"
    ];
    public $timestamps = false;
}
?>
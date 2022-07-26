<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class DTOSemestre extends Model {
    protected $connection = 'CONEXION';
    protected $table = 'dbo.semestre';
    protected $primaryKey = "idsemestre";
    protected $fillable = [	
        "idsemestre",
        "idcarrera",
        "clave",
        "semestre",
        "dtinicio",
        "dtfin",
        "dtcreacion",
        "dtmodificacion",
        "lactivo"
    ];
    public $timestamps = false;
}
?>
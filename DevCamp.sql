create database DEV_CAMP
go

use DEV_CAMP
go

create table alumno(
idalumno			int primary key identity,
matricula			varchar(55),
nombre				varchar(100),
primer_apellodo		varchar(55),
segundo_apellido	varchar(55),
email				varchar(100),
dtcreacion			datetime,
dtmodificacion		datetime,
lactivo				bit
)

create table carrera(
idcarrera		int primary key identity,
clave			varchar(55),
nombre			varchar(100),
no_semestres	int,
dtcreacion		datetime,
dtmodificacion	datetime,
lactivo			bit
)

create table semestre(
idsemestre		int primary key identity,
idcarrera		int FOREIGN KEY REFERENCES carrera(idcarrera),
clave			varchar(100),
semestre		varchar(50),
dtinicio		datetime,
dtfin			datetime,
dtcreacion		datetime,
dtmodificacion	datetime,
lactivo			bit
)

create table profesor(
idprofesor			int primary key identity,
cedula				varchar(100),
nombre				varchar(100),
primer_apellodo		varchar(55),
segundo_apellido	varchar(55),
email				varchar(100),
dtcreacion			datetime,
dtmodificacion		datetime,
lactivo				bit
)

create table grupo(
idgrupo			int primary key identity,
idprofesor		int FOREIGN KEY REFERENCES profesor(idprofesor),
clave			varchar(55),
nombre			varchar(100),
capacidad		int,
turno			varchar(55),
dtcreacion		datetime,
dtmodificacion	datetime,
lactivo			bit
)

create table asignatura(
idasignatura	int primary key identity,
idprofesor		int FOREIGN KEY REFERENCES profesor(idprofesor),
clave			varchar(100),
nombre			varchar(100),
observaciones	varchar(250),
creditos		int,
dtcreacion		datetime,
dtmodificacion	datetime,
lactivo			bit
)

create table horario_alumno(
idhorario		int primary key identity,
idasignatura	int FOREIGN KEY REFERENCES asignatura(idasignatura),
idalumno		int FOREIGN KEY REFERENCES alumno(idalumno),
idsemestre		int FOREIGN KEY REFERENCES semestre(idsemestre),
idgrupo			int FOREIGN KEY REFERENCES grupo(idgrupo),
dias_semana		varchar(100),
hora_inicio		datetime,
hora_fin		datetime,
aula			varchar(100),
dtcreacion		datetime,
dtmodificacion	datetime,
lactivo			bit
)
# PROJECTO DELILAH

A continuación encontrará las isntrucciones para ejecutar el proyecto.

## Instalación

A continuación encontrará una guia paso a paso para instalar la aplicación en un entorno de desarrollo.

### `git clone`

Navegue a un directorio de su máquina y ejecute el siguiente comando: <br />

```shell
$ git clone https://github.com/hemaria/delilah-project.git
```

### `npm install`

Entre al directorio clonado y ejecute el comando.<br />

```shell
$ npm install
```

Una vez instaladas todas las dependencias puede correrlo con Nodemon o con NPM start.<br />

### `Instalar base de datos`

Copia el contenido de el archivo database.sql en mySQLworkbench y crea las bases de datos. Luego desde el archivo index.js modifica la cadena de conexión a la base de datos.
¨const sql = new Sequelize("mysql://deliuser:mypass@localhost:3306/delilah");¨Reemplaza los valores en el parentesis según sea.

### `Ejecutar casos de prueba`

Desde postman o insomnia ejecutar las rutas de prueba.
Por default la configuarción del archivo webservices.json está con el administrador:

    "login":"admin",
    "password":"admdelilah"
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAyNDI4NTgzfQ.iao6lUNqhtBNM7Kahs7lP31BJW40AAkoh5qo4qDOQTk"

El usuario de prueba por default es:

    "login":"hemaria",
    "password":"delilah1"
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2MDI0Mjg1NTB9.chaKyoK5scs5rsyTRUXSxlH9EMLr-ryNCbDUrTUmm1U"

En Insomnia se debe ingresar los token según sea el caso en la pestaña header, authorization: ¨Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6InVzZXIiLCJpYXQiOjE2MDI0Mjg2NTh9.uyDSMmT6ONS\_-x8YsmGs4P04JIHV8zWcpQ5-gH84grE¨

## `Rutas`

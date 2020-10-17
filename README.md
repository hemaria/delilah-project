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

## `Ejecutar casos de prueba`

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

### `Rutas`

#### `Create User`

POST/api/user <br>

- POST/http://localhost:3030/user

Body:
```
{
"name":"Gloria",
"email":"glo@gmail.com",
"cellphone":"3142333561",
"address":"CL 157 # 58C - 50 TO 2 AP 303",
"login":"glorita",
"password":"abc123",
"doctype":"CC",
"docnum":"144234543"
}
```
#### `login User`

POST/api/login<br>

- POST/http://localhost:3030/login<br>

Body:
```
{
"login":"example",
"password":"la creada en base de usuarios"
}
```
Usuario de prueba:
```
{
"login":"hemaria",
"password":"delilah1"
}
```
Admin:
```
{
"login":"admin",
"password":"admdelilah"
}
```

#### `Crear nuevo producto`

Funcionalidad solo para administradores.<br>

POST/api/product<br>
POST/http://localhost:3030/product

Body:
```
{
"name":"Cesar's salad",
"price":5.99,
"pic":"https://via.placeholder.com/150"
}
```
#### `Obtener todos los productos`

GET/api/product<br>
GET/http://localhost:3030/product<br>

No necesita body<br>

Obtener un producto en especifico:<br>
GET/http://localhost:3030/product/{id}<br>
GET/api/product/{id}

No necesita body

#### `Actualizar productos`

Funcionalidad solo para administradores.<br>

PATCH/product/{id}<br>
PATCH/http://localhost:3030/product/{id}

Body:
```
{
"name":"Cocacola",
"price":2.00
}
```
#### `ELIMINAR PRODUCTO`

DELETE/http://localhost:3030/product/{id}<br>
DELETE/api/product/{id}<br>

No necesita body.

#### `REGISTRAR NUEVA ORDEN`

POST/api/oder<br>
POST/http://localhost:3030/order<br>

Body:
```
{
"products":[
{
"product_id":1,
"quantity":1,
"notes":""
},
{
"product_id":2,
"quantity":2,
"notes":""
},
{
"product_id":5,
"quantity":1,
"notes":"Sin cebolla"
}
]
}
```
#### `ACTUALIZAR ORDEN`

Uso solo para administrador. Se actualiza el estado de la orden.<br>
PATCH/api/order/{id}<br>
PATCH/http://localhost:3030/order/{id}

Body:
```
{
"status":2
}
```

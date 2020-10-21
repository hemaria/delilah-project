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

Cree una base de datos con usuario y password y ejecute el script /database.sql ubicado en la raíz de este proyecto. Configure la cadena de conexión con los datos respectivos en el archivo /index.js

```shell
const sql = new Sequelize("mysql://{user}:{password}@{host}:{port}/{database}");
```
Reemplaza los valores en llaves según sea el caso.

### `nodemon index.js`

Una vez todo esté correctamente configurado, puede correr el servidor de pruebas ejecutando `nodemon index.js` o simplemente `node index.js`.<br /> Si todo está correcto debería ver en consola los mensajes: 'Servidor iniciado!' y 'Connection has been established successfully'.

```shell
$ nodemon index.js
```


## Ejecutar casos de prueba

Desde Postman o Insomnia puede importar la configuración del archivo /webservices.json para ejecutar las rutas de prueba.
Por default se asume que existe un usuario administrador creado con la base de datos a partir del archivo /database.sql con los siguientes datos:

    "login":"admin",
    "password":"admdelilah"

Nota: En el cliente Rest para ejecutar las peticiones autenticadas se debe ingresar el access_token en la pestaña 'header' así: 

    "authorization: Bearer {access_token}"

reemplazando lo contenido entra llaves por el token generado desde el servicio de /login

### `Rutas`

#### `Create User`

POST/http://localhost:3030/user <br>

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

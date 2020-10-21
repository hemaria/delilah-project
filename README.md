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

### `base de datos`

Cree una base de datos con usuario y password y ejecute el script /database.sql ubicado en la raíz de este proyecto. Configure la cadena de conexión con los datos respectivos en el archivo /index.js

```shell
const sql = new Sequelize("mysql://{user}:{password}@{host}:{port}/{database}");
```
Reemplaza los valores en llaves según sea el caso.

### `nodemon index.js`

Una vez todo esté correctamente configurado, puede correr el servidor de pruebas ejecutando `nodemon index.js` o simplemente `node index.js`.<br /> Si todo está correcto debería ver en consola los mensajes: 'Servidor iniciado!' y 'Connection has been established successfully'.

```shell
$ nodemon index.js

Servidor iniciado!
Connection has been established successfully
```


## Ejecutar casos de prueba

Desde Postman o Insomnia puede importar la configuración del archivo /webservices.json para ejecutar las rutas de prueba.
Por default se asume que existe un usuario administrador creado con la base de datos a partir del archivo /database.sql con los siguientes datos:

    "login":"admin",
    "password":"admdelilah"

Nota: En el cliente Rest para ejecutar las peticiones autenticadas se debe ingresar el access_token en la pestaña 'header' así: 

    authorization: Bearer {access_token}

Reemplazando lo contenido entra llaves por el token generado desde el servicio de /login

Nota 2: También en 'header' incluir para todas las peticiones: Content-Type: application/json

### `Rutas`

#### `login User`
Con este servicio puede retornar un Access Token para el usuario administrador creado por defecto.

POST: http://localhost:3030/login <br>

Body:
```
{
    "login":"admin",
    "password":"admdelilah"
}
```

Retorna:
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjAyOTExMjI2fQ.HfO6KNoxDMo7-WY05-SCPuO6JS7NtpFq5b6zcbdbYzA"
}
```

Nota: Se utiliza el mismo servicio para autenticar a uno de los usuarios que se registren a partir del endpoint a continuación. Solamente debe cambiar los parámetros en Body.<br>


#### `Create User`
Efectivo para **Condición 1:** Poder registrar un nuevo usuario.

POST: http://localhost:3030/user <br>

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

Retorna:
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6InVzZXIiLCJpYXQiOjE2MDMyNzc5MTN9.xoFW0rmaKQkrLWlvX6f8xELXl6jJ6pofaRYn9hh3ajA"
}
```

#### `Crear nuevo producto`
Efectivo para **Condición 2:** Un usuario debe poder listar todos los productos disponibles.<br>
Debe incluir un Access Token de Administrador en Header `authorization: Bearer {access_token}`. <br>

POST: http://localhost:3030/product <br>

Body:
```
{
    "name":"Cesar's salad",
    "price":5.99,
    "pic":"https://via.placeholder.com/150"
}
```

#### `Obtener todos los productos`


GET: http://localhost:3030/product<br>

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

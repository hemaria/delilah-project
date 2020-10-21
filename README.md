# PROYECTO DELILAH

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

### `base de datos`

Cree una base de datos con usuario y password y ejecute el script /database.sql ubicado en la raíz de este proyecto. Configure la cadena de conexión con los datos respectivos en el archivo /index.js

```shell
const sql = new Sequelize("mysql://{user}:{password}@{host}:{port}/{database}");
```
Reemplaza los valores en llaves según sea el caso.

### `nodemon index.js`

Una vez todo esté correctamente configurado, puede correr el servidor de pruebas ejecutando `nodemon index.js` o simplemente `node index.js`.

Si todo está correcto debería ver en consola los mensajes: 'Servidor iniciado!' y 'Connection has been established successfully'.

```shell
$ nodemon index.js

Servidor iniciado!
Connection has been established successfully
```


## Ejecutar casos de prueba

Desde [Postman](https://www.postman.com/downloads/) o [Insomnia](https://insomnia.rest/download/) puede importar la configuración del archivo /webservices.json para ejecutar las rutas de prueba.

Por default se asume que existe un usuario administrador creado con la base de datos a partir del archivo /database.sql con los siguientes datos:

    "login":"admin",
    "password":"admdelilah"

Nota: En el cliente Rest para ejecutar las peticiones autenticadas se debe ingresar el access_token en la pestaña 'header' así: 

    authorization: Bearer {access_token}

Reemplazando lo contenido entre llaves por el Access Token generado desde el servicio de /login

Nota 2: También en 'header' incluir para todas las peticiones: Content-Type: application/json

### `Endpoints`

#### `Autenticar usuario`
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


#### `Crear nuevo usuario`
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
Efectivo para **Condición 5:** Un usuario con rol de administrador debe poder realizar las acciones de creación, edición y eliminación de recursos de productos (CRUD de productos).<br>
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

Retorna:
```
{
    "message": "Created product 14"
}
```


#### `Retornar producto`
Efectivo para **Condición 5:** Un usuario con rol de administrador debe poder realizar las acciones de creación, edición y eliminación de recursos de productos (CRUD de productos).<br>
Debe incluir un Access Token de Usuario Autenticados en Header `authorization: Bearer {access_token}`. <br>

GET: http://localhost:3030/product/{id} <br>

No necesita body.

Retorna:
```
{
    "id": 14,
    "name": "Ensalada Vegana",
    "price": 34,
    "description": "",
    "short": "",
    "photo": "https://via.placeholder.com/150"
}
```


#### `Actualizar producto`
Efectivo para **Condición 5:** Un usuario con rol de administrador debe poder realizar las acciones de creación, edición y eliminación de recursos de productos (CRUD de productos).<br>
Debe incluir un Access Token de Administrador en Header `authorization: Bearer {access_token}`. <br>

PATCH: http://localhost:3030/product/{id} <br>

Body:
```
{
    "name":"Ensalada Cesar",
    "price":6,
    "pic":"https://via.placeholder.com/150"
}
```

Retorna:
```
{
    "message": "Product 14 updated"
}
```


#### `Eliminar producto`
Efectivo para **Condición 5:** Un usuario con rol de administrador debe poder realizar las acciones de creación, edición y eliminación de recursos de productos (CRUD de productos).<br>
Debe incluir un Access Token de Administrador en Header `authorization: Bearer {access_token}`. <br>

DELETE: http://localhost:3030/product/{id} <br>

No necesita body.

Retorna:
```
{
    "message": "Product 14 deleted"
}
```


#### `Obtener todos los productos`
Efectivo para **Condición 2:** Un usuario debe poder listar todos los productos disponibles.<br>
Debe incluir un Access Token de Usuario Autenticados en Header `authorization: Bearer {access_token}`. <br>

GET: http://localhost:3030/product/ <br>

No necesita body.

Retorna:
```
[
    {
        "id": 4,
        "name": "Bagel de Salmón",
        "price": 42.5,
        "description": "",
        "short": "",
        "photo": "https://via.placeholder.com/150"
    },
    {
        "id": 6,
        "name": "Sandwich Veggie",
        "price": 31,
        "description": "",
        "short": "",
        "photo": "https://via.placeholder.com/150"
    },
    {
    "id": 12,
        "name": "Veggie avocado",
        "price": 31,
        "description": "",
        "short": "",
        "photo": "https://via.placeholder.com/150"
    }
]
```


#### `Registrar un nuevo pedido`
Efectivo para **Condición 3** Un usuario debe poder generar un nuevo pedido al Restaurante con un listado de platos que desea.

POST: http://localhost:3030/order <br>

Body:
```
{
    "payment":"cash",
    "products":[
        {
            "product_id":13,
            "quantity":1,
            "notes":""
        },
        {
            "product_id":6,
            "quantity":2,
            "notes":""
        },
        {
            "product_id":12,
            "quantity":1,
            "notes":"Sin cebolla"
        }
    ]
}
```

Retorna:
```
{
    "order_id": 36,
    "reference": "zEguYK9X"
}
```


#### `Actualizar estado de un pedido`
Efectivo para **Condición 4:** El usuario con roles de administrador debe poder actualizar el estado del pedido.<br>
Debe incluir un Access Token de Administrador en Header `authorization: Bearer {access_token}`. <br>

PATCH: http://localhost:3030/order/{id}

Body:
```
{
    "status":2
}
```

Retorna:
```
{
    "result": "success",
    "message": "Order updated to status 2",
    "order": {
        "id": "35",
        "status": 2
    }
}
```


#### `Revisión de autorizaciones`
Efectivo para **Condición 6** Un usuario sin roles de administrador no debe poder crear, editar o eliminar un producto, ni editar o eliminar un pedido. Tampoco debe poder acceder a informaciones de otros usuarios.

En este caso simplemente se puede no enviar el Access Token respectivo o mandar uno sin la respectiva autorización y se retornará un error similar a lo siguiente:

Retorna:
```
{
    "message": "You must provide a valid access_token"
}
```

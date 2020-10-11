const express = require("express");
const bodyParser = require("body-parser");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const moment = require("moment");

//Key to crype/decrypt JWT
const SECRET_KEY = "hfG5hfk8JFHD9hf87dkkhD";

//Init DB
const sql = new Sequelize("mysql://deliuser:mypass@localhost:3306/delilah");
sql
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

//Create app
const app = express();
app.use(bodyParser.json());

// MIDDLEWARES ================================================

function authenticated(request, response, next) {
  let message = "";
  try {
    const token = request.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, SECRET_KEY);
    request.uid = data.id;
    request.role = "admin";
    if (next) {
      return next();
    }
  } catch (err) {
    message = "You must provide a valid access_token";
  }

  //Output response
  response.status(401);
  response.json({
    message: message,
  });
}

function authorization(request, response, next) {
  let message = "";
  try {
    const token = request.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, SECRET_KEY);
    request.uid = data.id;
    request.role = data.role;
    if (request.role == "admin") {
      return next();
    } else {
      message = "You are not allowed to perform this action";
    }
  } catch (err) {
    message = "You must provide a valid access_token";
  }

  //Output response
  response.status(401);
  response.json({
    message: message,
  });
}

function validate_user(request, response, next) {
  const {
    name,
    email,
    cellphone,
    address,
    login,
    password,
    doctype,
    docnum,
  } = request.body;
  let error = "";

  if (!name || validator.isEmpty(name.trim())) {
    error = "User's name is required";
  } else if (!email || validator.isEmpty(email.trim())) {
    error = "User's email is required";
  } else if (!validator.isEmail(email)) {
    error = "User's email is invalid";
  } else if (!cellphone || validator.isEmpty(cellphone.trim())) {
    error = "User's cellphone is required";
  } else if (!validator.isMobilePhone(cellphone.trim())) {
    error = "User's cellphone is invalid";
  } else if (!address || validator.isEmpty(address.trim())) {
    error = "User's address is required";
  } else if (!login || validator.isEmpty(login.trim())) {
    error = "User's login is required";
  } else if (!password || validator.isEmpty(password.trim())) {
    error = "User's password is required";
  } else if (!doctype || validator.isEmpty(doctype.trim())) {
    error = "User's document type is required";
  } else if (!docnum || validator.isEmpty(docnum.trim())) {
    error = "User's document number is required";
  }

  //Check if any error
  if (!error) {
    next();
  } else {
    //Output response
    response.status(400);
    response.json({
      result: "error",
      message: error,
    });
  }
}

function validate_product(request, response, next) {
  const { name, price, pic } = request.body;
  let error = "";

  if (!name || validator.isEmpty(name.trim())) {
    error = "Product name is required";
  } else if (!price) {
    error = "Product's price is required";
  } else if (price <= 0) {
    error = "Product's price is invalid";
  } else if (!pic || validator.isEmpty(pic.trim())) {
    error = "Product's pic is required";
  }

  //Check if any error
  if (!error) {
    next();
  } else {
    //Output response
    response.status(400);
    response.json({
      result: "error",
      message: error,
    });
  }
}

/**
 * Homepage
 */
app.get("/", (request, response) => {
  response.send("Executed agan!!!");
});

// LOGIN ================================================

/**
 * Add user
 */
app.post("/login", async (request, response) => {
  const { login, password } = request.body;
  const query = `SELECT * FROM users WHERE login='${login}' AND pwd=SHA1('${password}')`;

  try {
    const [resultados] = await sql.query(query, { raw: true });
    const token = jwt.sign(
      {
        id: resultados[0].id,
        role: resultados[0].role,
      },
      SECRET_KEY
    );
    response.status(200);
    response.json({
      access_token: token,
    });
  } catch (err) {
    response.status(400);
    response.json({
      result: "error",
      message: "Combination user/password not found",
    });
  }
});

// USERS ================================================

/**
 * Add user
 */
app.post("/user", validate_user, async (request, response) => {
  const {
    name,
    email,
    cellphone,
    address,
    login,
    password,
    doctype,
    docnum,
  } = request.body;
  const date = moment().format("YYYY/MM/DD HH:mm:ss");
  const query = `INSERT INTO users (name, login, email, pwd, role, address, cellphone, doctype, docnum, register, status) VALUES ('${name}', '${login}', '${email}', SHA1('${password}'), 'user', '${address}', '${cellphone}', '${doctype}', '${docnum}', '${date}', '1')`;

  try {
    await sql.query(query, { raw: true }).then((id) => {
      const token = jwt.sign(
        {
          id: id[0],
          role: "user",
        },
        SECRET_KEY
      );
      response.status(200);
      response.json({
        access_token: token,
      });
    });
  } catch (err) {
    //Error
    response.status(400);
    response.json({
      result: "error",
      message: err.toString(),
    });
  }
});

// ORDERS ===============================================

/**
 * Create an order
 */
app.post("/order", authenticated, (request, response) => {
  const result = {
    result: "success",
    message: "New order created",
    order: {
      id: 1,
    },
  };

  //Output response
  response.status(201);
  response.json(result);
});

/**
 * Update an order
 */
app.patch("/order/:id", authorization, (request, response) => {
  const order_id = request.params.id;
  const result = {
    result: "success",
    message: "Order updated",
    order: {
      id: order_id,
    },
  };

  //Output response
  response.status(200);
  response.json(result);
});

//PRODUCTS ===============================================

/**
 * Get list of products
 */
app.get("/product", authenticated, (request, response) => {
  const result = {
    products: [
      {
        id: 1,
        name: "Hamburguer",
        price: 5.99,
      },
      {
        id: 2,
        name: "Hotdog",
        price: 4.95,
      },
      {
        id: 3,
        name: "Cocacola",
        price: 2.0,
      },
    ],
  };

  //Output response
  response.status(200);
  response.json(result);
});

//CRUD PRODUCTS ==========================================

/**
 * Add product
 */
app.post("/product", [authorization, validate_product], (request, response) => {
  const result = {
    result: "success",
    message: "Create a new product",
    product: {
      id: 1,
    },
  };

  //Output response
  response.status(201);
  response.json(result);
});

/**
 * Get product
 */
app.get("/product/:id", authorization, (request, response) => {
  const product_id = request.params.id;
  const result = {
    product: {
      id: product_id,
      name: "Cocacola",
      price: 2.0,
    },
  };

  //Output response
  response.status(200);
  response.json(result);
});

/**
 * Update product
 */
app.patch("/product/:id", authorization, (request, response) => {
  const product_id = request.params.id;
  const result = {
    result: "success",
    message: "Product updated",
    product: {
      id: product_id,
      name: "Cocacola",
      price: 2.0,
    },
  };

  //Output response
  response.status(200);
  response.json(result);
});

/**
 * Delete product
 */
app.delete("/product/:id", authorization, (request, response) => {
  const product_id = request.params.id;
  const result = {
    result: "success",
    message: `Product ${product_id} removed`,
  };

  //Output response
  response.status(200);
  response.json(result);
});

/**
 * Listen server
 */
app.listen(3030, () => {
  console.log("Servidor iniciado!");
});

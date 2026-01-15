const express = require("express");
const bodyparser = require("body-parser");
const controller_user = require("./src/user/controller");

class App {
  app = express();

  constructor() {
    this.middlewares();
    this.listener();
  }

  middlewares() {
    this.app.use(bodyparser.json());

    this.app.use("/user", controller_user);

    this.app.use((err, req, res, next) => {
      res.status(500).send(err.message);
    });
  }

  listener() {
    this.app.listen(3000, () => {
      console.log("server is ready");
    });
  }
}
new App();

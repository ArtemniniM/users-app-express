const express = require("express");
const { service } = require("./service");
const { checkById, checkAddNewUser, checkDeleteUser } = require("./middleware");

const router = express.Router();

class Controller {
  constructor() {
    this.getAll();
    this.getById();
    this.addNewUser();
    this.updateUser();
    this.deleteUser();
  }
  getAll() {
    router.get("/", (req, res) => {
      try {
        res.status(200).send(service.getAllArr());
      } catch (error) {
        res.status(404).send(error.message);
      }
    });
  }
  getById() {
    router.get("/:id", checkById, (req, res) => {
      try {
        const { id } = req.params;
        res.status(200).send(service.getById(id));
      } catch (error) {
        res.status(404).send(error.message);
      }
    });
  }
  addNewUser() {
    router.post("/", checkAddNewUser, (req, res) => {
      try {
        const { name, surname, email, pwd } = req.body;
        res.status(200).send(service.addNewUser(name, surname, email, pwd));
      } catch (error) {
        res.status(404).send(error.message);
      }
    });
  }
  updateUser() {
    router.put("/:id", (req, res) => {
      try {
        const { id } = req.params;
        const obj = req.body;
        const updatedUser = service.updateUser(id, obj);
        res.status(200).send(updatedUser);
      } catch (error) {
        res.status(404).send(error.message);
      }
    });
  }
  deleteUser() {
    router.delete("/:id", checkDeleteUser, (req, res) => {
      const { id } = req.params;
      res.status(200).send(service.deleteUser(id));
    });
  }
}

new Controller();

module.exports = router;

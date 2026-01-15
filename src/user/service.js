const { error, log } = require("console");
const fs = require("fs");

class Service {
  read() {
    const json = fs.readFileSync("./src/user/library.json");
    const arr = JSON.parse(json);
    return arr;
  }

  getAllArr() {
    const arr = this.read();
    if (arr.length == 0) throw new Error("length is not defined");
    return arr;
  }
  getById(id) {
    const arr = this.read();
    const item = arr.find((el) => el.id == id);
    if (!item) throw new Error("this id doesn't exist");
    return item;
  }
  addNewUser(name, surname, email, pwd) {
    const arr = this.read();
    const index = arr.findIndex((el) => el.email == email);

    if (index == -1) {
      arr.push({ name, surname, email, pwd });
      fs.writeFileSync("./src/user/library.json", JSON.stringify(arr));
      return arr;
    } else {
      throw new Error("this email already exist");
    }
  }
  updateUser(id, obj) {
    const arr = this.read();
    const index = arr.findIndex((el) => el.id == id);

    if (index == -1) {
      throw new Error("this id doesn't exist");
    } else {
      arr[index] = { ...arr[index], ...obj };
      fs.writeFileSync("./src/user/library.json", JSON.stringify(arr));
      return arr;
    }
  }
  deleteUser(id) {
    const arr = this.read();
    const index = arr.findIndex((el) => el.id == id);
    if (index == -1) {
      throw new Error("this id doesn't exist");
    } else {
      arr.splice(index, 1);
      fs.writeFileSync("./src/user/library.json", JSON.stringify(arr));
      return arr;
    }
  }
}
const service = new Service();

module.exports = { service };

const { Router } = require("express");
const UsersController = require("../controller/UsersController");
const usersRoutes = Router();

function myMiddleware(request, response, next) {
  console.log("você passou pelo middleware");

  next();
}

const usersController = new UsersController();

usersRoutes.post("/", myMiddleware, usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;

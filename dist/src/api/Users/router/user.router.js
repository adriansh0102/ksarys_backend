"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = require("express");
const user_controllers_1 = require("../infraestructure/user.controllers");
const checkAuth_1 = require("../../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', checkAuth_1.checkAuth, user_controllers_1.UsersControllers.getAllUsers)
    .get('/:clientId', checkAuth_1.checkAuth, user_controllers_1.UsersControllers.getUsersById)
    .post('/', checkAuth_1.checkAuth, user_controllers_1.UsersControllers.saveUser)
    .post('/signIn', user_controllers_1.UsersControllers.sign)
    // .post('/changePassword', checkAuth, UsersControllers.changePassword)
    .post('/changeActive', checkAuth_1.checkAuth, user_controllers_1.UsersControllers.changeActive)
    .delete('/:id', checkAuth_1.checkAuth, user_controllers_1.UsersControllers.deleteUser);
exports.UsersRouter = router;

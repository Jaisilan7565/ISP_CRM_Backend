"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controller/employee.controller");
const Validators_1 = require("../middleware/Validators");
const checkAuth_1 = require("../middleware/checkAuth");
const router = (0, express_1.Router)();
router.post('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('email'), (0, Validators_1.checkRequestBodyParams)('contact'), (0, Validators_1.checkRequestBodyParams)('password'), employee_controller_1.saveEmployee);
router.post('/login', checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('email'), (0, Validators_1.checkRequestBodyParams)('password'), employee_controller_1.loginEmail);
router.get('/', checkAuth_1.basicAuthUser, employee_controller_1.getAllEmployees);
router.get('/single', checkAuth_1.basicAuthUser, (0, Validators_1.checkQuery)('_id'), employee_controller_1.getSingleEmployee);
router.put('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('_id'), employee_controller_1.updateEmployee);
exports.default = router;
//# sourceMappingURL=employee.router.js.map
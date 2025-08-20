"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controller/category.controller");
const Validators_1 = require("../middleware/Validators");
const checkAuth_1 = require("../middleware/checkAuth");
const router = (0, express_1.Router)();
router.post('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('name'), category_controller_1.saveCategory);
router.get('/', checkAuth_1.basicAuthUser, category_controller_1.getAllCategory);
router.get('/single', checkAuth_1.basicAuthUser, (0, Validators_1.checkQuery)('_id'), category_controller_1.getSingleCategory);
router.put('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('_id'), category_controller_1.updateCategory);
router.delete('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkQuery)('_id'), category_controller_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.router.js.map
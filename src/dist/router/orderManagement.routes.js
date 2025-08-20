"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderManagement_controller_1 = require("../controller/orderManagement.controller");
const Validators_1 = require("../middleware/Validators");
const checkAuth_1 = require("../middleware/checkAuth");
const router = (0, express_1.Router)();
router.post('/', checkAuth_1.basicAuthUser, 
// checkSession
(0, Validators_1.checkRequestBodyParams)('customerEmail'), (0, Validators_1.checkRequestBodyParams)('customerContact'), (0, Validators_1.checkRequestBodyParams)('employeeId'), orderManagement_controller_1.saveOrderData);
router.get('/', checkAuth_1.basicAuthUser, 
// checkSession
orderManagement_controller_1.getAllOrderManagement);
router.put('/', checkAuth_1.basicAuthUser, 
// checkSession
(0, Validators_1.checkRequestBodyParams)('_id'), (0, Validators_1.checkRequestBodyParams)('orderStatus'), orderManagement_controller_1.updateOrderManagement);
router.get('/employeeOrders', checkAuth_1.basicAuthUser, 
// checkSession
(0, Validators_1.checkQuery)('employeeId'), orderManagement_controller_1.getSingleEmployeeOrders);
router.delete('/', checkAuth_1.basicAuthUser, 
// checkSession
(0, Validators_1.checkQuery)('_id'), orderManagement_controller_1.deleteOrderManagement);
exports.default = router;
//# sourceMappingURL=orderManagement.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const enquiryFrom_routes_1 = require("./enquiryFrom.routes");
const employee_router_1 = require("./employee.router");
const orderManagement_routes_1 = require("./orderManagement.routes");
const isp_router_1 = require("./isp.router");
const ticket_router_1 = require("./ticket.router");
router.use('/enquiry', enquiryFrom_routes_1.default);
router.use('/employee', employee_router_1.default);
router.use('/orderManagement', orderManagement_routes_1.default);
router.use('/isp', isp_router_1.default);
router.use('/ticket', ticket_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_controller_1 = require("../controller/ticket.controller");
const Validators_1 = require("../middleware/Validators");
const checkAuth_1 = require("../middleware/checkAuth");
const router = (0, express_1.Router)();
router.post('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('tittle'), ticket_controller_1.saveTicket);
router.get('/', checkAuth_1.basicAuthUser, ticket_controller_1.getAllTicket);
router.get('/single', checkAuth_1.basicAuthUser, (0, Validators_1.checkQuery)('_id'), ticket_controller_1.getSingleTicket);
router.put('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('_id'), (0, Validators_1.checkRequestBodyParams)('ticketStatus'), ticket_controller_1.updateTicket);
router.delete('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('_id'), ticket_controller_1.deleteTicket);
exports.default = router;
//# sourceMappingURL=ticket.router.js.map
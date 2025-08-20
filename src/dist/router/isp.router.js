"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isp_controller_1 = require("../controller/isp.controller");
const Validators_1 = require("../middleware/Validators");
const checkAuth_1 = require("../middleware/checkAuth");
const router = (0, express_1.Router)();
router.post('/', checkAuth_1.basicAuthUser, isp_controller_1.saveIsp);
router.get('/', checkAuth_1.basicAuthUser, isp_controller_1.getAllIsp);
router.get('/single', checkAuth_1.basicAuthUser, (0, Validators_1.checkQuery)('_id'), isp_controller_1.getSingleIsp);
router.put('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('_id'), isp_controller_1.updateIsp);
router.delete('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkQuery)('_id'), isp_controller_1.deleteIsp);
exports.default = router;
//# sourceMappingURL=isp.router.js.map
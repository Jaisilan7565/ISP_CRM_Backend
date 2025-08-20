"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enquiryForm_controller_1 = require("../controller/enquiryForm.controller");
const Validators_1 = require("../middleware/Validators");
const checkAuth_1 = require("../middleware/checkAuth");
const router = (0, express_1.Router)();
router.post('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('email'), (0, Validators_1.checkRequestBodyParams)('contact'), (0, Validators_1.checkRequestBodyParams)('name'), enquiryForm_controller_1.saveEnquiryData);
router.get('/', checkAuth_1.basicAuthUser, enquiryForm_controller_1.getAllEnquiry);
router.put('/', checkAuth_1.basicAuthUser, (0, Validators_1.checkRequestBodyParams)('_id'), (0, Validators_1.checkRequestBodyParams)('updateStatus'), enquiryForm_controller_1.updateEnquiry);
exports.default = router;
//# sourceMappingURL=enquiryFrom.routes.js.map
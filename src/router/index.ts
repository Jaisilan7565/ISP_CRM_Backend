import { Router } from "express";
const router: Router = Router();

import Enquiry from "./enquiryFrom.routes";
import Employee from "./employee.router";
import OrderManagement from "./orderManagement.routes";
import Ispm from "./isp.router";
import Ticket from "./ticket.router";
import Category from "./category.router";
import Inventory from "./inventory.router";
import subcribe from "./subcribe.router";
import Admin from "./admin.router";
import Payment from "./razorpay.router";
import Invoice from "./invoice.router";

router.use("/enquiry", Enquiry);
router.use("/employee", Employee);
router.use("/orderManagement", OrderManagement);
router.use("/ispm", Ispm);
router.use("/ticket", Ticket);
router.use("/category", Category);
router.use("/inventory", Inventory);
router.use("/subcribe", subcribe);
router.use("/admin", Admin);
router.use("/payment", Payment);
router.use("/invoice", Invoice);

export default router;

import { Router } from "express";
import {createPaymentLink,updatePaymentStatus} from "../controller/razorpay.controller";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";
import { basicAuthUser } from "../middleware/checkAuth";

const router: Router = Router();

router.post("/generate-payment-link",
  basicAuthUser,
  checkRequestBodyParams("subsId"),
  checkRequestBodyParams("amount"),
  checkRequestBodyParams("customerName"),
  checkRequestBodyParams("customerEmail"),
  checkRequestBodyParams("customerContact"),
  createPaymentLink
);

router.put("/",
  basicAuthUser,
  checkRequestBodyParams("_id"),
  checkRequestBodyParams("paymentStatus"),
  updatePaymentStatus
);



export default router;

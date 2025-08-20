import { Router } from "express";
import { saveInvoice,getAllInvoice,getSingleInvoice } from "../controller/invoice.controller";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";
import { basicAuthUser } from "../middleware/checkAuth";
const router: Router = Router();



router.post("/",
     basicAuthUser,
      saveInvoice
    );
router.get("/",
     basicAuthUser,
      getAllInvoice
);

router.get("/single",
     basicAuthUser,
      checkQuery("_id"),
       getSingleInvoice
);

export default router;
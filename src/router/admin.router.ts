import { Router } from "express";
import {loginAdmin,updateAdmin,getAdmin } from "../controller/admin.controller";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";
import { basicAuthUser } from "../middleware/checkAuth";
const router: Router = Router();

router.post("/",
    basicAuthUser,
    loginAdmin
);

router.put("/",   
    basicAuthUser,
     checkRequestBodyParams("_id"),
     updateAdmin    
);

router.get("/single",
    basicAuthUser,
    checkQuery("_id"),
    getAdmin
);



export default router;
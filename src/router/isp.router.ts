import { Router } from "express";
import {
  saveIsp,
  getAllIsp,
  getSingleIsp,
  updateIsp,
  deleteIsp,
  getIspByPincode,
} from "../controller/isp.controller";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";
import { basicAuthUser } from "../middleware/checkAuth";
const router: Router = Router();

router.post("/", basicAuthUser, saveIsp);
router.get("/", basicAuthUser, getAllIsp);

router.get("/single", basicAuthUser, checkQuery("_id"), getSingleIsp);
router.put("/", basicAuthUser, checkRequestBodyParams("_id"), updateIsp);
router.delete("/", basicAuthUser, checkQuery("_id"), deleteIsp);

router.get("/pincode", basicAuthUser, checkQuery("pinCode"), getIspByPincode);
export default router;

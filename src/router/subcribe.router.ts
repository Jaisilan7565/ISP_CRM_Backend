import { Router } from "express";
import { saveSubcribe,getAllSubcribe,getSingleSubcribe,updateSubcribe,deleteSubcribe,endingPlan } from "../controller/subcribe.controller";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";
import { basicAuthUser } from "../middleware/checkAuth";
const router: Router = Router();

router.post('/',
    basicAuthUser,
    checkRequestBodyParams('orderId'),
    checkRequestBodyParams('custEmail'),
    saveSubcribe
 );
router.get('/',
    basicAuthUser,
    getAllSubcribe
 );
router.get('/single',
    basicAuthUser,
    checkQuery('_id'),
    getSingleSubcribe
 );
router.put('/',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateSubcribe
 );
router.delete('/',
    basicAuthUser,
    checkQuery('_id'),
    deleteSubcribe
 );

router.get('/ending',
    basicAuthUser,
    endingPlan
);

export default router;
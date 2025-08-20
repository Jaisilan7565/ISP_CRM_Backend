import {Router} from 'express';
import { saveEnquiryData,getAllEnquiry,updateEnquiry } from '../controller/enquiryForm.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();

router.post('/',
    basicAuthUser,
    checkRequestBodyParams('email'),
    checkRequestBodyParams('contact'),
    checkRequestBodyParams('name'),
    saveEnquiryData
 );
router.get('/',
    basicAuthUser,
    getAllEnquiry
 );

router.put('/',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    checkRequestBodyParams('updateStatus'),
    updateEnquiry
 );

export default router;
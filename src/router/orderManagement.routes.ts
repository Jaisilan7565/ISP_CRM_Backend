import {Router} from 'express';
import { saveOrderData,getAllOrderManagement,updateOrderManagement,
   getSingleEmployeeOrders,deleteOrderManagement,getSingleOrderManagement } from '../controller/orderManagement.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser} from '../middleware/checkAuth';
import { checkSession} from '../utils/tokenManager'
const router:Router=Router();


router.post('/',
    basicAuthUser,
    // checkSession
    checkRequestBodyParams('customerEmail'),
    checkRequestBodyParams('customerContact'),
    checkRequestBodyParams('employeeId'),
    saveOrderData
    
 );
router.get('/',
    basicAuthUser,
    // checkSession
    getAllOrderManagement
 );
 router.put('/',
    basicAuthUser,
    // checkSession
    checkRequestBodyParams('_id'),
    updateOrderManagement
 );

 router.get('/employeeOrders',
    basicAuthUser,
    // checkSession
    checkQuery('employeeId'),
    getSingleEmployeeOrders
 );
 router.delete('/',
    basicAuthUser,
    // checkSession
    checkQuery('_id'),
    deleteOrderManagement
    );

router.get('/single',
    basicAuthUser,
    // checkSession
    checkQuery('_id'),
    getSingleOrderManagement
 );

export default router;
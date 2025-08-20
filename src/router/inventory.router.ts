import { Router } from "express";
import {saveInventory,getAllInventory,getSingleInventory,updateInventory,deleteInventory,updateInventoryQuantity} from "../controller/inventory.controller";
import { checkQuery, checkRequestBodyParams  } from "../middleware/Validators";
import { basicAuthUser } from "../middleware/checkAuth";
const router:Router=Router();     


router.post('/',
    basicAuthUser,
    checkRequestBodyParams('productName'),
    saveInventory
 );
router.get('/',
    basicAuthUser,
    getAllInventory
 );

router.get('/single',
    basicAuthUser,
    checkQuery('_id'),
    getSingleInventory
 );
router.put('/',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateInventory
 );
router.delete('/',
    basicAuthUser,
    checkQuery('_id'),
    deleteInventory
 );

router.put('/quantity',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    checkRequestBodyParams('quantity'),
    updateInventoryQuantity
 );

export default router

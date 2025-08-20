import { Router  } from "express";
import { saveCategory,getAllCategory,getSingleCategory,updateCategory,deleteCategory } from "../controller/category.controller";
import { checkQuery, checkRequestBodyParams } from "../middleware/Validators";
import { basicAuthUser } from "../middleware/checkAuth";
const router:Router=Router();     


router.post('/',
    basicAuthUser,
    checkRequestBodyParams('categoryName'),
    saveCategory
 );
router.get('/',
    basicAuthUser,
    getAllCategory
 );     
router.get('/single',
    basicAuthUser,
    checkQuery('_id'),
    getSingleCategory
 );
router.put('/',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateCategory
 );
router.delete('/',
    basicAuthUser,
    checkQuery('_id'),
    deleteCategory
 );
export default router
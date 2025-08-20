import {Router} from 'express';
import { saveEmployee,loginEmail,getAllEmployees,getSingleEmployee,updateEmployee, updateEmployeePassword, deleteEmployee } from '../controller/employee.controller';
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
const router:Router=Router();


router.post('/',
    basicAuthUser,
    checkRequestBodyParams('email'),
    checkRequestBodyParams('contact'),
    checkRequestBodyParams('password'),
    saveEmployee
    
 );
router.post('/login',
    basicAuthUser,
    checkRequestBodyParams('email'),
    checkRequestBodyParams('password'),
    loginEmail
 );

router.get('/',
    basicAuthUser,
    getAllEmployees
 );

router.get('/single',
    basicAuthUser,
    checkQuery('_id'),
    getSingleEmployee
 );

router.put('/',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateEmployee
 );

router.put('/password',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    updateEmployeePassword
 );

 router.delete('/',
     basicAuthUser,
     checkQuery('_id'),
     deleteEmployee
  );

export default router;
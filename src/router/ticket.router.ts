import { Router } from "express";
import { saveTicket,getAllTicket,getSingleTicket,updateTicket,deleteTicket } from "../controller/ticket.controller";
import { checkRequestBodyParams ,checkQuery} from "../middleware/Validators";
import { basicAuthUser } from "../middleware/checkAuth";
const router:Router=Router();     


router.post('/',
    basicAuthUser,
    checkRequestBodyParams('subId'),
    saveTicket
 );
router.get('/',
    basicAuthUser,
    getAllTicket
 );
router.get('/single',
    basicAuthUser,
    checkQuery('_id'),
    getSingleTicket
 );
router.put('/',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    checkRequestBodyParams('ticketStatus'),
    updateTicket
 );
router.delete('/',
    basicAuthUser,
    checkRequestBodyParams('_id'),
    deleteTicket
 );

export default router;
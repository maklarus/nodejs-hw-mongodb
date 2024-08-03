import express from 'express';

import {
    getAllContactsController,
    getContactByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';



const router = express.Router();
// const jsonParser = express.json();


router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));


export default router;

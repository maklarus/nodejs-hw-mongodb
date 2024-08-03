import express from 'express';

import {
    createContactController,
    getAllContactsController,
    getContactByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';



const router = express.Router();
// const jsonParser = express.json();


router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactController));


export default router;

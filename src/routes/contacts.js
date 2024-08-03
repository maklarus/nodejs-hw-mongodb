import express from 'express';

import {
    createContactController,
    getAllContactsController,
    getContactByIdController,
    updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';



const router = express.Router();
// const jsonParser = express.json();


router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactController));
router.patch('/:contactId', ctrlWrapper(updateContactController));


export default router;

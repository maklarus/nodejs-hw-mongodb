import express from 'express';

import {
    createContactController,
    deleteContactController,
    getAllContactsController,
    getContactByIdController,
    updateContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { upload } from '../middlewares/upload.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

import { contactValidationSchema , updateContactValidationSchema} from '../validation/contacts.js';





const router = express.Router();
const jsonParser = express.json();


router.get('/', ctrlWrapper(getAllContactsController));

router.get(
    '/:contactId',
    isValidId,
    ctrlWrapper(getContactByIdController)
);

router.post(
    '/',
    jsonParser,
    upload.single("photo"),
    validateBody(contactValidationSchema),
    ctrlWrapper(createContactController),
);

router.patch(
    '/:contactId',
    isValidId,
    jsonParser,
    upload.single("photo"),
    validateBody(updateContactValidationSchema),
    ctrlWrapper(updateContactController),
);

router.delete(
    '/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController),
);


export default router;

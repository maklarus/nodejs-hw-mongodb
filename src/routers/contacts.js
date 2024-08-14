import express from 'express';

import {
  getContactsController,
  getContactsByIdController,
  getStartPageController,
  createContactController,
  deleteContactController,
  changeContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactSchema,
  updateContactValidateSchema,
} from '../validation/contact.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getStartPageController));

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', isValidId, ctrlWrapper(getContactsByIdController));

router.post(
  '/contacts',
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));

router.patch(
  '/contacts/:id',
  isValidId,
  jsonParser,
  validateBody(updateContactValidateSchema),
  ctrlWrapper(changeContactController),
);

export default router;

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

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getStartPageController));

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:id', ctrlWrapper(getContactsByIdController));

router.post('/contacts', jsonParser, ctrlWrapper(createContactController));

router.delete('/contacts/:id', ctrlWrapper(deleteContactController));

router.patch('/contacts/:id', jsonParser, ctrlWrapper(changeContactController));

export default router;

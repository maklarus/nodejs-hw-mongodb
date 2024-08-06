import { notFoundHandler } from '../middlewares/notFoundHandler.js';
import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
} from '../services/contacts.js';

export async function getContactsController(req, res, next) {
  const contacts = await getContacts();

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactsByIdController(req, res, next) {
  const { id } = req.params;

  const contacts = await getContact(id);

  if (contacts === null) {
    return next(notFoundHandler());
  }

  res.send({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contacts,
  });
}

export async function getStartPageController(req, res, next) {
  res.send('Hello, World!');
}

export async function createContactController(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const createdContact = await createContact(contact);

  res
    .status(201)
    .send({ status: 201, message: 'Student created', data: createdContact });

  res.send('Student created');
}

export async function deleteContactController(req, res, next) {
  const { id } = req.params;

  const deletedContact = await deleteContact(id);

  if (deletedContact === null) {
    return next(notFoundHandler());
  }

  res.status(204).end();
}

export async function changeContactController(req, res, next) {
  const { id } = req.params;

  const updateData = req.body;

  const updatedContact = await changeContact(id, updateData);

  if (updatedContact === null) {
    return next(notFoundHandler());
  }

  res.send({
    status: 200,
    message: '"Successfully patched a contact!"',
    data: updatedContact,
  });
}

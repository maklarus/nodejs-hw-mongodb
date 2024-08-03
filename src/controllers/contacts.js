
import createHttpError from "http-errors";
import { createContact, getAllContacts, getContactById, updateContact } from "../services/contacts.js";

export const getAllContactsController = async (req, res, next) => {

        const contacts = await getAllContacts();
            res.send({ status: 200, message: 'Successfully found contacts!', data: contacts });

};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (contact === null) {
        return next(createHttpError.NotFound('Contact not found'));
    }
    res.send({ status: 200, message: `Successfully found contact with id ${contactId}`, data: contact });
};

export const createContactController = async (req, res) => {
    const contact = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        isFavourite: req.body.isFavourite,
        contactType: req.body.contactType,
    };

    const newContact = await createContact(contact);

    res.status(201).send({
        status: 201,
        message: 'Successfully created a contact!',
        data: newContact,
    });
};

export const updateContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const updateData = req.body;

    const updatedContact = await updateContact(contactId, updateData);

    if (updatedContact === null) {
        return next(createHttpError.NotFound('Contact not found'));
    }

    res.send({
        status: 200,
        message: 'Successfully patched a contact!',
        data: updatedContact,
    });
};


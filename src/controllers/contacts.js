import fs from "node:fs/promises";
import path from "node:path";

import createHttpError from "http-errors";

import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById,
    updateContact
} from "../services/contacts.js";

export const getAllContactsController = async (req, res, next) => {


    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId: req.user._id,
    });
    res.send({ status: 200, message: 'Successfully found contacts!', data: contacts });

};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (contact === null) {
        return next(createHttpError.NotFound('Contact not found'));
    }

    if (contact.userId.toString() !== req.user._id.toString()) {
        return next(createHttpError(403,'Contact not allowed'));
    }

    res.send({ status: 200, message: `Successfully found contact with id ${contactId}`, data: contact });
};

export const createContactController = async (req, res) => {

    await fs.rename(req.file.path, path.resolve("src", "public/avatars", req.file.filename));

    const contact = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        isFavourite: req.body.isFavourite,
        contactType: req.body.contactType,
        userId: req.user._id,
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

    const updatedContact = await updateContact(contactId, req.user._id, updateData);

    if (updatedContact === null) {
        return next(createHttpError.NotFound('Contact not found'));
    }

    res.send({
        status: 200,
        message: 'Successfully patched a contact!',
        data: updatedContact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (contact === null) {
        return next(createHttpError.NotFound('Contact not found'));
    }

    if (!contact.userId || contact.userId.toString() !== req.user._id.toString()) {
        return next(createHttpError(403, 'Contact not allowed'));
    }

      await deleteContact(contactId, req.user._id);

    res.status(204).end();
};

import { Contact } from "../models/contacts.js";

export function getAllContacts() {
    return Contact.find();
}

export function getContactById(contactId) {
    return Contact.findById(contactId);
}

export function createContact(payload) {
    return Contact.create(payload);
}

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

export function updateContact(contactId, updateData){
    return Contact.findByIdAndUpdate(contactId, updateData, {
        new: true,
        runValidators: true,
    });
}



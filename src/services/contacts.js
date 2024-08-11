import { Contact } from "../models/contacts.js";

export async function getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
}) {
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const contactQuery = Contact.find();


   if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

   if (typeof filter.isFavourite !== 'undefined') {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }



    const [count, contacts] = await Promise.all([
        Contact.countDocuments(contactQuery),
        contactQuery
            .sort({[sortBy]: sortOrder})
            .skip(skip)
            .limit(perPage),

    ]);

    const totalPages = Math.ceil(count / perPage);

    return {
        data: contacts,
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: totalPages - page > 0,
    };
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

export function deleteContact(contactId) {
    return Contact.findByIdAndDelete(contactId);
}



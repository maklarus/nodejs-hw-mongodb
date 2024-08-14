import { Contact } from '../models/contact.js';

export async function getContacts({ page, perPage, sortBy, sortOrder }) {
  const skip = page > 0 ? (page - 1) * perPage : 1;

  const [contacts, count] = await Promise.all([
    Contact.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
    Contact.countDocuments(),
  ]);

  const totalPages = Math.ceil(count / perPage);

  return {
    contacts,
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
}

export function getContact(contactId) {
  return Contact.findById(contactId);
}

export function createContact(payload) {
  return Contact.create(payload);
}

export function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export function changeContact(contactId, updateData) {
  return Contact.findByIdAndUpdate(contactId, updateData, { new: true });
}

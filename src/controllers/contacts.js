import { Contact } from "../models/contact.js";
import createHttpError from "http-errors";

export const getAllContactsController = async (req, res) => {
    try {
        const contacts = await Contact.find();
            res.send({ status: 200, message: 'Successfully found contacts!', data: contacts });
    } catch (error) {
        throw createHttpError(500, error.message);
    }
};

 export const getContactByIdController =  async (req, res) => {
          const { contactId } = req.params;
          try {
              const contact = await Contact.findById(contactId);

              if (contact === null) {
                  throw createHttpError(404, 'Contact not found');
              }
              res.send({ status: 200, message: `Successfully found contact with id ${contactId}`, data: contact });

          } catch (error) {
              throw createHttpError(500, error.message);
          }
      };

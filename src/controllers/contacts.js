import { Contact } from "../models/contact.js";

export const getAllContactsController = async (req, res) => {
    try {
        const contacts = await Contact.find();
            res.send({ status: 200, message: 'Successfully found contacts!', data: contacts });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

 export const getContactByIdController =  async (req, res) => {
          const { contactId } = req.params;
          try {
              const contact = await Contact.findById(contactId);

              if (contact === null) {
                  return res
                      .status(404)
                      .send({ status: 404, message: 'Contact not found' });
              }
              res.send({ status: 200, message: `Successfully found contact with id ${contactId}`, data: contact });

          } catch (error) {
              console.error(error);
              res.status(500).send({ message: 'Internal server error' });
          };
      };

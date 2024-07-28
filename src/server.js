import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import pinoHTTP from 'pino-http';
import { Contact } from './models/contact.js';





  export const setupServer = () => {


    const app = express();

    app.use(
        cors({
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200,
        }),
    );



    const pino = pinoHTTP({
        transport: {
            target: 'pino-pretty',
        },
    });

      app.use(pino);

      app.use(express.json());





      app.get('/contacts', async (req, res) => {
          console.log('Received request for /contacts'); //додаткове
        try {
            const contacts = await Contact.find();
             console.log('Fetched contacts:', contacts); // Додайте цей рядок для логування даних
            res.send({ status: 200, message: 'Successfully found contacts!', data: contacts });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Internal Server Error' });

        }
    }
      );

      app.use((req, res, next) => {
          res.status(404).send({
              status: 404, message: 'Not found'

          });
      });

      const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

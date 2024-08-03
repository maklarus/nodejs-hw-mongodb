import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import pinoHTTP from 'pino-http';
import contactsRouter from './routes/contacts.js';





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

      app.use('/contacts', contactsRouter);


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

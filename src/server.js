import cors from 'cors';
import express from 'express';
import pinoHTTP from 'pino-http';


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


    const PORT = 3000;


    app.get('/', (req, res) => {
        res.send({
            message: 'Hello big world!',
        });
    });

      app.use((req, res, next) => {
          res.status(404).send({
              status: 404, message: 'Not found'

          });
      });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

import express from 'express';
import cors from 'cors';
import pinoHTTP from 'pino-http';
import { initDBConnection } from './db.js';

const app = express();

export function setupServer() {
  try {
    const pino = pinoHTTP({
      transport: {
        target: 'pino-pretty',
      },
    });

    app.use(pino);

    app.use(
      cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: '200',
      }),
    );

    app.get('/', (req, res) => {
      res.send('GOOD LUCK HAVE FUN');
    });

    app.use((req, res, next) => {
      res.status(404).send({ status: 404, message: 'Route not found:(' });
    });

    app.use((error, req, res, next) => {
      console.log(error);

      res.status(500).send({ status: 500, message: 'Internal Server Error' });
    });
  } catch (error) {
    console.log(error);
  }
}

async function bootstrap() {
  try {
    await initDBConnection();

    const PORT = process.env.PORT || 3000;
    app.listen(3000, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();

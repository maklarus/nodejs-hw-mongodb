import cors from 'cors';
import express from 'express';
import pinoHTTP from 'pino-http';
import { initDBConnection } from './db.js';
import ContactsRoutes from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
const app = express();

export function setupServer() {
  try {
    // const pino = pinoHTTP({
    //   transport: {
    //     target: 'pino-pretty',
    //   },
    // });

    // app.use(pino);

    app.use(
      cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: '200',
      }),
    );

    app.use(ContactsRoutes);

    app.use(notFoundHandler);

    app.use(errorHandler);
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

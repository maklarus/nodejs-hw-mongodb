import mongoose from 'mongoose';

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

async function initDBConnection() {
  try {
    await mongoose.connect(
      `mongodb+srv://vogonb:LXUQ21EInfE5jWxy@cluster0.isl9rqy.mongodb.net/contacts/?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('Mongo connection successfully established!', MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
}

export { initDBConnection };

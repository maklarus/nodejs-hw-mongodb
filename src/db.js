import mongoose from 'mongoose';

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

async function initDBConnection() {
  try {
    await mongoose.connect(
      `${MONGODB_URL}//${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_DB}`,
    );

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(error);
  }
}

export { initDBConnection };

import mongoose from "mongoose";

async function initMongoConnection() {
    try {
        await mongoose.connect("mongodb+srv://student102:psw102st@cluster0.8sxtsp1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        console.log("Mongo connection successfully established!");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export { initMongoConnection };

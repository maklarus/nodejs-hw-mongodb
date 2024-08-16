import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import { User } from "../models/user.js";

export async function registerUser(payload) {
    const maybeUser = await User.findOne({ email: payload.email });

    if (maybeUser !== null) {
        throw createHttpError(409, "Email already in user");
    }


  payload.password  = await bcrypt.hash(payload.password, 10);

return User.create(payload);
}

export async function loginUser(email, password) {
    const maybeUser = await User.findOne({ email });

    if (maybeUser === null) {
        throw createHttpError(404, "User not found");
    }

    const isMatch = await bcrypt.compare(password, maybeUser.password);

    if (isMatch === false) {
        throw createHttpError(401, "Unauthorized");
    }
}

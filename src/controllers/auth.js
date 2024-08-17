import { registerUser, loginUser, logoutUser} from "../services/auth.js";


export async function registerController(req, res) {
    const payload = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

   const registeredUser  = await registerUser(payload);

    res.send({
        status: 201,
        message: "Successfully registered a user!",
        data: registeredUser
    });
}


export async function loginController(req, res) {

    const { email, password } = req.body;

    const session = await loginUser(email, password);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

     res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.send({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
        accessToken: session.accessToken,
        },
    });
}


export async function logoutController(req, res) {
    if (typeof req.cookies.sessionId === "string") {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");

    res.status(204).end();
}

import bcrypt from "bcrypt";
import { v4 as uuid} from "uuid";
import { checkPassword, newSession, newUser, searchUser } from "../repositories/auth.repository.js";

export async function signup(req,res) {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.status(422).send("As senhas não são iguais.");
        };

        const foundUser = await searchUser(email);
        if (foundUser) {
            return res.sendStatus(409);
        };

        const hash = bcrypt.hashSync(password, 10);
        await newUser(name, email, hash);
        return res.sendStatus(201);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function signin(req,res) {
    const { email, password } = req.body;

    try {
        const checkUser = await checkPassword(email, password);
        if (!checkUser) {
            return res.sendStatus(401);
        };

        const token = uuid();
        await newSession(checkUser.id, token);
        return res.status(200).send({ token });
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
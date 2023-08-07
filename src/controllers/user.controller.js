import { getUser, getVisits } from "../repositories/user.repository.js";

export async function getUserData(req, res) {
    const userId = res.locals.userId;
    console.log("user controller userId " + userId);

    try {
        const user = await getUser(userId);
        console.log("user controller user " + user);
        return res.send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getRanking(req, res) {
    try {
        const ranking = await getVisits();
        return res.send(ranking);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
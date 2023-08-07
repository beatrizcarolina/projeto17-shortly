import { nanoid } from "nanoid";
import { deleteUrlById, getUrlByHash, getUrlById, newUrl, sumVisitCount } from "../repositories/url.repository.js";

export async function shortenedUrl(req,res) {
    const { url } = req.body;
    const hash = nanoid(10);
    const userId = res.locals.userId;

    try {
        await newUrl(url, hash, userId);
        const newurl = await getUrlByHash(hash);
        return res.status(201).send({ id: newurl.id, shortUrl: hash });        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function getUrl(req,res) {
    const { id } = req.params;

    try {
        const url = await getUrlById(id);
        if (!url) {
            return res.sendStatus(404);
        };
        return res.send({
            id: url.id,
            shortUrl: url.shortUrl,
            url: url.url,
        });        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function findUrl(req,res) {
    const hash = req.params.shortUrl;

    try {
        const url = await getUrlByHash(hash);
        if (!url) {
            return res.sendStatus(404);
        }

        await sumVisitCount(hash);
        return res.redirect(url.url);        
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function deleteUrl(req,res) {
    const { id } = req.params;
    const userId = res.locals.userId;

    try {
        const url = await getUrlById(id);
        if (!url) {
            return res.sendStatus(404);
        };

        if (userId !== url.userid) {
            return res.sendStatus(401);
        };

        await deleteUrlById(id);
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).send(error.message);        
    }
}
import db from "../db/index.js";
import { urlsTable } from "../models/index.js";
import { nanoid } from 'nanoid';

export const inserturls = async (req, url, code) => {
    const [result] = await db.insert(urlsTable).values({
        shortCode: code ?? nanoid(6),
        targetUrl: url,
        userId: req.user.id
    }).returning({ 
        id: urlsTable.id, 
        shortCode: urlsTable.shortCode, 
        targetUrl: urlsTable.targetUrl 
    });

    return result;
}
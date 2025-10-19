import express from "express";
import { shotenPostRequestSchema } from "../validation/request.validation.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { inserturls } from "../services/url.service.js";
import db from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { and, eq } from "drizzle-orm";
const router = express.Router();

router.post('/shorten', ensureAuthenticated, async(req, res) => {
    const validateResult = await shotenPostRequestSchema.safeParseAsync(req.body);

    if( validateResult.error ) {
        return res.status(400).json({ error: validateResult.error.message })
    };

    const { url, code } = validateResult.data;
    const result = await inserturls(req, url, code);
    return res
        .status(201)
        .json({ 
            id: result.id, 
            shortCode: result.shortCode, 
            targetUrl: result.targetUrl
        })
})

router.get('/codes', ensureAuthenticated, async(req, res) => {
    const codes = await db.select()
    .from(urlsTable)
    .where(eq(urlsTable.userId, req.user.id))

    return res.json({ codes: codes});
})

router.get('/:shortCode', ensureAuthenticated, async(req, res) => {
    const code = req.params.shortCode;

    const [result] = await db.select({
        targetUrl: urlsTable.targetUrl,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code))

    if(!result) {
        return res.status(400).json({ error: 'Invalid URL' })
    }
    return res.redirect(result.targetUrl)
}) 

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    await db.delete(urlsTable)
    .where(and(eq(urlsTable.id, id)), eq(urlsTable.userId, req.user.id))

    return res.status(200).json( { deleted: id})
})



export default router;
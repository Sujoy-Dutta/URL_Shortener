import express from 'express'
import db from '../db/index.js';
import userTable from '../models/index.js';
import { eq } from 'drizzle-orm';
import { randomBytes, createHmac } from 'crypto';
import { signupPostRequestBodySchema } from '../validation/request.validation.js';

const userRouter = express.Router();

userRouter.post('/signup', async(req, res) => {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error) {
        return res.status(400).json({ error: validationResult.error.format() })
    }

    const { firstName, lastName, email, password } = validationResult.data;

    const [existingUser] = await db
    .select({
        id: userTable.id
    })
    .from(userTable)
    .where(eq(userTable.email, email));

    if(existingUser) return res.status(400).json({ error: `User with email: ${email} already exist!`});

    const salt = randomBytes(256).toString('hex');
    const hasedPassword = createHmac('sha256', salt).update(password).digest('hex')

    const [user] = await db.insert(userTable).values({
        email,
        firstName,
        lastName,
        salt,
        password: hasedPassword,
    }).returning({ id: userTable.id })

    return res.status(201).json({ data: { userId: user.id }})
})


export default userRouter;
import express from 'express'
import { signupPostRequestBodySchema, loginPostRequestBodySchema } from '../validation/request.validation.js';
import { hasedPasswordWithSalt } from '../utils/hash.js';
import { getUserByEmail, insertUser } from '../services/user.service.js';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

userRouter.post('/signup', async(req, res) => {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error) {
        return res.status(400).json({ error: validationResult.error.format() })
    }

    const { firstName, lastName, email, password } = validationResult.data;

    const existingUser = await getUserByEmail(email);
    if(existingUser) return res.status(400).json({ error: `User with email: ${email} already exist!`});

    const {salt, password: hasedPassword} = hasedPasswordWithSalt(password)
    const user = await insertUser(email, firstName, lastName, salt, hasedPassword);

    return res.status(201).json({ data: { userId: user.id }});
});

userRouter.post('/login', async(req, res) => {
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() })
    }

    const { email, password} = validationResult.data;

    const user = await getUserByEmail(email);

    if(!user) {
        return res.status(404).json({ error: `User with email: ${email} does not exists!`})
    }

    const { password: hasedPassword } = hasedPasswordWithSalt(password, user.salt);

    if(user.password!==hasedPassword) {
        return res.status(400).json({error: 'Invalid Password'})
    }

    const token = jwt.sign({ id: user.id}, process.env.JWT_TOKEN)
    return res.json({"token:": token})

})


export default userRouter;
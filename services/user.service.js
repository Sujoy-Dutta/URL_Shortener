import { eq } from 'drizzle-orm';
import db from '../db/index.js';
import { userTable } from '../models/user.model.js';

export const getUserByEmail = async (email) => {
    const [existingUser] = await db
    .select({
        id: userTable.id,
        firstName: userTable.firstName,
        lastName: userTable.lastName,
        email: userTable.email,
        salt: userTable.salt,
        password: userTable.password
    })
    .from(userTable)
    .where(eq(userTable.email, email));

    return existingUser;
}

export const insertUser = async(email, firstName, lastName, salt, password) => {
    const [user] = await db.insert(userTable).values({
        email,
        firstName,
        lastName,
        salt,
        password
    }).returning({ id: userTable.id})

    return user;
}
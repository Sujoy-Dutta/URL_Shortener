import { randomBytes, createHmac } from 'crypto';

export const hasedPasswordWithSalt = (password, userSalt= undefined) =>{
    const salt = userSalt ?? randomBytes(256).toString('hex');
    const hasedPassword = createHmac('sha256', salt).update(password).digest('hex');
    return {salt, password: hasedPassword};
}
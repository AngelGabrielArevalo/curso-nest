import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = Number(process.env.HASH_SALT);
    return bcrypt.hash(password, saltRounds);
}

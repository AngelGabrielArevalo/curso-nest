import { AuthResponse } from 'src/auth/interfaces/auth-response.interface';

declare global {
    namespace Express {
        interface Request {
            user: AuthResponse;
        }
    }
}

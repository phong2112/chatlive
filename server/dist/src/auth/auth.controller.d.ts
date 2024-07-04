import { AuthService } from './auth.service';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInRequest, req: Request): Promise<any>;
    getIpAddressFromRequest(ip: string): string;
    findAll(req: Request): void;
}

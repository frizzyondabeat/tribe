// next-auth.d.ts
//@ts-ignore
import { Session } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        accessToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            // Add your custom properties here
        };
    }
}

import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface User {
    uid: string;
    email: string;
    creado: Date;
    displayName: string;
    comercioId: String;
    photoURL: string;
    emailVerified: boolean;
    admin: boolean;
 }
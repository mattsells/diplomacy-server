declare namespace Express {
	export interface User {
		id: number;
		createdAt: Date;
		updatedAt: Date;
		email: string;
		encryptedPassword: string;
	}
}

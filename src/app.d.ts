// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				userId: string;
				username: string;
				email: string;
				image: string;
			},
			dbconn: PoolClient;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

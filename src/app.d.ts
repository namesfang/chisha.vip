// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user?: User.Info
		}
		interface Error {
			id: string;
			code: string;
		}
		interface Platform {
			env: {
				CHISHA_D1: D1Database
				CHISHA_D1_PRE: D1Database
			}
		}
	}

	namespace User {
		interface Info extends App.Locals {
			id: number;
			nickname: string;
			phone: string;
			email: string;
		}
	}
}

export {};

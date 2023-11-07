// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface Platform {
			env: {
				CHISHA_D1: D1Database
				CHISHA_D1_PRE: D1Database
			}
		}
	}
}

export {};

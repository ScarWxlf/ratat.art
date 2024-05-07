/** @type {import('./$types').LayoutServerLoad} */
export function load({ cookies }) {
	return {
		auth: !!cookies.get('auth')
	};
}

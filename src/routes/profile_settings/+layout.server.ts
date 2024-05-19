import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) =>{
	if (!cookies.get('auth')) {
		throw redirect(302, '/');
	}
}
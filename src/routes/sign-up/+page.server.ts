import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ cookies }) {
	if (cookies.get('auth')) {
		throw redirect(302, '/');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	'sign-up': async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const password2 = data.get('password2');
		const captcha = data.get('g-recaptcha-response');

		if ([email, password, password2].some((e) => !e)) {
			return fail(400, {
				email,
				missing: {
					email: !email,
					password: !password,
					password2: !password2
				},
				message: 'Wrong form'
			});
		}

		if (!submitCaptcha(captcha!.toString())) {
			return fail(401, {
				email,
				missing: {
					email: !email,
					password: !password,
					password2: !password2
				},
				message: 'Wrong CAPTCHA'
			});
		}

		cookies.set('auth', 'true');

		throw redirect(302, '/');
	}
};

async function submitCaptcha(captcha: string): Promise<boolean> {
	const form = new FormData();
	form.append('secret', env.RECAPTCHA_SECRET_KEY!);
	form.append('response', captcha);

	const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
		method: 'POST',
		body: form
	});
	const result = await response.json();

	return result.success;
}

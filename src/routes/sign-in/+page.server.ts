import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	if (cookies.get('auth')) {
		throw redirect(302, '/');
	}
}

export const actions: Actions = {
	'sign-in': async ({ request, cookies, locals }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password') as string;
		const captcha = data.get('g-recaptcha-response');
		const SECRET_KEY = env.JWT_SECRET_KEY;

		if ([email, password].some((e) => !e)) {
			return fail(400, {
				email,
				missing: {
					email: !email,
					password: !password
				},
				// message: 'Wrong form'
			});
		}

		if (!submitCaptcha(captcha!.toString())) {
			return fail(401, {
				email,
				missing: {
					email: !email,
					password: !password
				},
				message: 'Wrong CAPTCHA'
			});
		}

		let err, valid;
		let user;
		try {
			const result = await locals.dbconn.query('SELECT * FROM users WHERE email = $1 ', [email]);
			if (result.rows.length > 0) {
				user = result.rows[0];
				const storedHashedPassword = user.password;
				[err, valid] = await compareAsync(password, storedHashedPassword);
			} else {
				return fail(401, {
					message: 'Invalid email or password',
					error: err,
				});
			}
		} catch (err) {
			console.log(err);
		}

		if (valid) {
			const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
			cookies.set('auth', token, { httpOnly: true });
			throw redirect(302, '/');
		}
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

async function compareAsync(pass: string, hashedPass:string): Promise<[Error, boolean]> {
	return new Promise((resolve) => {
		bcrypt.compare(pass, hashedPass, (err, valid) => {
			resolve([err!, valid]);
		});
	});
}

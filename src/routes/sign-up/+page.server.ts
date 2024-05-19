import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import bcrypt from "bcrypt";
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = ({ cookies }) => {
	if (cookies.get('auth')) {
		throw redirect(302, '/');
	}
}

export const actions: Actions = {
	'sign-up': async ({ request, locals }) => {
		const data = await request.formData();
		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password') as string;
		const password2 = data.get('password2');
		const captcha = data.get('g-recaptcha-response');
		const image = '/avatar.jpg';

		if ([username, email, password, password2].some((e) => !e)) {
			return fail(400, {
				username,
				email,
				missing: {
					username: !username,
					email: !email,
					password: !password,
					password2: !password2
				},
				message: 'Wrong form'
			});
		}

		if (!submitCaptcha(captcha!.toString())) {
			return fail(401, {
				username,
				email,
				missing: {
					username: !username,
					email: !email,
					password: !password,
					password2: !password2
				},
				message: 'Wrong CAPTCHA'
			});
		}

		if(password !== password2){
			return fail(401, {
				username,
				email,
				missing: {},
				message: 'Passwords must be the same'
			})
		}

		const regex = /^(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
        const validatePassword = regex.test(password);
		if (!validatePassword) {
			return fail(400, {
				username,
				email,
				missing: {
					username: !username,
					email: !email,
					password: !password,
					password2: !password2
				},
				message: 'Password must contain at least 6 characters and one number'
			});
		}

		const saltRounds = 2;
		bcrypt.hash(password, saltRounds, async (err, hash) => {
			if (err) {
			  console.error("Error hashing password:", err);
			} else {
				try {
				  await locals.dbconn.query("INSERT INTO users(username, email, password, image, tags) VALUES($1, $2, $3, $4, $5)", [username, email, hash, image, '{}']);
				} catch (error) {
					console.log(error)
				}
			}
		  });

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

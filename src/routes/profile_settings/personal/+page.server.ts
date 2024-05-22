import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) =>{
	return {
		user: locals.user
	};
}

export const actions: Actions = {
    personal_profile: async ({ request, locals }) => {
        const data = await request.formData();
		const { userId } = locals.user;
        let err, valid;
		const old_password = data.get('old_password') as string;
		const new_password = data.get('new_password') as string;

		if (old_password === '' || new_password === '') {
			return fail(400, {
				messagePassword: 'Please fill in all fields'
			});
		}

        
        const regex = /^(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
        const validatePassword = regex.test(new_password);
		if (!validatePassword) {
			return fail(400, {
				messagePassword: 'Password must contain at least 6 characters and one number'
			});
		}
        
		const result = await locals.dbconn.query('SELECT * FROM users WHERE id = $1 ', [userId]);
		const user = result.rows[0];
		const storedHashedPassword = user.password;
		[err, valid] = await compareAsync(old_password, storedHashedPassword);
		if(err){
			console.log(err);
		}
		if (valid) {
			const saltRounds = 2;
			bcrypt.hash(new_password, saltRounds, async (err, hash) => {
				if (err) {
					console.error('Error hashing password:', err);
				} else {
					try {
						console.log(hash);
						await locals.dbconn.query(
							'UPDATE users SET password = $1 WHERE id = $2',
							[hash, userId]
						);
					} catch (error) {
						console.log(error);
					}
				}
			});
		} else {
			return fail(401, {
				messagePassword: 'Invalid password'
			});
		}
		return {successChangePass: true}
	},
	personal_profile_email: async ({ request, locals }) => {
		const data = await request.formData();
		const { userId } = locals.user;
		const email = data.get('email');
		//add validation for email
		if (email === locals.user.email) return fail(400, { message: 'Emails are the same' });
		try {
			const result = await locals.dbconn.query(
				'UPDATE users SET email = $1 WHERE id = $2 RETURNING email',
				[email, userId]
			);
			locals.user.email = result.rows[0].email;
			return {successEmail: true}
		} catch (error) {
			console.log(error);
		}
	}
};

async function compareAsync(pass: string, hashedPass: string) {
	return new Promise((resolve) => {
		bcrypt.compare(pass, hashedPass, (err, valid) => {
			resolve([err, valid]);
		});
	});
}

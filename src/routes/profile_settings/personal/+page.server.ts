import { fail } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export function load({ locals }) {
	return {
		user: locals.user
	};
}

export const actions = {
    personal_profile: async ({ request, locals }) => {
        const data = await request.formData();
		const { userId } = locals.user;
        let err, valid;
		const old_password = data.get('old_password');
		const new_password = data.get('new_password');

		if (old_password === '' || new_password === '') {
			return fail(400, {
				messagePassword: 'Please fill in all fields'
			});
		}

        
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const validatePassword = regex.test(new_password);
        
		const result = await locals.dbconn.query('SELECT * FROM users WHERE id = $1 ', [userId]);
		const user = result.rows[0];
		const storedHashedPassword = user.password;
		[err, valid] = await compareAsync(old_password, storedHashedPassword);
		if (valid) {
			const saltRounds = 2;
			// bcrypt.hash(password, saltRounds, async (err, hash) => {
			// 	if (err) {
			// 		console.error('Error hashing password:', err);
			// 	} else {
			// 		try {
			// 			console.log(hash);
			// 			await locals.dbconn.query(
			// 				'UPDATE users SET password = $1 WHERE id = $2',
			// 				[hash, userId]
			// 			);
			//          return {succesPassword: true}
			// 		} catch (error) {
			// 			console.log(error);
			// 		}
			// 	}
			// });
		} else {
			return fail(401, {
				messagePassword: 'Invalid password'
			});
		}
	},
	personal_profile_email: async ({ request, locals }) => {
		const data = await request.formData();
		let { userId } = locals.user;
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

async function compareAsync(pass, hashedPass) {
	return new Promise((resolve) => {
		bcrypt.compare(pass, hashedPass, (err, valid) => {
			resolve([err, valid]);
		});
	});
}

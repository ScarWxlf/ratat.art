import jwt from 'jsonwebtoken';
import { connectToDB } from '$lib/db'; // Убедитесь, что путь к модулю db корректен
import { env } from '$env/dynamic/private';

export const handle = async ({ event, resolve }) => {
	// Подключение к базе данных
	const dbconn = await connectToDB();
	event.locals.dbconn = dbconn; // Сохраняем подключение к БД в locals для доступа в других частях приложения

	// Обработка JWT токенов
	const token = event.cookies.get('auth');

	if (token) {
		try {
			const SECRET_KEY = env.JWT_SECRET_KEY;
			const decoded = jwt.verify(token, SECRET_KEY);
            const result = await dbconn.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
            event.locals.user = {
                userId: result.rows[0].id,
                username: result.rows[0].username,
                email: result.rows[0].email
            }

		} catch (err) {
			console.error('Error decoding token:', err);
		}
	}

	const response = await resolve(event);
	dbconn.release();

	return response;
};

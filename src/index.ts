import { Hono } from 'hono';

import { Kysely } from 'kysely';
import { D1Dialect } from 'kysely-d1';
import { Database } from '@/modal';

import { postRouter } from './post';

export interface Env {
	DB: D1Database;
}

const router = new Hono();

// add db connection to context
router.use('*', async (c, next) => {
	const connection = new Kysely<Database>({
		dialect: new D1Dialect({ database: c.env.DB }),
	});

	c.set('db', await connection);
	return await next();
});

router.get('/', (c) => {
	return c.json({
		timestamp: Date.now(),
	});
});

router.route('/post', postRouter);

router.onError((err, c) => {
	console.error(`${err}`);
	return c.text('error', 500);
});

export default router;

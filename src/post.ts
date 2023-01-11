import { Hono } from 'hono';
import { Kysely } from 'kysely';
import { Database, getPost, getPosts, newPost } from './modal';
import { z } from 'zod';

const postRouter = new Hono();

// /post/alll (list of posts)
postRouter.get('/all', async (c) => {
	const posts = await getPosts(c.get<Kysely<Database>>('db'));

	return c.json(posts);
});

// /post/:id (individual post)
postRouter.get('/:id', async (c) => {
	const { id } = c.req.param();
	const validID = z.coerce.number().positive().parse(id);

	const post = await getPost(c.get<Kysely<Database>>('db'), validID);

	return c.json(post);
});

// /post/new (new post)
postRouter.post('/new', async (c) => {
	const body = await c.req.json();
	const validBody = z
		.object({
			content: z.string(),
		})
		.parse(body);

	const post = await newPost(
		c.get<Kysely<Database>>('db'),
		validBody.content
	);

	return c.json(post);
});

export { postRouter };

import { Generated, Kysely, Selectable } from 'kysely';

export interface Database {
	posts: PostTable;
}

export interface PostTable {
	id: Generated<number>;
	content: string;
	created_at: Generated<string>;
}

export const getPost = async (
	db: Kysely<Database>,
	id: number
): Promise<Selectable<PostTable>> => {
	return await db
		.selectFrom('posts')
		.selectAll()
		.where('id', '=', id)
		.executeTakeFirstOrThrow();
};

export const getPosts = async (
	db: Kysely<Database>
): Promise<Selectable<PostTable>[]> => {
	return await db
		.selectFrom('posts')
		.selectAll()
		.orderBy('created_at', 'desc')
		.execute();
};

export const newPost = async (
	db: Kysely<Database>,
	content: string
): Promise<Selectable<PostTable>> => {
	return await db
		.insertInto('posts')
		.values({
			content: content,
		})
		.returning(['id', 'content', 'created_at'])
		.executeTakeFirstOrThrow();
};

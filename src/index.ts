import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { z } from 'zod';

type Bindings = {
	AIRTABLE_TOKEN: string;
};

const userSchema = z.object({
	orgID: z.string(),
	email: z.string().email(),
});
type User = z.infer<typeof userSchema>;

const app = new Hono<{ Bindings: Bindings }>();

app.use(
	'/users-shared-tier',
	cors({
		origin: 'https://portal.singlestore.com',
		allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
		allowHeaders: [],
		exposeHeaders: [],
	})
);

app.post('/users-shared-tier', async (c) => {
	const BASE_ID = 'appftRFhEe3Id4S8u';
	const TABLE_NAME = 'usersInterestedSharedTier';

	const user = await c.req.json<User>();

	const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${c.env.AIRTABLE_TOKEN}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			fields: user,
		}),
	});

	const result = await response.json();

	return c.json(result);
});

app.onError((e, c) => {
	console.trace(e);
	return c.text('Internal Server Error', 500);
});

export default app;

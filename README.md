# Cloudflare Worker Typesafe DB Example

An example Cloudflare Worker API with a typesafe database

## Stack

-   [Cloudflare Workers](https://developers.cloudflare.com/workers/) (serverless)
-   [Hono](https://honojs.dev/) (router)
-   [Kysely](https://koskimas.github.io/kysely/) (typesafe orm)
-   [D1](https://developers.cloudflare.com/d1/) (database)

## Setup

Create your database with [Wrangler](https://developers.cloudflare.com/d1/get-started/#3-create-your-database) or through the [Dashboard](https://dash.cloudflare.com)

Set your new `database_name` and `database_id` in `wrangler.toml` [(reference)](https://developers.cloudflare.com/d1/get-started/#4-bind-your-worker-to-your-d1-database)

Run the database migration

```
npm run migrate
```

Run locally

```
npm run dev
```

## Note

Probably not the best setup, but just what works well for me :)

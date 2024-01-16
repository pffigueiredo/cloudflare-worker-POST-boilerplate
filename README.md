# Cloudflare Worker POST request boilerplate

To better understand all the steps, make sure to go through this [guide](https://developers.cloudflare.com/workers/tutorials/store-data-with-fauna/#add-your-fauna-secret-key-as-a-secret).

## Getting Started

Create a new `.dev.vars` file in the root directory based on `.dev.vars.example` and fill in the values.

Then, proceed to store the var in the Cloudflare side by running:

```bash
npx wrangler secret put AIRTABLE_TOKEN
```

### Install deps

- npm install

### Login to Cloudflare

- npx wrangler login

### Publish to Cloudflare

- npm run deploy

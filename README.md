# open-ticket

This project was created because i wanted a modern and open source ticketing system, that does not come with any strings attached.
Since i could not find a suitable solution i decided to build it on my own to gain more expirience in building OSS.

## Technologies used

**open-ticket** is build with [SvelteKit](https://kit.svelte.dev), [Skeleton UI](https://www.skeleton.dev) and [PocketBase](https://pocketbase.io) as the backend.

## Current stage of the project

This project is very new and under active development. Currently only basic functionallity is implemented, but i consider it stable enough for the first alpha release.

## Future of this project

I keep working on this project in my free time.
There are many features i plan to implement but have no timeline.

Some of them indlude:

- create tickets via E-mail
- add global notification System
- ~~creating queues (implemented in alpha-0.2.0)~~
- implement SLA times
- implement ticket escrow

In the distant future i would like to morph open-ticket into a complete open source ITSM tool. Plans on that are still tbd.

## Setup and running

You can find a basic [docker-compose.yaml](https://github.com/manchtools/open-ticket/blob/main/docker-compose.yaml) and a [example.env](https://github.com/manchtools/open-ticket/blob/main/example.env) file in this project root directory. Download them locally, rename `example.env` to `.env` and edit the entries to fit your needs.

```
BASE_DOMAIN=<DOMAIN or IP of the host system>
PRIVATE_POCKETBASE_ADMIN=<admin@example.com>
PRIVATE_POCKETBASE_PASSWORD=1234567890
LETS_ENCRYPT_EMAIL=<EMAIL for lets encrypt certificates>
```

> open-ticket will automatically try to obtain a valid certificate for the provided domain. If it fails, a self signed certificate will be used.

> **PRIVATE_POCKETBASE_ADMIN** and **PRIVATE_POCKETBASE_PASSWORD** should be treated as highly sensitive credentials, since they give the account complete administrative access to the pocketbase instance. open-ticket does not expose these credentials to the client. Please handle them with care.

After editing the `.env` file just run `docker compose up -d` and open-ticket will start up. You can now setup your instance by navigating to https:// + BASE_DOMAIN.

PocketBase admin dashboard is not exposed by default. If you wish to access the admin dashboard please modify the [docker-compose.yaml](https://github.com/manchtools/open-ticket/blob/main/docker-compose.yaml) file as follows:

```diff
open-ticket-pocketbase:
   labels:
-    - 'traefik.http.routers.open-ticket-pocketbase.rule=Host(`${BASE_DOMAIN}`) && (PathPrefix(`/api`))'
+    - 'traefik.http.routers.open-ticket-pocketbase.rule=Host(`${BASE_DOMAIN}`) && (PathPrefix(`/api`) || PathPrefix(`/_/`))'
```

## Caveats

There currently only exist Linux ARM64 docker images for open-ticket. I will expand on that in the near future, but currently it will only run on 64 bit ARM hardware.

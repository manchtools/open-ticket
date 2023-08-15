import PocketBase from 'pocketbase';

import { env } from '$env/dynamic/public';

export let pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);

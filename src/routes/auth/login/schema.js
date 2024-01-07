import { z } from 'zod';
export const formSchema = z.object({
	account: z.string(),

	password: z.string().min(8)
});

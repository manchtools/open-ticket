import { z } from 'zod';
export const formSchema = z.object({
	name: z.string().optional().default(''),
	email: z.string(),
	type: z.enum(['user', 'agent', 'limited_agent'])
});

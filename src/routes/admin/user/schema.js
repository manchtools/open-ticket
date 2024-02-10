import { z } from 'zod';
export const formSchema = z.object({
	name: z.string().optional().default(''),
	email: z.string().email(),
	password: z.string().min(8),
	type: z.enum(['user', 'agent', 'limited_agent']).default('user')
});

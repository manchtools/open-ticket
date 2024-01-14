import { z } from 'zod';
export const headSchema = z.object({
	status: z.string(),
	agent: z.string().optional().default(''),
	queue: z.string().optional().default(''),
	deleted: z.boolean().default(false)
});

export const bodySchema = z.object({
	subject: z.string().optional().default(''),
	body: z.string().min(1)
});

export const replySchema = z.object({
	body: z.string().min(1)
});

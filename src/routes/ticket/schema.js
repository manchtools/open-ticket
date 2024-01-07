import { z } from 'zod';
export const formSchema = z.object({
	subject: z.string().optional(),
	body: z.string(),
	attachments: z.any().optional()
});

import { z } from 'zod';

const applicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email().regex(/^[A-Za-z0-9._%+-]+@(us\.af\.mil|mail\.mil)$/, 'Must be a military email'),
  squadron: z.string().min(1, 'Squadron is required'),
  position: z.enum(['president', 'member'], 'Invalid position')
});

export function validateApplication(data) {
  return applicationSchema.parse(data);
}
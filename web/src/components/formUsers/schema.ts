import { z } from "zod";

const usersSchema = z.object({
  id: z.string(),
  email: z.string().email("Email inavalido"),
  name: z.string().min(1, "Campo requerido"),
  password: z.string().min(1, "Senha muito curta"),
});

export const usersCreateSchema = usersSchema.extend({
  id: z.string().optional(),
});

export type UsersFormProps = z.infer<typeof usersCreateSchema>;

import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

export const usersBody = userSchema.omit({ id: true });
export const usersGetAll = z.array(userSchema);

export type User = z.infer<typeof userSchema>;
export type TasksBodyProps = z.infer<typeof userSchema>;

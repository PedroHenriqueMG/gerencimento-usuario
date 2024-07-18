import { createUser, updateUser } from "@/src/api/users.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UsersFormProps, usersCreateSchema } from "./schema";
import { User } from "../taskUsers/taskUsers";

export function FormTask({ user }: { user: User | undefined }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsersFormProps>({
    resolver: zodResolver(usersCreateSchema),
    defaultValues: user,
  });

  async function handleCreate(data: UsersFormProps) {
    if (user?.id) {
      await updateUser(user.id, data.email, data.name, data.password);
      window.location.reload();
      return;
    }
    await createUser(data.email, data.name, data.password);
    window.location.reload();
    return;
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreate)}>
      <Input placeholder="Titulo" {...register("name")} />
      {errors.name ? <p>{errors.name.message}</p> : <p></p>}
      <Input placeholder="Nome da tarefa" {...register("email")} />
      {errors.email ? <p>{errors.email.message}</p> : <p></p>}
      <Input placeholder="Nome da tarefa" {...register("password")} />
      {errors.password ? <p>{errors.password.message}</p> : <p></p>}
      <Button type="submit">Enviar</Button>
    </form>
  );
}

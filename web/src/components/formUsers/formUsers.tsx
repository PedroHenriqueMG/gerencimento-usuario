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
      await updateUser(user.id, data.email, data.password, data.name);
      window.location.reload();
      return;
    }
    await createUser(data.email, data.password, data.name);
    window.location.reload();
    return;
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreate)}>
      <Input placeholder="Nome" {...register("name")} />
      {errors.name ? (
        <p className="text-red-500">{errors.name.message}</p>
      ) : (
        <p></p>
      )}
      <Input placeholder="Email" type="email" {...register("email")} />
      {errors.email ? (
        <p className="text-red-500">{errors.email.message}</p>
      ) : (
        <p></p>
      )}
      <Input placeholder="Senha" {...register("password")} />
      {errors.password ? (
        <p className="text-red-500">{errors.password.message}</p>
      ) : (
        <p></p>
      )}
      <Button type="submit">Enviar</Button>
    </form>
  );
}

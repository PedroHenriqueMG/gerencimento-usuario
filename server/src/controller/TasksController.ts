import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { NotFoundError } from "../helpers/api-errors";
import { UserRepository } from "../repository/UsersRepository";

const userRepository = new UserRepository();

export class UsersController {
  async post(req: Request, res: Response) {
    const { email, name, password } = req.body;

    const createTask = await userRepository.create({
      id: randomUUID(),
      email,
      name,
      password,
    });

    res.status(201).json(createTask);
  }

  // get(req: Request, res: Response) {
  //   const allTasks = TasksRepository.findAll();

  //   res.json(allTasks);
  // }

  // put(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const { title, task } = req.body;
  //   const taskFound = TasksRepository.findById(id);

  //   if (!taskFound) {
  //     throw new NotFoundError("Tarefa não encontrada");
  //   }

  //   const updatedTask = TasksRepository.update({ id, title, task });
  //   res.json(updatedTask);
  // }

  // delete(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const taskFound = TasksRepository.findById(id);

  //   if (!taskFound) {
  //     throw new NotFoundError("Tarefa não encontrada");
  //   }

  //   TasksRepository.delete(id);
  //   res.status(204).send();
  // }
}

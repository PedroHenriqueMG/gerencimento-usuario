import { randomUUID } from "crypto";
import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { UserRepository } from "../repository/UsersRepository";
import bcrypt from "bcrypt";

const userRepository = new UserRepository();

export class UsersController {
  async post(req: Request, res: Response) {
    const { email, name, password } = req.body;

    const existUser = await userRepository.findByEmail(email);

    if (existUser) {
      throw new BadRequestError("Usuario ja existente.");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const createTask = await userRepository.create({
      id: randomUUID(),
      email,
      name,
      password: hashPassword,
    });

    res.status(201).json(createTask);
  }

  async get(req: Request, res: Response) {
    const allTasks = await userRepository.findAll();

    res.json(allTasks);
  }

  async put(req: Request, res: Response) {
    const { id } = req.params;
    const { email, name, password } = req.body;
    const taskFound = await userRepository.findById(id);

    if (!taskFound) {
      throw new NotFoundError("Usuario não encontrado.");
    }

    const existEmail = await userRepository.findByEmail(email);

    if (existEmail && existEmail.id != id) {
      throw new BadRequestError("Email ja existente.");
    }

    const updatedTask = await userRepository.update({
      id,
      email,
      name,
      password,
    });

    res.json(updatedTask);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const taskFound = userRepository.findById(id);

    if (!taskFound) {
      throw new NotFoundError("Tarefa não encontrada");
    }

    userRepository.delete(id);
    res.status(204).send();
  }
}

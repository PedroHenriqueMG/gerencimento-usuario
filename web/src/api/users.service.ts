import { api } from "../service/api";

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  const response = await api.post("/users", {
    email,
    password,
    name,
  });
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const updateUser = async (
  id: string,
  email: string,
  password: string,
  name: string
) => {
  const response = await api.put(`/users/${id}`, {
    email,
    password,
    name,
  });
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

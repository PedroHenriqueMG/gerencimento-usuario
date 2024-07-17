import { UserRepositoryInMemory } from "../repository/UserRepositoryInMemory";

describe("Gerencimento Usuarios API", () => {
  let userRepository: UserRepositoryInMemory;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
  });

  it("should create user", async () => {
    const newUser = {
      id: "userid1",
      email: "teste@gmail.com",
      name: "teste",
      password: "12345678",
    };

    const existEmail = await userRepository.findByEmail(newUser.email);

    expect(existEmail).toBeNull;

    const createUser = await userRepository.create(newUser);

    expect(createUser).toEqual(newUser);
  });

  it("should get all users", async () => {
    const user1 = {
      id: "userid1",
      email: "teste@gmail.com",
      name: "teste",
      password: "12345678",
    };
    const user2 = {
      id: "userid2",
      email: "test@gmail.com",
      name: "teste",
      password: "12345678",
    };

    await userRepository.create(user1);
    await userRepository.create(user2);

    const allUsers = await userRepository.findAll();

    expect(allUsers).toEqual([user1, user2]);
  });

  it("should update user", async () => {
    const user1 = {
      id: "userid1",
      email: "teste@gmail.com",
      name: "teste",
      password: "12345678",
    };
    const upadate = {
      id: "userid1",
      email: "test@gmail.com",
      name: "teste",
      password: "12345678",
    };

    await userRepository.create(user1);

    const existUser = await userRepository.findById("userid1");

    expect(existUser).toEqual(user1);

    const updatedUser = await userRepository.update(upadate);

    expect(updatedUser).toEqual(upadate);
  });

  it("should delete user", async () => {
    const user1 = {
      id: "userid1",
      email: "teste@gmail.com",
      name: "teste",
      password: "12345678",
    };

    await userRepository.create(user1);

    const existUser = await userRepository.findById("userid1");

    expect(existUser).toEqual(user1);

    await userRepository.delete("userid1");

    const deletedUser = await userRepository.findById("userid1");

    expect(deletedUser).toBeNull();
  });
});

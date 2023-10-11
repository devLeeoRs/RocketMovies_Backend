const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const [existingUser] = await knex("users").select("email").where({ email });

    if (existingUser) {
      throw new AppError("User already exists");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    response.json({ message: "User created successfully 🍀" });
  }
  async update(request, response) {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;
    const [user] = await knex("users").select("*").where({ id: user_id });

    console.log("chegou aqui");

    if (!user) {
      throw new AppError("User not exist !", 400);
    }

    const [userWithUpdateEmail] = await knex("users")
      .select("*")
      .where({ email });

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("email is already in use ");
    }

    user.email = email;
    user.name = name ?? user.name;

    if (password && !old_password) {
      throw new AppError("old password not provided");
    }

    if (password && old_password) {
      const userCheckPassword = await compare(old_password, user.password);

      if (!userCheckPassword) {
        throw new AppError("old password invalid");
      }
      user.password = await hash(password, 8);
    }

    await knex("users").where({ id: user_id }).update({
      name,
      email,
      password: user.password,
    });

    return response.json("success");
  }
  async delete(request, response) {
    const { id } = request.params;

    const [user] = await knex("users").select("*").where({ id });

    if (user) {
      await knex("users").where({ id: user.id }).del();
    }

    return response.json({ message: "user as delete " });
  }
}

module.exports = UserController;

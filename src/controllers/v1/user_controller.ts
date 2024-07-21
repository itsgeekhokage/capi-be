/** @format */

import { Request, Response } from "express";
import { User } from "../../entities/v1/user";
import { Role } from "../../entities/v1/role";
import { AppDataSource } from "../../db/typeorm";
import { Project } from "../../entities/v1/project";

const roleRepo = AppDataSource.getRepository(Role);
const userRepo = AppDataSource.getRepository(User);
const projectRepo = AppDataSource.getRepository(Project);

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepo.find();
    res
      .status(200)
      .json({ data: users, message: "Users fetched successfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUsersByVendor = async (req : Request, res : Response) => {
  const  vendor  = req.params.vendor;

  if (!vendor) {
    res.status(400).json({ message: "Vendor is required" });
    return;
  }

  try {
    const users = await userRepo.findBy({ vendor: vendor });
    res
      .status(200)
      .json({ data: users, message: "Users fetched successfully..." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const createNewUser = async (req: Request, res: Response) => {
  const { name, user_id, password, updated_by, role_id, project_id, vendor } =
    req.body;

  if (
    !name ||
    !user_id ||
    !password ||
    !role_id ||
    !project_id ||
    !updated_by
  ) {
    res.status(400).json({ message: "Invalid input data" });
    return;
  }

  try {
    const role = await roleRepo.findOneBy({ id: role_id });
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }

    const project = await projectRepo.findOneBy({ id: project_id });
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    const newUser = userRepo.create({
      name,
      user_id,
      password,
      is_active: true,
      org_id: 1,
      updated_by,
      role,
      vendor,
    });

    await userRepo.save(newUser);

    project.users = [...project.users, newUser];
    await projectRepo.save(project);

    res
      .status(201)
      .json({ data: newUser, message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createUsersInBulk = async (req: Request, res: Response) => {
  const { users, updated_by } = req.body;
  console.log(req.body);

  if (!Array.isArray(users) || users.length === 0) {
    res.status(400).json({ message: "Invalid input data" });
    return;
  }

  try {
    const newUsers = [];

    for (const userData of users) {
      const { name, user_id, password, vendor } = userData;
      const role_name = userData.role;

      if (!name || !user_id || !password || !role_name || !vendor) {
        res
          .status(400)
          .json({ message: "Invalid input data for one or more users" });
        return;
      }

      const role = await roleRepo.findOneBy({ name: role_name });
      if (!role) {
        res
          .status(404)
          .json({ message: `Role not found for user_id: ${user_id}` });
        return;
      }

      const newUser = userRepo.create({
        name,
        user_id,
        password,
        is_active: true,
        org_id: 1,
        vendor,
        updated_by,
        role,
      });

      newUsers.push(newUser);
    }

    await userRepo.save(newUsers);

    res
      .status(201)
      .json({ data: newUsers, message: "Users created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, user_id, password, updated_by, role_id, vendor } = req.body;

  if (!id || !name || !user_id || !password || !role_id || !updated_by) {
    res.status(400).json({ message: "Invalid input data" });
    return;
  }

  const userId = parseInt(id);
  const roleId = parseInt(role_id);

  if (isNaN(userId) || isNaN(roleId)) {
    res.status(400).json({ message: "Invalid ID format" });
    return;
  }

  try {
    const user = await userRepo.findOneBy({ id: userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const role = await roleRepo.findOneBy({ id: roleId });
    if (!role) {
      res.status(404).json({ message: "Role not found" });
      return;
    }

    user.name = name;
    user.user_id = user_id;
    user.password = password;
    user.updated_by = updated_by;
    user.role = role;
    user.vendor = vendor;

    await userRepo.save(user);

    res.status(200).json({ data: user, message: "User updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginAuth = async (req: Request, res: Response) => {
  const {user_id, password} = req.body;

  if (!user_id || !password) {
    res.status(400).json({ message: "Vendor is required" });
    return;
  }

  try {
    const user = await userRepo.findOneBy({ user_id, password });
    res
      .status(200)
      .json({ data: user, message: "User fetched successfully..." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllUsers, createNewUser, createUsersInBulk, updateUser, getUsersByVendor, loginAuth };

/** @format */

import { Request, Response } from "express";
import { Role } from "../../entities/v1/role";
import { AccessControl } from "../../entities/v1/access_control";
import { AppDataSource } from "../../db/typeorm";

const roleRepo = AppDataSource.getRepository(Role);
const accessControlRepo = AppDataSource.getRepository(AccessControl);

const getAllRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await roleRepo.find();
    res
      .status(200)
      .json({ data: roles, message: "Roles fetched successfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNewRole = async (req: Request, res: Response): Promise<void> => {
  const { name, controls, updated_by } = req.body;
  console.log(req.body);

  if (!name || !controls || !updated_by) {
    res.status(400).json({ message: "Invalid input data" });
    return;
  }

  try {
    const validControls = await Promise.all(
      controls.map(async (controlId: number) => {
        const control = await accessControlRepo.findOne({
          where: { id: controlId },
        });
        if (!control) {
          throw new Error(`AccessControl with id ${controlId} not found`);
        }
        return control;
      })
    );

    const newRole = roleRepo.create({
      name,
      org_id: "1",
      access_controls: validControls,
      updated_by,
    });

    await roleRepo.save(newRole);

    res
      .status(201)
      .json({ data: newRole, message: "Role created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, access_controls, updated_by } = req.body;

  try {
    const role = await roleRepo.findOneBy({ id: parseInt(id) });

    const validControls = await Promise.all(
      access_controls.map(async (controlId: number) => {
        const control = await accessControlRepo.findOne({
          where: { id: controlId },
        });
        if (!control) {
          throw new Error(`AccessControl with id ${controlId} not found`);
        }
        return control;
      })
    );

    if (role) {
      role.name = name;
      role.access_controls = validControls;
      role.updated_by = updated_by;

      await roleRepo.save(role);

      res
        .status(200)
        .json({ message: "Role successfully updated", data: role });
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const role = await roleRepo.findOneBy({ id: parseInt(id) });

    if (role) {
      await roleRepo.remove(role);
      res.status(200).json({ message: "Role successfully deleted" });
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyRoles = async (req: Request, res: Response) => {
  const roleList: string[] = req.body;

  try {
    const roles = await roleRepo.find();

    const allExist = roleList.every((item: string) => {
      return roles.some((role) => role.name === item);
    });

    if (allExist) {
      res.status(200).json({ data: true, message: "All roles are verified." });
    } else {
      res
        .status(403)
        .json({ data: false, message: "Bad request - roles not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllRoles, createNewRole, updateRole, deleteRole, verifyRoles };

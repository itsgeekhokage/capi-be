/** @format */

import { Request, Response } from "express";
import { AppDataSource } from "../db/typeorm";
import { AccessControl } from "../entities/access_control";

const controlRepo = AppDataSource.getRepository(AccessControl);

const getAllAccessControls = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const controls = await controlRepo.find();
    res
      .status(200)
      .json({ data: controls, message: "Controls fetched successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Failed to fetch access controls! Internal server error",
      });
  }
};

const createNewAccessControl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, path, type, updated_by } = req.body;

  try {
    const newControl = controlRepo.create({
      name,
      path,
      type,
      updated_by,
      org_id: 1,
    });

    const result = await controlRepo.save(newControl);
    res
      .status(201)
      .json({ data: result, message: "Control created successfully..." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateAccessControl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, path, type, updated_by, org_id } = req.body;

  try {
    const control = await controlRepo.findOne({where : {id : parseInt(id)}});
    if (control) {
      control.name = name || control.name;
      control.path = path || control.path;
      control.type = type || control.type;
      control.updated_by = updated_by || control.updated_by;
      control.org_id = org_id || control.org_id;

      await controlRepo.save(control);

      res.status(200).json({ data: control, message: "Updated successfully" });
    } else {
      res.status(404).json({ message: "Control not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAccessControl = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const control = await controlRepo.findOne({ where: { id: parseInt(id) } });
    if (!control) {
      res.status(404).json({ message: "Control not found" });
    } else {
      await controlRepo.remove(control);
      res.status(200).json({ message: "Deleted successfully..." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getAllAccessControls,
  createNewAccessControl,
  updateAccessControl,
  deleteAccessControl,
};

/** @format */

import { AppDataSource } from "../../db/typeorm";
import { Project } from "../../entities/v1/project";
import { Request, Response } from "express";

const projectRepo = AppDataSource.getRepository(Project);

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectRepo.find();
    res
      .status(200)
      .json({ data: projects, message: "Projects fetched successfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProject = async (req : Request, res : Response)  => {
  const {id} = req.params;
  try {
    const project = await projectRepo.findOne({where : {id : parseInt(id)}});
    res
      .status(200)
      .json({ data: project, message: "Project fetched successfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const createNewProject = async (req: Request, res: Response) => {
  const { project_name, project_code } = req.body;
  if (!project_code || !project_name)
    res.status(400).json({ message: "input is not correct" });
  else {
    try {
      const newProject = projectRepo.create({
        project_name,
        project_code,
      });
      await projectRepo.save(newProject);
      res
        .status(200)
        .json({ data: newProject, message: "Project created successfully..." });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  }
};


const updateBasicDetails = async (req : Request, res : Response) => {

}

export { getAllProjects, createNewProject, getProject };

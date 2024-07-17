import { AppDataSource } from "../../db/typeorm";
import { Request, Response } from "express";
import { Project_tag } from "../../entities/v1/project_tag";
import { Project } from "../../entities/v1/project";

const projectTagRepo = AppDataSource.getRepository(Project_tag);
const projectRepo = AppDataSource.getRepository(Project);

const getAllProjectTags = async (req : Request, res : Response) => {
    try {
        const project_tags = await projectTagRepo.find();
        res.status(200).json({
            data : project_tags, message : "project tags fetched successfully..."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal server error"});
    }
}

const createNewProjectTags = async (req: Request, res: Response) => {
  const { tag, placeholder, desposition_type, desposition, project_code } =
    req.body;

  try {
    const newTag = projectTagRepo.create({
      tag,
      placeholder,
      desposition_type,
      desposition: desposition || "",
      project_code,
    });
    await projectTagRepo.save(newTag);

    const project = await projectRepo.findOne({
      where: { project_code: project_code },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.project_tags.push(newTag);
    await projectRepo.save(project);

    res.status(201).json({
      data: newTag,
      message: "Project tag created successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const updateProjectTag = async (req: Request, res: Response) => {
  const { placeholder, desposition_type, desposition } =
    req.body;
  const { id } = req.params;
  try {
    const seltag = await projectTagRepo.findOneBy({ id: parseInt(id) });
    if (seltag) {
      seltag.placeholder = placeholder;
      seltag.desposition_type = desposition_type;
      seltag.desposition = desposition;

      await projectTagRepo.save(seltag);
      res
        .status(200)
        .json({
          data: seltag,
          message: "question tag successfully updated...",
        });
    } else {
      res.status(404).json({ message: "question tag not found..." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export {getAllProjectTags, createNewProjectTags, updateProjectTag};
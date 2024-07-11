/** @format */

import { AppDataSource } from "../db/typeorm";
import { Request, Response } from "express";
import { Question_tag } from "../entities/question_tag";

const questionTagRepo = AppDataSource.getRepository(Question_tag);

const getAllQuestionTags = async (req: Request, res: Response) => {
  try {
    const question_tags = await questionTagRepo.find();
    res.status(200).json({
      data: question_tags,
      message: "Question tags fetched successfully...",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNewQuestionTag = async (req: Request, res: Response) => {
  const { isDefault, tag, placeholder, desposition_type, desposition } =
    req.body;

  try {
    const newTag = questionTagRepo.create({
      default: isDefault,
      tag,
      placeholder,
      desposition_type,
      desposition: desposition || "",
    });
    await questionTagRepo.save(newTag);
    res
      .status(201)
      .json({ data: newTag, message: "Question tag created successfully..." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateQuestionTag = async (req: Request, res: Response) => {
  const { isDefault, placeholder, desposition_type, desposition } =
    req.body;
  const { id } = req.params;
  try {
    const seltag = await questionTagRepo.findOneBy({id : parseInt(id)});
    if(seltag){
      seltag.default = isDefault;
      seltag.placeholder = placeholder;
      seltag.desposition_type = desposition_type;
      seltag.desposition = desposition;

      await questionTagRepo.save(seltag);
      res.status(200).json({data : seltag, message : "question tag successfully updated..."})
    }
    else {
      res.status(404).json({message : "question tag not found..."});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllQuestionTags, createNewQuestionTag, updateQuestionTag};

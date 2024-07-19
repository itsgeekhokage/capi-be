/** @format */

import { Request, Response } from "express";
import { ResponseModel } from "../../entities/v1/response";


export const getResponsesByUserIdAndProjectCode = async (req : Request, res : Response) => {
  try {
    const { user_id, project_code } = req.params;
    const responses = await ResponseModel.find({
      user_id,
      project_code,
      status: 0,
    }).limit(10);
    res.status(200).json({data : responses, message : "responses fetched successfully..."});
  } catch (error) {
    res.status(500).json({ message: "Error fetching responses", error });
  }
};

export const updateResponseById = async (req: Request, res: Response) => {
  try {
    const { response_id } = req.params;
    const updateData = req.body;

    const updatedResponse = await ResponseModel.findOneAndUpdate(
      { response_id },
      { ...updateData, status: 1 },
      { new: true }
    );

    if (!updatedResponse) {
      return res.status(404).json({ message: "Response not found" });
    }

    res.status(200).json(updatedResponse);
  } catch (error) {
    res.status(500).json({ message: "Error updating response", error });
  }
};

export const createResponse = async (req: Request, res: Response) => {

  const  responses  = req.body;
  console.log(responses);
  try {
    let savedResponses = [];
    for (const response of responses) {
      const newResponse = new ResponseModel(response);
      const savedResponse = await newResponse.save();
      if(!savedResponse){
        console.log("error");
        return;
      }
      savedResponses.push(savedResponse);
    }

    res
      .status(201)
      .json({
        data: savedResponses,
        message: "Responses saved successfully...",
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating response", error });
  }
};


export const deleteResponseById = async (req: Request, res: Response) => {
  try {
    const { response_id } = req.params;

    const deletedResponse = await ResponseModel.findOneAndDelete({
      response_id,
    });

    if (!deletedResponse) {
      return res.status(404).json({ message: "Response not found" });
    }

    res.status(200).json({ message: "Response deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting response", error });
  }
};

export const getResponseById = async (req: Request, res: Response) => {
  try {
    const { response_id } = req.params;
    const response = await ResponseModel.findOne({ response_id });

    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching response", error });
  }
};

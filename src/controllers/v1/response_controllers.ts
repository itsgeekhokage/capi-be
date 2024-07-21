/** @format */

import { Request, Response } from "express";
import { ResponseModel } from "../../entities/v1/response";


export const getResponsesByUserId = async (req : Request, res : Response) => {
  try {
    const user_id  = req.params.id;
    console.log(req.params);
    const responses = await ResponseModel.findOne({
      user_id,
      status: 0,
    });
    res.status(200).json({data : responses, message : "responses fetched successfully..."});
  } catch (error) {
    res.status(500).json({ message: "Error fetching responses", error });
  }
};

export const updateResponseById = async (req: Request, res: Response) => {
  try {
    const { response_id } = req.params;
    const {
      response_time,
      start_time,
      end_time,
      question_disposition,
      answer_disposition
    } = req.body;

    const updatedResponse = await ResponseModel.findOneAndUpdate(
      { response_id },
      {
        $set: {
          response_time,
          start_time,
          end_time,
          question_disposition,
          answer_disposition,
          status: 1
        }
      },
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

  const responses = req.body;
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


const assignResponsesToUsers = async (req : Request, res : Response) => {

  const {project_code, userIds} = req.body;
  try {
    const responses = await ResponseModel.find({ project_code: project_code });

    if (responses.length === 0) {
      return { message: "No responses found for this project code" };
    }

    if (userIds.length === 0) {
      return { message: "No users provided" };
    }

    const numResponses = responses.length;
    const numUsers = userIds.length;

    const responsesPerUser = Math.floor(numResponses / numUsers);
    const remainingResponses = numResponses % numUsers;

    let userIndex = 0;
    let responseIndex = 0;

    while (responseIndex < numResponses) {
      const currentUser = userIds[userIndex];

      const numToAssign =
        responsesPerUser + (userIndex < remainingResponses ? 1 : 0);

      for (let i = 0; i < numToAssign; i++) {
        if (responseIndex < numResponses) {
          responses[responseIndex].user_id = currentUser;
          await responses[responseIndex].save();
          responseIndex++;
        }
      }

      userIndex++;
    }

    res.status(200).json({ message: "Responses assigned successfully" });
  } catch (error) {
    console.error("Error assigning responses:", error);
    return { error: "An error occurred while assigning responses" };
  }
};

export default assignResponsesToUsers;



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

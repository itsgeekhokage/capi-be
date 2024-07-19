/** @format */

import mongoose from "mongoose";

const { Schema } = mongoose;

const responseSchema = new Schema({
  date_of_insertion: {
    type: Date,
    default: 0,
  },
  response_id: {
    type: String,
    default: "",
  },
  submission_id: {
    type: String,
    default: "",
  },
  source: {
    type: String,
    default: "",
  },
  status: {
    type: Number,
    default: -1,
  },
  fa_id: {
    type: Number,
    default: -1,
  },
  fa_name: {
    type: String,
    default: "-",
  },
  fa_phone: {
    type: Number,
    default: 0,
  },
  lng: {
    type: Number,
    default: 0.0,
  },
  lat: {
    type: Number,
    default: 0.0,
  },
  org_id: {
    type: Number,
    default: -1,
  },
  audio_link: {
    type: String,
    default: "",
  },
  survey_id: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  survey_name: {
    type: String,
    default: "",
  },
  agent_emp_code: {
    type: String,
    default: "",
  },
  agent_team_code: {
    type: String,
    default: "",
  },
  miscellaneous: {
    type: String,
    default: "",
  },
  user_id : {
    type : String,
    default : "",
  },
  project_code : {
    type : String,
    default : "",
  },
  response: {
    type: String,
    default: "",
  },
  response_time: {
    type: Date,
    default: 0,
  },
  start_time: {
    type: String,
    default: "",
  },
  end_time: {
    type: String,
    default: "",
  },
  question_disposition: {
    type: String,
    default: "",
  },
  answer_disposition: {
    type: String,
    default: "",
  },
});

const ResponseModel = mongoose.model("Response", responseSchema);

export { ResponseModel };

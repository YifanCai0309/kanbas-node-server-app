import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    //course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    course: { type: String, required: true },
    lessons: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String },
      },
    ],
  },
  { collection: "modules" }
);

export default moduleSchema;

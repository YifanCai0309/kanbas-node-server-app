import model from "./model.js";

export const createModule = (module) => {
  delete module._id;
  return model.create(module);
};

export const findAllModules = (courseId) => model.find({ course: courseId });

export const updateModule = async (moduleId, module) => {
  if (module.name) {
    await model.updateOne({ _id: moduleId }, { $set: module });
    return "Module updated successfully";
  } else {
    throw new Error("Module does not meet requirements");
  }
  // await model.updateOne({ _id: moduleId }, { $set: module });
};

export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });

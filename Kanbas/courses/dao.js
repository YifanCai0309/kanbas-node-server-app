import model from "./model.js";

export const createCourse = (course) => {
  delete course._id;
  return model.create(course);
};

export const findAllCourses = () => model.find();

export const updateCourse = async (courseId, course) => {
  const existingCourse = await model.findById(courseId);
  if (!existingCourse) {
    throw new Error("Course not found");
  }

  existingCourse.set(course);

  const validationResult = existingCourse.validateSync();
  if (validationResult) {
    throw new Error(validationResult.errors);
  }

  return existingCourse.save();
};

export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });

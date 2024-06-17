import model from "./model.js";

export const createCourse = (course) => {
  delete course._id;
  return model.create(course);
};

export const findAllCourses = () => model.find();
export const updateCourse = async (courseId, course) => {
  if (course.name) {
    await model.updateOne({ _id: courseId }, { $set: course });
    return "Course updated successfully";
  } else {
    throw new Error("Course does not meet requirements");
  }
};

export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });

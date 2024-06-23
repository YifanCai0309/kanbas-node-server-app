import model from "./model.js";
// implemented export const createUser = (user) => {};
export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};

export const findAllUsers = () => model.find();
export const findUsersByRole = (role) => model.find({ role: role });
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

// Add course to user
export const addCourseToUser = async (userId, courseId) => {
  try {
    const updatedUser = await model.findByIdAndUpdate(
      userId,
      { $addToSet: { courses: courseId } },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(`Unable to add course: ${error.message}`);
  }
};

// Remove course from user
export const removeCourseFromUser = async (userId, courseId) => {
  try {
    const updatedUser = await model.findByIdAndUpdate(
      userId,
      { $pull: { courses: courseId } },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(`Unable to remove course: ${error.message}`);
  }
};

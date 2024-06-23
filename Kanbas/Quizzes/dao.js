import model from "./model.js";

export const createQuiz = (quiz) => {
  delete quiz._id;
  return model.create(quiz);
};

export const findAllQuizzes = (courseId) => model.find({ course: courseId });
export const findQuiz = (quizId) => model.find({ quizId: quiz._id });

export const updateQuiz = async (quizId, quiz) => {
  if (quiz.title) {
    await model.updateOne({ _id: quizId }, { $set: quiz });
    return "Quiz updated successfully";
  } else {
    throw new Error("Quiz does not meet requirements");
  }
};

export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });

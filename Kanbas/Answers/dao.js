import AnswerModel from './model.js';

export const createAnswer = (answer) => {
    delete answer._id;
    return AnswerModel.create(answer);
};

export const findAllAnswers = (userId, quizId) => AnswerModel.find({ 
    user_id: userId, 
    quiz_id: quizId 
});

export const findAnswer = (answerId) => AnswerModel.findOne
    ({ _id: answerId });

export const updateAnswer = async (answerId, answer) => {
    if (answer.answers) {
        await AnswerModel.updateOne({ _id: answer, $set: answer });
        return "Answer updated successfully";
    }
    else {
        throw new Error("Answer does not meet requirements");
    }
};

export const deleteAnswer = (answerId) => AnswerModel.delete({ _id: answerId });
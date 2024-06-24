import * as dao from "./dao.js";

export default function AnswerRoutes(app) {
    app.post("/api/quizzes/:qid/answers", async (req, res) => {
        try {
        const { qid } = req.params;
        const newAnswer = {
            quiz_id: qid,
            ...req.body,
        };
        await dao.createAnswer(newAnswer);
        res.status(201).json(newAnswer);
        } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
        }
    });
    
    app.get("/api/quizzes/:qid/answers", async (req, res) => {
        try {
        const { qid } = req.params;
        const answers = await dao.findAllAnswers(qid);
        res.json(answers);
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    });
    
    app.get("/api/quizzes/:qid/answers/:aid", async (req, res) => {
        try {
        const { aid } = req.params;
        const answer = await dao.findAnswer(aid);
        res.json(answer);
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    });
    
    app.delete("/api/quizzes/:qid/answers/:aid", async (req, res) => {
        try {
        const { aid } = req.params;
        const status = await dao.deleteAnswer(aid);
        status.deletedCount
            ? res.json(status)
            : res.status(404).json({ message: "Answer not found" });
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    });
    
    app.put("/api/quizzes/:qid/answers/:aid", async (req, res) => {
        try {
        const { aid } = req.params;
        await dao.updateAnswer(aid, req.body);
        res.sendStatus(204);
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    });
    }
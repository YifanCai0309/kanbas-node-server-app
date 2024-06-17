//import db from "../Database/index.js";
import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  app.post("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const newModule = {
        ...req.body,
        course: cid,
        _id: new Date().getTime().toString(),
      };
      await dao.createModule(newModule);
      res.status(201).json(newModule);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const modules = await dao.findAllModules(cid);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      const status = await dao.deleteModule(mid);
      status.deletedCount
        ? res.json(status)
        : res.status(404).json({ message: "Module not found" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      await dao.updateModule(mid, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to update module" });
    }
  });
}

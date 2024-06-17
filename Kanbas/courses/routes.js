import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  app.post("/api/courses", async (req, res) => {
    try {
      const course = { ...req.body, _id: new Date().getTime().toString() };
      await dao.createCourse(course);
      res.send(course);
    } catch (err) {
      console.error("Error creating course:", err);
      res.status(500).send("Failed to create course.");
    }
  });

  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.send(courses);
    } catch (err) {
      console.error("Error fetching courses:", err);
      res.status(500).send("Failed to fetch courses.");
    }
  });

  app.delete("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await dao.deleteCourse(id);
      res.sendStatus(204);
    } catch (err) {
      console.error("Error deleting course:", err);
      res.status(500).send("Failed to delete course.");
    }
  });

  app.put("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const course = req.body;
      await dao.updateCourse(id, course);
      res.sendStatus(204);
    } catch (err) {
      console.error("Error updating course:", err);
      res.status(500).send("Failed to update course.");
    }
  });
}

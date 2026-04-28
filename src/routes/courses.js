import express from "express";
import Course from "../models/Course.js";
import User from "../models/User.js";
import { authenticateToken, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /api/courses/my-courses - Get user's enrolled courses
router.get("/my-courses/enrolled", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate(
      "enrolledCourses",
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user.enrolledCourses);
  } catch (error) {
    console.error("Get user courses error:", error);
    res.status(500).json({
      message: "Error fetching user courses",
      error: error.message,
    });
  }
});

// POST /api/courses/:id/enroll - Enroll user in a course
router.post("/:id/enroll", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const courseId = req.params.id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Check if user already enrolled
    if (course.enrolledUsers.includes(userId)) {
      return res.status(409).json({
        message: "You are already enrolled in this course",
      });
    }

    // Add user to course
    course.enrolledUsers.push(userId);
    await course.save();

    // Add course to user
    const user = await User.findById(userId);
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    res.json({
      message: "Successfully enrolled in course",
      course,
    });
  } catch (error) {
    console.error("Enroll error:", error);
    res.status(500).json({
      message: "Error enrolling in course",
      error: error.message,
    });
  }
});

// GET /api/courses/:id/modules - Get course modules
router.get("/:id/modules", optionalAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select("modules title");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      title: course.title,
      modules: course.modules,
    });
  } catch (error) {
    console.error("Get modules error:", error);
    res.status(500).json({
      message: "Error fetching modules",
      error: error.message,
    });
  }
});

// GET /api/courses/:courseId/modules/:moduleId
router.get("/:courseId/modules/:moduleId", optionalAuth, async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;

    const course = await Course.findById(courseId).select("modules");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const module = course.modules.id(moduleId); // correct usage

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.json(module);
  } catch (error) {
    console.error("Get module error:", error);
    res.status(500).json({
      message: "Error fetching module",
      error: error.message,
    });
  }
});

// POST /api/courses/:id/review - Add a review to course
router.post("/:id/review", authenticateToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.userId;
    const courseId = req.params.id;

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Add review
    course.reviews.push({
      userId,
      userName: user.name,
      rating,
      comment,
    });

    // Update average rating
    const avgRating =
      course.reviews.reduce((sum, review) => sum + review.rating, 0) /
      course.reviews.length;
    course.rating = avgRating;

    await course.save();

    res.json({
      message: "Review added successfully",
      course,
    });
  } catch (error) {
    console.error("Review error:", error);
    res.status(500).json({
      message: "Error adding review",
      error: error.message,
    });
  }
});

// GET /api/courses - Get all published courses
router.get("/", optionalAuth, async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select("-reviews")
      .limit(100);

    res.json(courses);
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({
      message: "Error fetching courses",
      error: error.message,
    });
  }
});

// GET /api/courses/:id - Get course details
router.get("/:id", optionalAuth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);
  } catch (error) {
    console.error("Get course error:", error);
    res.status(500).json({
      message: "Error fetching course",
      error: error.message,
    });
  }
});

export default router;

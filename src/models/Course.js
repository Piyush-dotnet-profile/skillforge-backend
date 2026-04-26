import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a course title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a course description"],
    },
    instructor: {
      type: String,
      required: [true, "Please provide instructor name"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      enum: [
        "Web Development",
        "UI/UX Design",
        "Data Fundamentals",
        "Career Skills",
        "Other",
      ],
    },
    duration: {
      type: String, // e.g., "4 weeks", "6 hours"
      default: "Self-paced",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    modules: [
      {
        title: String,
        description: String,
        content: String,
        duration: String,
        order: Number,
      },
    ],
    enrolledUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        userName: String,
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Course", courseSchema);

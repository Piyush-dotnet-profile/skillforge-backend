import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";
import User from "./models/User.js";
import connectDB from "./config/database.js";

dotenv.config();

const sampleCourses = [
  {
    title: "Web Development Fundamentals",
    description:
      "Learn HTML, CSS, JavaScript, and modern web development practices. Perfect for beginners.",
    instructor: "Sarah Johnson",
    category: "Web Development",
    duration: "8 weeks",
    level: "Beginner",
    modules: [
      {
        title: "Introduction to HTML",
        description: "Learn the basics of HTML markup",
        content: "HTML is the standard markup language...",
        duration: "1 week",
        order: 1,
      },
      {
        title: "CSS Styling",
        description: "Master CSS for beautiful styling",
        content: "CSS is used to style HTML elements...",
        duration: "2 weeks",
        order: 2,
      },
      {
        title: "JavaScript Basics",
        description: "Learn JavaScript programming",
        content: "JavaScript is a versatile programming language...",
        duration: "3 weeks",
        order: 3,
      },
      {
        title: "Responsive Design",
        description: "Create responsive websites",
        content:
          "Responsive design ensures your website works on all devices...",
        duration: "2 weeks",
        order: 4,
      },
    ],
    isPublished: true,
  },
  {
    title: "React.js Masterclass",
    description:
      "Build modern web applications with React. Learn hooks, state management, and best practices.",
    instructor: "Michael Chen",
    category: "Web Development",
    duration: "6 weeks",
    level: "Intermediate",
    modules: [
      {
        title: "React Fundamentals",
        description: "Understanding React components and JSX",
        content:
          "React is a JavaScript library for building user interfaces...",
        duration: "1.5 weeks",
        order: 1,
      },
      {
        title: "Hooks and State Management",
        description: "Master React hooks and state",
        content: "Hooks allow you to use state in functional components...",
        duration: "2 weeks",
        order: 2,
      },
      {
        title: "Building Real Projects",
        description: "Create full-featured applications",
        content: "Let's build a real-world application together...",
        duration: "2.5 weeks",
        order: 3,
      },
    ],
    isPublished: true,
  },
  {
    title: "UI/UX Design Essentials",
    description:
      "Learn design principles, user research, and create beautiful interfaces. No coding required!",
    instructor: "Emily Rodriguez",
    category: "UI/UX Design",
    duration: "10 weeks",
    level: "Beginner",
    modules: [
      {
        title: "Design Fundamentals",
        description: "Understanding color, typography, and layout",
        content: "Design is about solving problems for users...",
        duration: "2 weeks",
        order: 1,
      },
      {
        title: "User Research",
        description: "Research methods and user personas",
        content: "Understanding your users is crucial for good design...",
        duration: "2 weeks",
        order: 2,
      },
      {
        title: "Wireframing & Prototyping",
        description: "Create wireframes and prototypes",
        content: "Wireframes help you plan the layout before design...",
        duration: "3 weeks",
        order: 3,
      },
      {
        title: "Interactive Design",
        description: "Design for interactions and animations",
        content: "Good interactions make apps feel responsive and smooth...",
        duration: "3 weeks",
        order: 4,
      },
    ],
    isPublished: true,
  },
  {
    title: "Data Fundamentals for Everyone",
    description:
      "Understand data basics, analysis, and visualization without heavy math. Great for all levels!",
    instructor: "David Kumar",
    category: "Data Fundamentals",
    duration: "6 weeks",
    level: "Beginner",
    modules: [
      {
        title: "What is Data?",
        description: "Introduction to data concepts",
        content: "Data surrounds us in the modern world...",
        duration: "1 week",
        order: 1,
      },
      {
        title: "Data Analysis Basics",
        description: "Simple analysis techniques",
        content: "Data analysis helps us understand patterns...",
        duration: "2 weeks",
        order: 2,
      },
      {
        title: "Data Visualization",
        description: "Creating meaningful charts and graphs",
        content: "Visualizations make data easy to understand...",
        duration: "2 weeks",
        order: 3,
      },
      {
        title: "Real-World Applications",
        description: "Practical projects and case studies",
        content: "Let's see how data is used in real companies...",
        duration: "1 week",
        order: 4,
      },
    ],
    isPublished: true,
  },
  {
    title: "Career Skills Development",
    description:
      "Boost your professional growth with communication, leadership, and workplace skills.",
    instructor: "Lisa Anderson",
    category: "Career Skills",
    duration: "4 weeks",
    level: "Intermediate",
    modules: [
      {
        title: "Professional Communication",
        description: "Write and speak effectively at work",
        content: "Clear communication is essential for success...",
        duration: "1 week",
        order: 1,
      },
      {
        title: "Leadership Basics",
        description: "Develop your leadership potential",
        content: "Leaders inspire and guide their teams...",
        duration: "1 week",
        order: 2,
      },
      {
        title: "Teamwork & Collaboration",
        description: "Work effectively with others",
        content: "Great teams achieve great things...",
        duration: "1 week",
        order: 3,
      },
      {
        title: "Career Planning",
        description: "Plan your professional growth",
        content: "Your career is a journey, not a destination...",
        duration: "1 week",
        order: 4,
      },
    ],
    isPublished: true,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing courses
    await Course.deleteMany({});
    console.log("🗑️ Cleared existing courses");

    // Insert sample courses
    const createdCourses = await Course.insertMany(sampleCourses);
    console.log(`✅ Created ${createdCourses.length} sample courses`);

    // Close database connection
    await mongoose.connection.close();
    console.log("✅ Database seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
};

// Run seed if this file is executed directly
seedDatabase();

export default seedDatabase;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler");
const { isAuthenticated } = require("./middlewares/authMiddleware");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const adminRoutes = require("./routes/admin.route");
const eventRoutes = require("./routes/event.route");
const memberRoutes = require("./routes/member.route");
const loginRoutes = require("./routes/login.route");
const contactRoutes = require("./routes/contact.route");
const blogRoutes = require("./routes/blog.route");
const mailRoutes = require("./routes/mail.route");
// routing of endpoints
app.use("/admin", isAuthenticated, adminRoutes);
app.use("/events", eventRoutes);
app.use("/members", memberRoutes);
app.use("/auth", loginRoutes);
app.use("/contact", contactRoutes);
app.use("/blogs", blogRoutes);
app.use("/announce", mailRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Sever listening on port ${PORT}...`);
});

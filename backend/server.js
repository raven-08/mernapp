const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors"); // Import cors module
const { errorHandler } = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use CORS middleware
app.use(
	cors({
		origin: "https://mernapp-frontend-r92o.onrender.com", // Replace with your frontend URL
		methods: "GET,POST,PUT,DELETE", // Specify allowed methods
		credentials: true, // If you're using cookies or other credentials
	})
);

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => res.send("Please set to production"));
}

// Error Handlers
app.use(errorHandler);
app.use(notFound);

app.listen(port, () => console.log(`Server is running on port ${port}`));

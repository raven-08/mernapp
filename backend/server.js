const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend

if (process.env.NODE_ENV == "production") {
	app.use(express.static(path.join(__dirname, "../frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"))
	);
}
else{
  app.get('/', (req, res) => res.send('Please set to production'))
}
// Error Handlers
app.use(errorHandler);
app.use(notFound);

// Logger middleware
app.use(logger);

app.listen(port, () => console.log(`Server is running on port ${port}`));

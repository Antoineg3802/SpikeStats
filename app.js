var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");

require("dotenv").config();

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/client/build")));

// Import des routes
var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");
var teamsRouter = require("./src/routes/teams");
var matchesRouter = require("./src/routes/matches");

app.use(cors());

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/matches", matchesRouter);

app.use("/api/*", (req, res) => {
	res.status(404).json({
		success: false,
		message: "Endpoint not found",
	});
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const port = process.env.APP_PORT || 8080;

app.listen(port, function () {
	if (process.env.npm_lifecycle_event !== "start") {
		console.log("API started on : http://localhost:" + port + "/api/");
	} else {
		console.log("SpikeStats started on : http://localhost:" + port);
	}
});

module.exports = app;

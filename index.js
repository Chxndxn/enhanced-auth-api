const express = require("express");
const loadEnvironment = require("./loadEnvironment");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.SERVER_PORT;
const { connectDB } = require("./src/config/dbConfig");
const authenticationRoutesV1 = require("./src/routes/authenticationRoutesV1");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(express.json());
app.use("/api/v1/enhanced-authentication", authenticationRoutesV1);

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

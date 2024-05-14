const mongoose = require("mongoose");
const connectionString = process.env.ATLAS_URI;

const connectDB = async () => {
	await mongoose
		.connect(connectionString)
		.then((conn) => {
			console.log(
				`MongoDB connected to ${conn.connection.db.databaseName}`
			);
		})
		.catch((error) => {
			console.error(error.message);
		});
};
module.exports = { connectDB };

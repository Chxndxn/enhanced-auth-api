const User = require("../models/user");
const ObjectId = require("mongoose").ObjectId;
const bcrypt = require("bcryptjs");

exports.viewUserProfile = async (req, res) => {
	try {
		const currentUserId = req.params.id;
		const visitedUserData = req.body;
		if (currentUserId && visitedUserData) {
			const currentUser = await User.findById(currentUserId)
			const visitedUser = await User.findById(visitedUserData.id);
			if (!visitedUser) {
				res.status(404).json({ message: "User not found." });
			} else if (!visitedUser.publicProfile && currentUser.role !== "admin" && currentUserId !== visitedUser.id) {
				res.status(403).json({error: "User cannot access private account"});
			} else {
				res.status(200).json(visitedUser);
			}
		} else {
			res.status(400).json({ message: "Please check the request param and body." });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

exports.listPublicProfiles = async (req, res) => {
	try {
		const users = await User.find({ publicProfile: true });
		if (users.length > 0) {
			res.status(200).json(users);
		} else {
			res.status(404).json({ message: "No public profiles found" });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

exports.fetchProfilesBasedOnRole = async (req, res) => {
	try {
		const role = req.params.role;
		if (role) {
			const users = await User.find({ role: role });
			if (users.length < 0) {
				res.status(404).json({ message: "No public profiles found" });
			}
			res.status(200).json(users);
		} else {
			res.status(400).json({
				message: "Please specify the role in the request param",
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

exports.updateUserProfile = async (req, res) => {
	try {
		const userId = req.params.id;
		const userData = req.body;
		if (userId && userData) {
			const updatedUser = await User.findByIdAndUpdate(userId, userData, {
				new: true,
			});
			if (updatedUser) {
				res.status(200).json(updatedUser);
			} else {
				res.status(404).json({ message: "User not found" });
			}
		} else {
			res.status(400).json({ message: "User id and role are required." });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err.message });
	}
};

exports.createUser = async (req, res) => {
	try {
		const userData = req.body;
		let user = null;
		if (userData) {
			user = await User.create(userData);
			res.status(201).json(user);
		} else {
			res.status(400).json({ message: "Please check the request body" });
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ message: err.message });
	}
};

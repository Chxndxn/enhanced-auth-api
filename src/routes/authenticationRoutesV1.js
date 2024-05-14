const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/* View the user profiles. 
    Admin roles can access both public and private profiles. 
    User roles can access only public profiles.  */
router.post("/user/:id", userController.viewUserProfile);

/* List all the public profiles */
router.get("/user/publicProfiles", userController.listPublicProfiles);

/* Retrieve the user profile based on the role */
router.get("/user/roleBasedProfiles/:role", userController.fetchProfilesBasedOnRole);

/* Update the user profile. Allowing user to switch between private and public */
router.put("/user/:id", userController.updateUserProfile);

/* Create new user. For the ease of adding data to the DB. (Not part of the requirement) */
router.post("/user", userController.createUser);

module.exports = router;

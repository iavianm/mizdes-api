const express = require("express");
const { celebrate } = require("celebrate");
const auth = require("../middlewares/auth");

const router = express.Router();
const {
    updateUser,
    getCurrentUser,
    loginUser,
    createUser,
    logoutUser,
} = require("../controllers/users");
const {
    userLogin,
    userCreate,
    userUpdate,
} = require("../utils/joiSchemes");

router.post("/signin", celebrate(userLogin), loginUser);
router.post("/signup", celebrate(userCreate), createUser);
router.get("/signout", auth, logoutUser);

router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, celebrate(userUpdate), updateUser);

module.exports = router;

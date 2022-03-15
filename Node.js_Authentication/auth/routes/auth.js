const router = require("express").Router();
const User = require("../module/User");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");
const { valid } = require("@hapi/joi");

router.post("/register", async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // 檢查信箱是否重複
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    // 密碼加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err)
    }
})

// Login
router.post("/login", async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // 檢查信箱是否存在
    const user = await User.findOne({ email: req.body.email });
    if ( !user ) return res.status(400).send("Email or password is wrong");
    // 檢查密碼是否正確
    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if ( !validPwd ) return res.status(400).send("wrong password");

    res.send("Logged in");

})

module.exports = router;
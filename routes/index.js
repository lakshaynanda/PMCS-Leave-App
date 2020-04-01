var express = require('express');
var router = express.Router();
const Promise = require("bluebird");
const crypto = Promise.promisifyAll(require("crypto"));
const User = require("../models/user");
const Leave = require("../models/leave");
const passport = require("passport");
const auth = require("../middleware/authentication");
const nodemailer = require("nodemailer");
const service = require("../service/mailfun")
/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/leave")
  } else {
    res.render('index', { message: '' });
  }
});

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/leave",
    failureRedirect: "/",
    failureFlash: true
  })
);

router.get("/logout", auth.isLoggedIn, (req, res) => {
  req.logout();
  res.render('index', { message: '' });
});


router.get("/register", (req, res, next) => {
  res.render("register", { message: "" })
})
router.post("/register", async (req, res, next) => {
  try {
    let message = "ok";
    let userDetails = req.body;
    let user = await User.findOne({ email: userDetails.email });
    if (user) {
      message = "User already registered";
      return res.render("register", { message: message })
    }
    let newUser = new User(userDetails);
    // if (userDetails.password === process.env.ADMIN_PASS) {
    //   console.log("password matched");
    //   newUser.role = "admin";
    // }
    console.log("A");
    newUser.password = newUser.generateHash(userDetails.password);
    // newUser.name = userDetails.name.trim();
    // newUser.gender = userDetails.gender.toLowerCase();
    await newUser.save();
    if (message = "ok") {
      return res.render("index", { message: "" })
    }
    res.json({ "message": message });
  } catch (error) {
    console.log(error.toString());
    next(error);
  }
})

router.get('/leave', auth.isLoggedIn, function (req, res, next) {
  res.render('leave');
});

router.post("/leave1", auth.isLoggedIn, async (req, res, next) => {
  try {
    const buffer = await crypto.randomBytesAsync(3)
    console.log(req.body)
    // console.log("AA")
    let lleave = new Leave();
    lleave.userId = req.user.id;
    lleave.option = req.body.option;
    lleave.lid = req.body.option + lleave.id;
    lleave.place = req.body.place;
    lleave.to = req.body.to;
    lleave.from = req.body.from;
    lleave.bill = req.body.bill;
    lleave.log = req.body.log;
    lleave.cdetails = req.body.cdetails;
    lleave.desc = req.body.desc;
    await lleave.save();
    let leave = await Leave.findById(lleave.id).populate("userId", "email");
    let lmail = leave.userId.email;
    let approve = "https://leavepm2.herokuapp.com/approve/" + leave.id.toString();
    let reject = "https://leavepm2.herokuapp.com/reject/" + leave.id.toString();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pmcontrolsystems@gmail.com",
        pass: "yquyjplpnxyhsloc"
      }
    });
    // console.log(req.user.email)
    const mailData = {
      from: req.user.email,
      to: "rohit@pmcontrol.co.in",
      subject: "Travel Plan Application",
      text: "The following leave has been applied",
      html: service.getMail(leave.option, leave.place, leave.to, leave.from, leave.bill, leave.cdetails, leave.desc, approve, reject, lmail)
    };
    console.log(mailData)
    await transporter.sendMail(mailData);
    leave.mailSent = true;
    await leave.save();
    return res.json(req.body)
  } catch (error) {
    console.log(error.toString());
    next(error);
  }
})

router.post("/leave2", auth.isLoggedIn, async (req, res, next) => {
  try {
    const buffer = await crypto.randomBytesAsync(3)
    console.log(req.body)
    // console.log("AA")
    let lleave = new Leave();
    lleave.userId = req.user.id;
    lleave.option = req.body.option;
    lleave.lid = req.body.option + lleave.id;
    lleave.place = req.body.place;
    lleave.to = req.body.to;
    lleave.from = req.body.from;
    lleave.bill = req.body.bill;
    lleave.log = req.body.log;
    lleave.cdetails = req.body.cdetails;
    lleave.desc = req.body.desc;
    await lleave.save();
    let leave = await Leave.findById(lleave.id).populate("userId", "email");
    let lmail = leave.userId.email;
    let approve = "https://leavepm2.herokuapp.com/approve/" + leave.id.toString();
    let reject = "https://leavepm2.herokuapp.com/reject/" + leave.id.toString();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pmcontrolsystems@gmail.com",
        pass: "yquyjplpnxyhsloc"
      }
    });
    // console.log(req.user.email)
    const mailData = {
      from: req.user.email,
      to: "praveen@pmcontrol.co.in",
      subject: "Travel Plan Application",
      text: "The following leave has been applied",
      html: service.getMail(leave.option, leave.place, leave.to, leave.from, leave.bill, leave.cdetails, leave.desc, approve, reject, lmail)
    };
    console.log(mailData)
    await transporter.sendMail(mailData);
    leave.mailSent = true;
    await leave.save();
    return res.json(req.body)
  } catch (error) {
    console.log(error.toString());
    next(error);
  }
})


router.get("/approve/:id", async (req, res, next) => {
  try {
    let leave = await Leave.findById(req.params.id).populate("userId", "email");
    console.log(req.params.id);
    let lmail = leave.userId.email;
    leave.approved = true;
    await leave.save();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pmcontrolsystems@gmail.com",
        pass: "yquyjplpnxyhsloc"
      }
    });
    // console.log(req.user.email)
    const mailData = {
      from: "pmcontrolsystems@gmail.com",
      to: "heena@pmcontrol.co.in",
      subject: "Travel Plan Application Approved",
      text: "The following leave has been approved",
      html: service.getMail2(leave.option, leave.place, leave.to, leave.from, leave.bill, leave.cdetails, leave.desc, leave.lid, lmail)
    };
    await transporter.sendMail(mailData);
    res.send("Thankyou for approving")
  } catch (error) {
    console.log(error.toString());
    next(error);
  }
})


router.get("/reject/:id", async (req, res, next) => {
  try {
    let leave = await Leave.findById(req.params.id).populate("userId", "email");
    console.log(leave);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pmcontrolsystems@gmail.com",
        pass: "yquyjplpnxyhsloc"
      }
    });
    // console.log(req.user.email)
    const mailData = {
      from: "pmcontrolsystems@gmail.com",
      to: leave.userId.email,
      subject: "Travel Plan Application Rejected",
      text: "The following leave has been Rejected",
      html: service.getMail3(leave.option, leave.place, leave.to, leave.from, leave.bill, leave.cdetails, leave.desc)
    };
    await transporter.sendMail(mailData);
    res.send("Leave rejected")
  } catch (error) {
    console.log(error.toString());
    next(error);
  }
})


module.exports = router;

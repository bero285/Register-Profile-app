const User = require("./models/user.js");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../public")));

const dbURI =
  "mongodb databse link";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));


app.get("/manifest.json", (req, res) => {
  res.sendFile(path.join(__dirname, "manifest.json"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.post("/api/profile", (req, res) => {
  const { userId } = req.session;

  User.findOne({ _id: userId })
    .then((user) => {
      if (user) {
        res.status(200).json({
          success: true,
          user: user,
        });
      } else {
        res.status(404).json({
          success: false,
          error: "User not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          req.session.userId = user._id;
          console.log("correct password");
          res.status(201).json({
            success: true,
            user: user,
          });
        } else {
          console.log("incorrect password");
          res.status(401).json({
        
            success: false,
            error: "Incorrect password",
          });
        }
      } else {
        console.log("user not found");
        res.status(404).json({
 
          success: false,
          error: "User not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
     
        success: false,
        error: "Internal server error",
      });
      
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/api/logout", (req, res) => {
  delete req.session.userId;
  res.status(200).json({
    success: true,
  });
});

app.post("/api/register", (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  User.findOne({ email })
    .then((exUser) => {
      if (exUser) {
        console.log("email already exists");
        res.status(409).json({
          success: false,
          error: "Email already exists",
        });
      } else {
        const newUser = new User({
          email,
          password,
          firstname: firstName,
          lastname: lastName,
        });
        console.log(newUser);
        newUser
          .save()
          .then((user) => {
            req.session.userId = user._id;
            console.log(req.session.userId, "useId");
            res.status(201).json({
              success: true,
              user: user,
            });

            console.log("logins");
          })

          .catch((err) => {
            console.log(err);
            res.status(500).json({
              // Internal Server Error status code
              success: false,
              error: "Internal server error",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});

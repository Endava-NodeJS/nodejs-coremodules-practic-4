const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./models/user");
const userValidator = require("./validations");
app.use(express.json({ extended: true }));

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const { error } = userValidator(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const userExists = await User.findOne({ where: { email: email } });
  if (userExists) {
    return res
      .status(400)
      .send("A User account with this email already exists");
  }

  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      console.log("Hashing failed");
      res.status(400).send("User creation failed");
    } else {
      User.create({ email, password: hash })
        .then(() => {
          res.status(200).send(`User Created Successfully`);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send("User creation failed");
        });
    }
  });
});
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const { error } = userValidator(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const user = await User.findOne({ where: { email: email } })
  if(!user) {
     return res.status(400).send("Your credentials are wrong")
  }
  bcrypt.compare(password, user.password, function(err, result) {
      if(err) {
          return res.status(400).send("Something went wrong")
      }
      if(!result) {
          return res.status(400).send("Your password is wrong")
      }
      return res.status(200).send("Login successful")
});



});
app.listen(3000, () => console.log("APP OPEN ON PORT 3000"));

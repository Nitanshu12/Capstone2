const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";


app.use(express.json());
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    message: "Signup successful",
    user: {
      id: user.id,
      email: user.email,
      password: user.password,
    },
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, {
    expiresIn: "7d",
  });
  // const refreshToken = jwt.sign(
  //   { email: user.email, id: user.id },
  //   JWT_REFRESH_SECRET,
  //   { expiresIn: "30d" }
  // );

  // let refreshTokens = [];

  // refreshTokens.push(refreshToken);
  // // console.log("Refresh Token:", refreshToken);
  

  res.status(200).json({
    message: "Login successful",
    token,
    userData: {
      id: user.id,
      email: user.email,
    },
  });
});

app.get("/protected", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    res.json({ message: "Protected data accessed", user });
  });
});
// app.post("/refresh", (req, res) => {
//     const { token } = req.body;
//     if (!token) return res.status(401).json({ error: "No token provided" });

//     if (!refreshTokens.includes(token))
//       return res.status(403).json({ error: "Invalid refresh token" });

//     jwt.verify(token, JWT_REFRESH_SECRET, (err, user) => {
//       if (err)
//         return res.status(403).json({ error: "Invalid or expired token" });

//       const newToken = jwt.sign(
//         { email: user.email, id: user.id },
//         JWT_SECRET,
//         { expiresIn: "7d" }
//       );

//       res.json({ Token: newToken });
//     });
//   });

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

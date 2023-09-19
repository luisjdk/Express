const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = [
  {
    id: 1,
    username: "user1",
    password: "password1",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken });
  } else {
    res.status(400).json({ error: "Usuario o contraseña incorrectos" });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Falta token de acceso" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token no válido" });
    req.user = user;
    next();
  });
}

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Ruta protegida accesible" });
});

module.exports = { authenticateToken };

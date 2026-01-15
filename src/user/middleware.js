const checkById = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  next();
};

const checkAddNewUser = (req, res, next) => {
  const { name, surname, email, pwd } = req.body;

  if (!name || !surname || !email || !pwd) {
    return res.status(400).send("All fields are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email format");
  }

  next();
};

const checkDeleteUser = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).send("Invalid ID format");
  }
  next();
};

module.exports = {
  checkById,
  checkAddNewUser,
  checkDeleteUser,
};

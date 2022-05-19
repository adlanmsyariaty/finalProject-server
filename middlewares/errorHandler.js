const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.name === "SequelizeValidationError") {
    err = err.errors.map((el) => el.message);
    res.status(400).json({
      message: err,
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({
      message: "Your email is already registered",
    });
  } else if (err.name === "EMAIL_PASSWORD_IS_REQUIRED") {
    res.status(400).json({
      message: "Email & password is required",
    });
  } else if (err.name === "EMAIL_IS_REQUIRED") {
    res.status(400).json({
      message: "Email is required",
    });
  } else if (err.name === "PASSWORD_IS_REQUIRED") {
    res.status(400).json({
      message: "Password is required",
    });
  } else if (err.name === "USER_NOT_FOUND") {
    res.status(401).json({
      message: "Invalid email or password",
    });
  } else if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    res.status(401).json({
      message: "Invalid identification token, please login first",
    });
  } else if (err.name === "Unauthorized") {
    res.status(401).json({
      message: "Unauthorized access account",
    });
  } else if (err.name === "Forbidden") {
    res.status(403).json({
      message: "Forbidden access",
    });
  } else if (err.name === "CONSULTANT_NOT_FOUND") {
    res.status(404).json({
      message: "Consultant not found",
    });
  } else if (err.name === "GENRE_NOT_FOUND") {
    res.status(404).json({
      message: "Genre not found",
    });
  } else if (err.name === "CAST_NOT_FOUND") {
    res.status(404).json({
      message: "Cast not found",
    });
  } else {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = errorHandler;

class AppError extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { code, message } = err;

  res.status(code).json({
    error: {
      message,
      code,
    },
  });
};

module.exports = {
  AppError,
  handleError,
};

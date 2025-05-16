function notFound(req, res, next) {
  res.status(404).json({
    error: "404 Not Found",
    message: "Non-existing page",
  });
}

module.exports = notFound;

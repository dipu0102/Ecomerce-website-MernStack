//Not Found Error Handler

export const notFounderrorHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  console.log(error);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    res.json({
      message: err,
    });
  }
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  console.log("error handler", err.message);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
};

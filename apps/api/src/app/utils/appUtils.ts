function sendResponse(res, code, message, data, error = undefined) {
  code = 200;
  return res.status(code).send({
    code,
    message,
    data,
    error: error && (error.message ? error.message : error),
  });
}

export { sendResponse };

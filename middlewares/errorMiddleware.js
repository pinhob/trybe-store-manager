const errorMiddleware = (err, req, res, _next) => {
  if (err.status) {
    const { status, message } = err;

    console.log(status);

    if (status === 404) {
      return res.status(status).json({ err: { code: 'not_found', message } });
    }

    return res.status(status).json({ err: { code: 'invalid_data', message } });
  }

  return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
};

module.exports = {
  errorMiddleware,
};

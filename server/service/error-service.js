let errResp = {
  status: 200,
  data: [],
  message: null
};

// Error handling
const sendError = (err, res) => {
  errResp.status = 501;
  errResp.data = [];
  errResp.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(errResp);
};

// Error handling
const clientErrorHandler = (err, req, res, next) => {
  if (res) {
    sendError(err, res);
  }
};

module.exports = clientErrorHandler;
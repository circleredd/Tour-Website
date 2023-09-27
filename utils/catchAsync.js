//if err is catched, it will pass err to next middleware - globalErrorHandler

module.exports = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next); //= .catch(err => next(err));
};

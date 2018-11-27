const unexpectedError = (res, error) => {
    console.log(error);
    res.status(500).json({
        signup: false,
        massage: 'Something went wrong. Please try again later'
    });
}

module.exports.unexpectedError = unexpectedError;
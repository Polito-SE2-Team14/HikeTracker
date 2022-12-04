exports.errorResponse = (err, code, res) => {
    console.error(err)
    return res.status(code).end(err);
}

exports.errorResponseJson = (errJson, code, res) => {
    console.error(errJson)
    return res.status(code).json({ err: errJson })
}
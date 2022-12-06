exports.errorResponse = (errJson, code, res) => {
    console.error(errJson)
    return res.status(code).json({ err: errJson })
}
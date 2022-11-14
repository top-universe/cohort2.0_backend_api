exports.ajvErrorHandler = (error) => {
    const errorObject = {};
    error.errors.map(
        (err) =>
            (errorObject[
                `${Object.keys(err.params)[0]} - ${
                    Object.values(err.params)[0]
                }`
            ] = err.message)
    );

    return errorObject;
};

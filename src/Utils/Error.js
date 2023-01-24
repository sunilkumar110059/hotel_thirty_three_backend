
const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    err.success = false;
    return err
}

const createSuccess = (status, message) => {
    const showResult = {
        status: status,
        message: message,
        success: true,
    }
    return showResult
}


export { createError, createSuccess }
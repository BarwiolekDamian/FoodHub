class Exception
{
    constructor(errorCode = null, errorMessage = null)
    {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}

export default Exception;
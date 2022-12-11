interface IError {
  response: { data: { message: string } };
}

export const ErrorHelpers = () => {
  const GetErrorMessage = (error: unknown) => {
    const {
      response: {
        data: { message },
      },
    } = error as IError;

    return message;
  };

  return {
    GetErrorMessage,
  };
};

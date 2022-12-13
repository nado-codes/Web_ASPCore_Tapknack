interface IError {
  response: { data: { message: string } };
}

export const ErrorHelpers = () => {
  const GetErrorMessage = (error: unknown) => {
    if (Object.keys(error as Error).includes("response")) {
      const {
        response: {
          data: { message },
        },
      } = error as IError;

      return message;
    }

    return (error as Error).message;
  };

  return {
    GetErrorMessage,
  };
};

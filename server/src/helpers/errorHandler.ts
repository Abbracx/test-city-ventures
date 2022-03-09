// handle errors
export const handleErrors = (err: any) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // intruder error
  if (err.message == "invalid credentials😫") {
    errors.email = "invalid email😡";
    errors.password = "invalid password😡";
    return errors;
  }


  return errors;
};

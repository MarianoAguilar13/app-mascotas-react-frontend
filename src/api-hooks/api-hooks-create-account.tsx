export const useValidateEmail = (userCreateData) => {
  // Define our regular expression.
  var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  // Using test we can check if the text match the pattern
  if (validEmail.test(userCreateData.mail)) {
    return true;
  } else {
    return false;
  }
};

export const useCheckPasswords = (userCreateData) => {
  if (userCreateData.password == userCreateData.passwordRepetida) {
    console.log("Entro al check pass");
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return "Email is required";
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    return "Please enter a valid email";
  }

  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return "Password is required";
  }

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

  if (!regex.test(password)) {
    return "Password must contain uppercase, lowercase, number and special character.";
  }

  return "";
};

export const validateUsername = (username: string): string => {
  if (!username.trim()) {
    return "Username is required";
  }

  if (username.length < 3) {
    return "Minimum 3 characters required";
  }

  if (username.length > 20) {
    return "Maximum 20 characters allowed";
  }

  const regex = /^[a-zA-Z0-9_]+$/;

  if (!regex.test(username)) {
    return "Only letters, numbers and underscore are allowed";
  }

  return "";
};
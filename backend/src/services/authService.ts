import { authRepository } from "../repositories/authRepository";

export const authService = {
  registerUser: async (username: string, password: string) => {
    // Add business logic, e.g., password hashing, validation, etc.
    return authRepository.createUser(username, password);
  },

  loginUser: async (username: string, password: string) => {
    // Add business logic, e.g., password validation, token generation, etc.
    return authRepository.authenticateUser(username, password);
  },
};

import { User } from "../models/user.model";
import { axiosInstance } from "./axios.util";

class AuthService {
  async login(
    email: string,
    password: string,
    setToken: (value: string | ((val: string) => string)) => void
  ) {
    console.log(email + password);
    const response = await axiosInstance.post("users/login", {
      email,
      password,
    });
    console.log(response);
    if (response.data.data.token) {
      setToken(response.data.data.token);
    }
    return await response.data.data.token;
  }

  logout() {
    localStorage.removeItem("token");
  }

  async signUp(userName: string, email: string, password: string) {
    console.log(userName + email + password);
    return await axiosInstance.post("users", {
      userName,
      email,
      password,
    });
  }

  async findAllUsers(token: string) {
    return (
      await axiosInstance.get<User[]>("/users", {
        headers: { authorization: `Bearer ${token}` },
      })
    ).data;
  }

  async updateUsers(
    updateRoleUsers: User[],
    token: string
  ) {
    return (
      await axiosInstance.put<User[]>(
        "/users",
        {
          updateRoleUsers: updateRoleUsers,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
    ).data;
  }

}

export default new AuthService();

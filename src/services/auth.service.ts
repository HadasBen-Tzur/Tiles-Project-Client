import { axiosInstance } from "./axios.util";

class AuthService {
  async login(
    email: string,
    password: string,
    setToken: (value: string | ((val: string) => string)) => void
  ) {
    console.log(email + password);
    const response = await axiosInstance.post("user/login", {
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
    return await axiosInstance.post("user", {
      userName,
      email,
      password,
    });
  }

  // getCurrentUser(token: string) {
  //   //const jwt = require("jsonwebtoken");
  //   //jwt.decode(myLocalStorage)
  //   // const myLocalStorage = localStorage.getItem("user");
  //   if (!token) throw new Error("Not Found Token");
  //   return JSON.parse(token);
  // }
}

export default new AuthService();

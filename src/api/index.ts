import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1337",
});

const validate = async (token: string) => {
  try {
    const response = await instance.get("/api/user/validate", {
      headers: { authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

const api = { validate };

export default api;

import http from "./http";

export const registerUser = (payload) => {
  return http.post("/api/auth/register", payload);
};

export const loginUser = (payload) => {
  return http.post("/api/auth/login", payload);
};

export const validateUser = () => {
  return http.get("/api/auth/user");
};

export const fetchHomeDetails = () => {
  return http.get("/api/homes");
};

export const fetchExtrasItemForHomeForm = () => {
  return http.get("/api/homes/extras");
};

export const addNewHome = (payload) => {
  return http.post("/api/homes", payload);
};

export const fetchExtrasDetails = () => {
  return http.get("/api/extras");
};

export const addNewExtras = (payload) => {
  return http.post("/api/extras", payload);
};

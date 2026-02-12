// export const saveAuth = (token: string, name: string) => {
//   localStorage.setItem("token", token);
//   localStorage.setItem("user", name);
// };

// export const getToken = () => {
//   return localStorage.getItem("token");
// };

// export const getUser = () => {
//   return localStorage.getItem("user");
// };

// export const logout = () => {
//   localStorage.clear();
// };


export const saveAuth = (token: string, name: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", name);
};

export const getUser = () =>
  localStorage.getItem("user");

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

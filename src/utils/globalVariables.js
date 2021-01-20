const isAuth = () => {
  return sessionStorage.getItem("account") ? true : false;
};
const setAuth = (data) => {
  return sessionStorage.setItem("account", JSON.stringify(data));
};
const setData = (data) => {
  return sessionStorage.setItem("data", JSON.stringify(data));
};
const getData = () => {
  return JSON.parse(sessionStorage.getItem("data"));
};
const getAccount = () => {
  return JSON.parse(sessionStorage.getItem("account"));
};
const closeSesion = () => {
  return sessionStorage.clear();
};
export { isAuth, setAuth, setData, getData, getAccount, closeSesion };

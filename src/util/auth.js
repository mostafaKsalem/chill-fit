import { redirect } from "react-router-dom";
import { auth } from "../firebase";

export function isUserAuthLoader() {
  const isAuth = localStorage.getItem("uId");
  return isAuth;
}

export function checkIsUserAuth() {
  const isUserAuth = getUserId();
  if (!isUserAuth) {
    return redirect("/auth/login");
  }
}

export  function getUserId() {
  const uId =  auth.currentUser?.uid;
  return uId;
}

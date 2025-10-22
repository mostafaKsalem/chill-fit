import { Outlet } from "react-router-dom";


function AuthRoot({ children }) {
  return (
    <div>
      {children}
      <Outlet />
    </div>
  );
}

export default AuthRoot;

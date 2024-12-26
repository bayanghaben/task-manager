import { Routes, Route } from "react-router-dom";
import routes from "./routes";

const AppRoutes = () => (
  <Routes>
    {routes.map((route) => {
      const { path, component: Component } = route;

      return <Route key={path} path={path} element={<Component />} />;
    })}
  </Routes>
);

export default AppRoutes;

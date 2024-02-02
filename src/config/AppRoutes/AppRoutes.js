import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../../pages';

const routes = [
  { path: '/', element: <Home />, exact: true },
  // Add more routes as needed
  // { path: '/account/login', element: <Login /> },
  // { path: '/account/register', element: <Register /> },
];

const AppRoutes = () => (
  <Router>
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
          exact={route.exact}
        />
      ))}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  </Router>
);

export default AppRoutes;

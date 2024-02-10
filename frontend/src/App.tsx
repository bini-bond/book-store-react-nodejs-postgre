import "./App.css";
import React, {useEffect} from "react";
import { BrowserRouter, Route, Switch, useHistory, Redirect, RouteProps } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import BookOrderList from "./pages/OrderList";
interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

function App() {

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const history = useHistory();
  
    useEffect(() => {
      // Check if a token exists in local storage
      const token = localStorage.getItem('token');
      
      // Redirect to login if no token is found
      if (!token) {
        history.push('/login');
      }
    }, [history]);
  
    return (
      <Route
        {...rest}
        render={(props) => (
          localStorage.getItem('token') ? (
            <div>
              <Component {...props} />
            </div>
          ) : (
            <Redirect to="/login" />
          )
        )}
      />
    );
  };
  return (
    <div className="App">
      {/* <Header title={"Book Store"}></Header>
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="orders" element={<BookOrderList />} />

        </Route>
      </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route>
          {/* Render Header for all routes except /login */}
          <div>
            <Header title="Book Store" />
            <Switch>
              <PrivateRoute component={Home} path={"/"}></PrivateRoute>
              <PrivateRoute component={BookOrderList} path={"/orders"}></PrivateRoute>
            </Switch>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;

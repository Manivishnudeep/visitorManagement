import Signup from "./components/Auth/Signup";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Employees from "./components/Employees";
import Security from "./components/Security/Security";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} /> 
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/employees' element={<Employees />} />
          <Route exact path='/security' element={<Security />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

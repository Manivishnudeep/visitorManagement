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
import Approver from "./components/Approver/Approver"

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
          <Route exact path='/approver' element={<Approver />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

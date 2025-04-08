import Navbar from './componemts/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mssg from './componemts/Mssg';
import LivemssgState from './context/Livemssgstate';
import Msgfront from './componemts/Msgfront';
import Login from './componemts/Login';
import Signup from './componemts/Signup';
import { Navigate } from 'react-router-dom';
import About from './componemts/About';
import Create from './componemts/create';
import Livegrpstate from './context/Livegrpstate';
import Grpfrt from './componemts/grpfrt';
import Grpmssg from './componemts/grpmssg';

function App() {

  const isAuthenticated = () => !!localStorage.getItem("token");

  const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
  };


  return (
   <div>
    <Livegrpstate>
    <LivemssgState>
    <Router>
      <Navbar/>
      <Routes>
            <Route path="/" element={<ProtectedRoute><Msgfront /></ProtectedRoute>} />
            <Route path="/musg" element={<ProtectedRoute><Mssg /></ProtectedRoute>} />
            <Route path="/crgrp" element={<ProtectedRoute><Create /></ProtectedRoute>} />
            <Route path="/grpfrt" element={<ProtectedRoute><Grpfrt /></ProtectedRoute>} />
            <Route path="/grpmssg" element={<ProtectedRoute><Grpmssg /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </LivemssgState>
    </Livegrpstate>
   </div>
  );
}

export default App;

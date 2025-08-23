import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Discover from "./pages/Discover";
import Connections from "./pages/Connections";
import { useUser } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  const { user } = useUser();

  return (
    <>
      <Toaster/>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="/login" element={user ? <Dashboard /> : <Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/messages/:userId" element={<Login />} />
          <Route path="/connections" element={<Connections />} />
        </Routes>
     
    </>
  );
}

export default App;

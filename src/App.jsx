import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import NavBar from "./components/Navbar";
import ArtworkDetail from "./pages/ArtworkDetail"
import Collection from "./pages/collection";

const App = () => {
  return (
    <>
     <NavBar />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div>
          <Routes>
            <Route element={<AuthRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Collection" element={<Collection />} />
            <Route path="/artwork/:artworkId" element={<ArtworkDetail />} />
          </Routes>
        </div>
      </Container>
    </>
  );
};

export default App;
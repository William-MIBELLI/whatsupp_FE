import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import UnLoggedRoute from "./routes/protected-route/unLoggedRoute";
import LoggedRoute from "./routes/protected-route/loggedRoute";
import { io } from "socket.io-client";
import { createContext } from "react";

const socket = new io(process.env.REACT_APP_API_ENDPOINT);
export const SocketContext = createContext(null);

function App() {
    //console.log("render APP");

    return (
        <SocketContext.Provider value={{ socket }}>
            <div className="App">
                <Routes>
                    <Route element={<LoggedRoute />}>
                        <Route index path="/" element={<Home />} />
                    </Route>
                    <Route element={<UnLoggedRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route element={<LoggedRoute />}></Route>
                </Routes>
            </div>
        </SocketContext.Provider>
    );
}

export default App;

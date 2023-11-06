import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import UnLoggedRoute from "./routes/protected-route/unLoggedRoute";
import LoggedRoute from "./routes/protected-route/loggedRoute";
import { io } from "socket.io-client";
import { createContext, useEffect } from "react";
import Settings from "./routes/settings/settings";
import HomeDefault from "./components/home-default/homeDefault";
import ChatContainer from "./components/chat/chat-container/chatContainer";
import { useDispatch } from "react-redux";
import { logoutOutUser } from "./store/user/user.action";

const socket = new io(process.env.REACT_APP_API_ENDPOINT);
export const SocketContext = createContext(null);

function App() {

    const dispatch = useDispatch()
    
    //Si luser veut back quand il est sur Home, on le logout
    useEffect(() => {
        window.addEventListener('popstate', (data) => {
            console.log('data dans window listenner ', data)
            if (data.target.location.pathname === '/' || data.target.location.pathname === '') {    
                dispatch(logoutOutUser())
            }
        })
    })

    return (
        <SocketContext.Provider value={{ socket }}>
            <div className="App">
                <Routes>
                    <Route element={<LoggedRoute />}>
                        <Route path="/" element={<Home />} >
                            <Route index path="home" element={<HomeDefault/> } />
                            <Route path="conversation" element={<ChatContainer/> } />
                            <Route path="settings" element={<Settings />} />
                        </Route>
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

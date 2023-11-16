import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import UnLoggedRoute from "./routes/protected-route/unLoggedRoute";
import LoggedRoute from "./routes/protected-route/loggedRoute";
import { io } from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import Settings from "./routes/settings/settings";
import HomeDefault from "./components/home-default/homeDefault";
import ChatContainer from "./components/chat/chat-container/chatContainer";
import { useDispatch } from "react-redux";
import { logoutOutUser } from "./store/user/user.action";
import ForgetPassword from "./routes/forget-password/forgetPassword";
import ResetPassword from "./routes/reset-password/resetPassword";
import ChangePassword from "./routes/change-password/changePassword";
import DeleteAccount from "./routes/delete-accound/deleteAccount";
import { ThemeProvider } from "styled-components";
import { globalTheme } from "./utils/theme";


//  !!!!!!!! TODO start socket dans home, ca permettra de le kill plus proprement
const socket = new io(process.env.REACT_APP_API_ENDPOINT);
export const SocketContext = createContext(null);
export const SelectThemeContext = createContext(false)

function App() {

    const dispatch = useDispatch()
    const [theme, setTheme] = useState(false)
    
    //Si luser veut back quand il est sur Home, on le logout
    useEffect(() => {
        window.addEventListener('popstate', (data) => {
            if (data.target.location.pathname === '/' || data.target.location.pathname === '') {    
                dispatch(logoutOutUser())
            }
        })
    })

    return (
        <SocketContext.Provider value={{ socket }}>
            <SelectThemeContext.Provider value={{theme, setTheme}}>
                <ThemeProvider theme={ !theme ? globalTheme.dark : globalTheme.light}>
                    <div className="App">
                        <Routes>
                            <Route element={<LoggedRoute />}>
                                <Route path="/" element={<Home />} >
                                    <Route index path="home" element={<HomeDefault/> } />
                                    <Route path="conversation" element={<ChatContainer/> } />
                                    <Route path="settings" element={<Settings />} />
                                    <Route path="change-password" element={<ChangePassword />} />
                                    <Route path="delete-account" element={<DeleteAccount/> } />
                                </Route>
                            </Route>
                            <Route element={<UnLoggedRoute />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/forget-password" element={<ForgetPassword/> } />
                                <Route path="/reset-password/:token" element={<ResetPassword/> } />
                            </Route>
                            <Route element={<LoggedRoute />}></Route>
                        </Routes>
                    </div>
                </ThemeProvider>
            </SelectThemeContext.Provider>
        </SocketContext.Provider>
    );
}

export default App;

import './styles/app.scss'
import {Navigate, createBrowserRouter, RouterProvider} from "react-router-dom";

import SettingBar from "./components/SettingBar";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";

const StartPage = () => {
    return (
        <>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </>
    )
}

const router = createBrowserRouter([
    {
        path: "/:id",
        element: <StartPage/>
    },
    {
        path: "*",
        element: <Navigate to={`${Math.floor(Math.random() * (10000000 - 0 + 1)) + 0}`}/>
    }
])

function App() {
    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;

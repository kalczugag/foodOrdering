import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <div className="container mx-auto">
            <Header />
            <div>
                <Routes>
                    <Route index />
                    <Route />
                    <Route />
                    <Route />
                    <Route />
                    <Route />
                </Routes>
            </div>
        </div>
    );
};

export default App;

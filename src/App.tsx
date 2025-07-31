import { Routes, Route, Outlet } from "react-router-dom";
import { StoreProvider } from "easy-peasy";

import { Home, Trash, Words } from "./pages";
import { Sidebar, Navbar } from "./components";
import MobileSidebar from "./components/MobileSidebar";

import store from "./store";
function Layout() {
    return (
        <div className="relative w-full h-full flex flex-col md:flex-row">
            <MobileSidebar />
            <div className="w-1/5 h-screen bg-white sticky top-0 hidden lg:block">
                <Sidebar />
            </div>

            <div className="flex-1 overflow-y-auto">
                <Navbar />
                <div className="p-4 2xl:px-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <StoreProvider store={store}>
            <main className="w-full min-h-screen bg-[#f3f4f6]">
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/trash" element={<Trash />} />
                        <Route path="/words" element={<Words />} />
                    </Route>
                </Routes>
            </main>
        </StoreProvider>
    );
}

export default App;

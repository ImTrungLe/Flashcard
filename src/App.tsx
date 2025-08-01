import { Routes, Route, Outlet } from "react-router-dom";
import { StoreProvider } from "easy-peasy";

import { Home, Trash, Words, PageNotFound } from "./pages";
import { Sidebar, Navbar } from "./components";
import MobileSidebar from "./components/MobileSidebar";

import store from "./store";
import { ThemeProvider } from "./context/ThemeContext";
function Layout() {
    return (
        <div className="relative w-full h-full flex flex-col md:flex-row bg-gray-50 dark:bg-[#0a0c10] text-gray-800 dark:text-gray-200">
            <MobileSidebar />
            <div className="w-1/5 h-screen bg-white dark:bg-[#1a1f2c] sticky top-0 hidden lg:block">
                <Sidebar />
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0f1117]">
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
            <ThemeProvider>
                <main className="transition-colors w-full min-h-screen bg-gray-50 dark:bg-[#0a0c10] text-gray-800 dark:text-gray-200">
                    <Routes>
                        <Route element={<Layout />}>
                            <Route index element={<Home />} />
                            {/* <Route path="/trash" element={<Trash />} /> */}
                            <Route path="/words" element={<Words />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </main>
            </ThemeProvider>
        </StoreProvider>
    );
}

export default App;

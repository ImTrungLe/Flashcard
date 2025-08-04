export default function PageNotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 dark:text-white dark:bg-[#0a0c10]">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6">Page Not Found</p>
            <div className="p-3 rounded-xl border-[0.5px] bg-neutral-200 dark:bg-[#1f2937]">
                <a
                    href="/"
                    className="text-gray-800 dark:text-white hover:text-blue-800 transition dark:hover:text-[#2d6f6a]"
                >
                    Go back home
                </a>
            </div>
        </div>
    );
}

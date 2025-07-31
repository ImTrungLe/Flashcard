import { useStoreState } from "easy-peasy";
import { BarChart } from "../components";

const Home = () => {
    const initialData = useStoreState((state) => state.words);
    const dataSample = initialData.reduce((acc, item) => {
        acc[item.stage] = (acc[item.stage] || 0) + 1;
        return acc;
    }, {});
    const summary = {
        totalWords: initialData.length,
        last10Words: initialData.slice(-10),
        words: dataSample,
    };
    const totals = summary.words;
    const stats = [
        {
            _id: "1",
            label: "TOTAL WORDS",
            total: summary.totalWords || 0,
            bg: "bg-[#1d4ed8]",
        },
        {
            _id: "2",
            label: "NEW WORDS",
            total: totals["new"] || 0,
            bg: "bg-[#0f766e]",
        },
        {
            _id: "3",
            label: "LEARNING WORDS",
            total: totals["learning"] || 0,
            bg: "bg-[#f59e0b]",
        },
        {
            _id: "4",
            label: "DONE",
            total: totals["done"] || 0,
            bg: "bg-[#be185d]",
        },
    ];

    const Card = ({ label, count }) => {
        return (
            <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
                <div className="h-full flex flex-1 flex-col justify-between">
                    <p className="test-base text-gray-600">{label}</p>
                    <span className="text-2xl font-semibold">{count}</span>
                    <span className="text-sm text-gray-400">
                        {"last month"}
                    </span>
                </div>
            </div>
        );
    };

    const data = {
        labels: ["New Words", "Learning Words", "Done"],
        datasets: [
            {
                label: "Stage",
                data: [totals["new"], totals["learning"], totals["done"]],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderRadius: 4,
            },
        ],
    };

    return (
        <div className="h-full py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {stats.map(({ label, total }, index) => {
                    return <Card key={index} label={label} count={total} />;
                })}
            </div>

            <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
                <h4 className="text-xl text-gray-600 font-semibold">
                    Chart by stage
                </h4>
                <BarChart data={data} />
            </div>
        </div>
    );
};

export default Home;

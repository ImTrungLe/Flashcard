import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top" as const,
        },
        tooltip: {
            enabled: true,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const BarChart = ({ data }) => {
    return (
        <div className="h-[490px]">
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;

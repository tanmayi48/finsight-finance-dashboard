import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function MonthlyChart({ monthlyData }) {
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const data = {
        labels: monthlyData.map(
            (item) =>
                `${monthNames[item.month - 1]} ${item.year}`
        ),

        datasets: [
            {
                label: "Income",

                data: monthlyData.map(
                    (item) => item.income
                ),

                backgroundColor: "#16a34a",

                borderRadius: 6
            },

            {
                label: "Expenses",

                data: monthlyData.map(
                    (item) => item.expense
                ),

                backgroundColor: "#dc2626",

                borderRadius: 6
            }
        ]
    };

    const options = {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "bottom"
            },

            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ₹${context.raw.toFixed(
                            2
                        )}`;
                    }
                }
            }
        },

        scales: {
            y: {
                beginAtZero: true,

                ticks: {
                    callback: function (value) {
                        return `₹${value}`;
                    }
                }
            }
        }
    };

    return (
        <div className="chart-card">
            <h2>Monthly Financial Trend</h2>

            <p>
                Compare your monthly income and expenses.
            </p>

            {monthlyData.length === 0 ? (
                <div className="chart-empty">
                    No monthly data available.
                </div>
            ) : (
                <div className="chart-container">
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>
            )}
        </div>
    );
}

export default MonthlyChart;
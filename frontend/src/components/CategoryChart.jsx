import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function CategoryChart({ categoryData }) {
    const chartColors = [
        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#dc2626",
        "#9333ea",
        "#0891b2",
        "#ea580c",
        "#db2777"
    ];

    const data = {
        labels: categoryData.map(
            (item) => item.category
        ),

        datasets: [
            {
                label: "Expenses",

                data: categoryData.map(
                    (item) => item.total
                ),

                backgroundColor: categoryData.map(
                    (_, index) =>
                        chartColors[
                            index % chartColors.length
                        ]
                ),

                borderColor: "#ffffff",

                borderWidth: 3
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
                        return `${context.label}: ₹${context.raw.toFixed(
                            2
                        )}`;
                    }
                }
            }
        }
    };

    return (
        <div className="chart-card">
            <h2>Expense Distribution</h2>

            <p>
                Category-wise distribution of your expenses.
            </p>

            {categoryData.length === 0 ? (
                <div className="chart-empty">
                    No expense data available.
                </div>
            ) : (
                <div className="chart-container doughnut-chart">
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </div>
            )}
        </div>
    );
}

export default CategoryChart;
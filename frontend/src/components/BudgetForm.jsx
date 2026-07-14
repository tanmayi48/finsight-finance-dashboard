import { useState } from "react";

import api from "../services/api";

function BudgetForm({ onBudgetAdded }) {
    const currentDate = new Date();

    const [category, setCategory] = useState("Food");

    const [limit, setLimit] = useState("");

    const [month, setMonth] = useState(
        currentDate.getMonth() + 1
    );

    const [year, setYear] = useState(
        currentDate.getFullYear()
    );

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const categories = [
        "Food",
        "Bills",
        "Transport",
        "Health",
        "Entertainment",
        "Shopping",
        "Education",
        "Other"
    ];

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        try {
            const response = await api.post(
                "/budgets",
                {
                    category,
                    limit: Number(limit),
                    month: Number(month),
                    year: Number(year)
                }
            );

            setSuccess(
                response.data.message ||
                    "Budget saved successfully"
            );

            setLimit("");

            if (onBudgetAdded) {
                await onBudgetAdded();
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to save budget"
            );
        }
    };

    return (
        <div className="form-card budget-form-card">
            <div className="budget-form-header">
                <h2>Create Monthly Budget</h2>

                <p>
                    Set a spending limit for a category.
                </p>
            </div>

            {success && (
                <div className="success-message">
                    {success}
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form
                className="budget-form"
                onSubmit={handleSubmit}
            >
                <div className="budget-form-group">
                    <label htmlFor="budget-category">
                        Category
                    </label>

                    <select
                        id="budget-category"
                        value={category}
                        onChange={(event) =>
                            setCategory(
                                event.target.value
                            )
                        }
                    >
                        {categories.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="budget-form-group">
                    <label htmlFor="budget-limit">
                        Budget Limit
                    </label>

                    <input
                        id="budget-limit"
                        type="number"
                        placeholder="Example: 5000"
                        value={limit}
                        onChange={(event) =>
                            setLimit(
                                event.target.value
                            )
                        }
                        min="1"
                        required
                    />
                </div>

                <div className="budget-form-row">
                    <div className="budget-form-group">
                        <label htmlFor="budget-month">
                            Month
                        </label>

                        <select
                            id="budget-month"
                            value={month}
                            onChange={(event) =>
                                setMonth(
                                    event.target.value
                                )
                            }
                        >
                            {months.map(
                                (
                                    monthName,
                                    index
                                ) => (
                                    <option
                                        key={monthName}
                                        value={index + 1}
                                    >
                                        {monthName}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="budget-form-group">
                        <label htmlFor="budget-year">
                            Year
                        </label>

                        <input
                            id="budget-year"
                            type="number"
                            value={year}
                            onChange={(event) =>
                                setYear(
                                    event.target.value
                                )
                            }
                            min="2020"
                            required
                        />
                    </div>
                </div>

                <button
                    className="budget-submit-button"
                    type="submit"
                >
                    Save Budget
                </button>
            </form>
        </div>
    );
}

export default BudgetForm;
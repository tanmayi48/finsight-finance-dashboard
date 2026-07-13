import { useState } from "react";

import api from "../services/api";

function BudgetForm({ onBudgetAdded }) {
    const currentDate = new Date();

    const [formData, setFormData] = useState({
        category: "Food",
        limit: "",
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear()
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await api.post("/budgets", {
                category: formData.category,
                limit: Number(formData.limit),
                month: Number(formData.month),
                year: Number(formData.year)
            });

            setFormData({
                ...formData,
                limit: ""
            });

            onBudgetAdded();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to create budget"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="budget-form-card">
            <h2>Create Monthly Budget</h2>

            <p className="form-description">
                Set a spending limit for a category.
            </p>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category</label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="Food">
                            Food
                        </option>

                        <option value="Transport">
                            Transport
                        </option>

                        <option value="Entertainment">
                            Entertainment
                        </option>

                        <option value="Shopping">
                            Shopping
                        </option>

                        <option value="Bills">
                            Bills
                        </option>

                        <option value="Health">
                            Health
                        </option>

                        <option value="Education">
                            Education
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Budget Limit</label>

                    <input
                        type="number"
                        name="limit"
                        value={formData.limit}
                        onChange={handleChange}
                        placeholder="Example: 5000"
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>

                <div className="budget-date-grid">
                    <div className="form-group">
                        <label>Month</label>

                        <select
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                        >
                            <option value="1">
                                January
                            </option>
                            <option value="2">
                                February
                            </option>
                            <option value="3">
                                March
                            </option>
                            <option value="4">
                                April
                            </option>
                            <option value="5">
                                May
                            </option>
                            <option value="6">
                                June
                            </option>
                            <option value="7">
                                July
                            </option>
                            <option value="8">
                                August
                            </option>
                            <option value="9">
                                September
                            </option>
                            <option value="10">
                                October
                            </option>
                            <option value="11">
                                November
                            </option>
                            <option value="12">
                                December
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Year</label>

                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            min="2000"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="primary-button"
                    disabled={loading}
                >
                    {loading
                        ? "Creating Budget..."
                        : "Create Budget"}
                </button>
            </form>
        </div>
    );
}

export default BudgetForm;
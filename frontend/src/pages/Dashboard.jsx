import {
    useCallback,
    useEffect,
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";
import CategoryChart from "../components/CategoryChart";
import MonthlyChart from "../components/MonthlyChart";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import InsightCards from "../components/InsightCards";
import PredictionCard from "../components/PredictionCard";

import api from "../services/api";

function Dashboard() {
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [insights, setInsights] = useState([]);
    const [prediction, setPrediction] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await api.get(
                "/transactions"
            );

            setTransactions(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to load transactions"
            );
        }
    }, []);
    const fetchPrediction = useCallback(async () => {
    try {
        const response = await api.get(
            "/predictions/expenses"
        );

        setPrediction(response.data);
    } catch (error) {
        setError(
            error.response?.data?.message ||
                "Failed to load expense prediction"
        );
    }
}, []);

    const fetchBudgets = useCallback(async () => {
        try {
            const response = await api.get("/budgets");

            setBudgets(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to load budgets"
            );
        }
    }, []);

    const fetchAnalytics = useCallback(async () => {
        try {
            const [
                categoryResponse,
                monthlyResponse
            ] = await Promise.all([
                api.get("/analytics/categories"),
                api.get("/analytics/monthly")
            ]);

            setCategoryData(categoryResponse.data);
            setMonthlyData(monthlyResponse.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    "Failed to load analytics"
            );
        }
    }, []);
    const fetchInsights = useCallback(async () => {
    try {
        const response = await api.get("/insights");

        setInsights(response.data);
    } catch (error) {
        setError(
            error.response?.data?.message ||
                "Failed to load insights"
        );
    }
}, []);

    const loadDashboard = useCallback(async () => {
        setLoading(true);
        setError("");

        await Promise.all([
    fetchTransactions(),
    fetchBudgets(),
    fetchAnalytics(),
    fetchInsights(),
    fetchPrediction()
]);

        setLoading(false);
    }, [
        fetchTransactions,
        fetchBudgets,
        fetchAnalytics
    ]);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    const refreshAfterTransaction =
    useCallback(async () => {
        await Promise.all([
            fetchTransactions(),
            fetchBudgets(),
            fetchAnalytics(),
            fetchInsights(),
            fetchPrediction()
        ]);
    }, [
        fetchTransactions,
        fetchBudgets,
        fetchAnalytics,
        fetchInsights,
        fetchPrediction
    ]);
    const refreshAfterBudget =
    useCallback(async () => {
        await Promise.all([
            fetchBudgets(),
            fetchInsights()
        ]);
    }, [fetchBudgets, fetchInsights]);

    const totalIncome = transactions
        .filter(
            (transaction) =>
                transaction.type === "income"
        )
        .reduce(
            (total, transaction) =>
                total + transaction.amount,
            0
        );

    const totalExpenses = transactions
        .filter(
            (transaction) =>
                transaction.type === "expense"
        )
        .reduce(
            (total, transaction) =>
                total + transaction.amount,
            0
        );

    const balance = totalIncome - totalExpenses;

    const handleLogout = () => {
        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
    <div className="brand-container">
        <div className="brand-logo">
            ↗
        </div>

        <div className="brand-text">
            <h1 className="finsight-title">
                FinSight
            </h1>

            <p className="finsight-tagline">
                Intelligent Personal Finance Dashboard
            </p>
        </div>
    </div>

    <button
        className="logout-button"
        onClick={handleLogout}
    >
        Logout
    </button>
</header>

            <main className="dashboard-content">
                <div className="dashboard-title">
                    <h2>Financial Overview</h2>

                    <p>
                        Track your income, expenses, budgets
                        and financial trends.
                    </p>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {loading ? (
                    <p>Loading dashboard...</p>
                ) : (
                    <>
                        <SummaryCards
                            totalIncome={totalIncome}
                            totalExpenses={totalExpenses}
                            balance={balance}
                        />
                        <InsightCards insights={insights} />
                        <PredictionCard prediction={prediction} />

                        <div className="analytics-grid">
                            <CategoryChart
                                categoryData={categoryData}
                            />

                            <MonthlyChart
                                monthlyData={monthlyData}
                            />
                        </div>

                        <div className="dashboard-grid">
                            <TransactionForm
                                onTransactionAdded={
                                    refreshAfterTransaction
                                }
                            />

                           <BudgetForm
    onBudgetAdded={refreshAfterBudget}
/>
                        </div>

                       

                        <TransactionList
                            transactions={transactions}
                            onTransactionDeleted={
                                refreshAfterTransaction
                            }
                        />
                    </>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
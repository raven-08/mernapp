import axios from "axios";

// Dynamically set the API URL based on the environment
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/goals/";

// Create new goal
const createGoal = async (goalData, token) => {
	try {
		console.log("Goal Data Sent:", goalData); // Log input
		const response = await axios.post(API_URL, goalData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("API Response:", response.data); // Log response
		return response.data; // Ensure this is the created goal
	} catch (error) {
		console.error("Error creating goal:", error.response?.data || error.message);
		throw error;
	}
};

// Get user goals
const getGoals = async (token) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await axios.get(API_URL, config);
		console.log("Fetched Goals:", response.data); // Log goals
		return response.data;
	} catch (error) {
		console.error("Error fetching goals:", error.response?.data || error.message);
		throw error;
	}
};

// Delete user goal
const deleteGoal = async (goalId, token) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await axios.delete(`${API_URL}${goalId}`, config);
		console.log("Deleted Goal:", response.data); // Log deleted goal
		return response.data;
	} catch (error) {
		console.error("Error deleting goal:", error.response?.data || error.message);
		throw error;
	}
};

const goalService = {
	createGoal,
	getGoals,
	deleteGoal,
};

export default goalService;

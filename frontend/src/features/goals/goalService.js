import axios from "axios";

const API_URL = "https://mernapp-server-0zza.onrender.com/api/goals/";


// Create new goal
const createGoal = async (goalData, token) => {
	console.log("Goal Data Sent:", goalData); // Log input
	const response = await axios.post("/api/goals", goalData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	console.log("API Response:", response.data); // Log response
	return response.data; // Ensure this is the created goal
};

// Get user goals
const getGoals = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

// Delete user goal
const deleteGoal = async (goalId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + goalId, config);

	return response.data;
};

const goalService = {
	createGoal,
	getGoals,
	deleteGoal,
};

export default goalService;

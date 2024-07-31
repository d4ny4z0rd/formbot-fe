import axios from "axios";

const BACKEND_ORIGIN_URL = "https://formbot-be.vercel.app/api/v1";

const saveForm = async (formDetails) => {
	const token = localStorage.getItem("token");
	if (!token) {
		throw new Error("No token found, please log in again.");
	}
	try {
		const response = await axios.post(
			`${BACKEND_ORIGIN_URL}/form/saveform`,
			formDetails,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error saving form:", error);
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error("An unknown error occurred");
		}
	}
};

const updateForm = async (formId, formDetails) => {
	const token = localStorage.getItem("token");
	if (!token) {
		throw new Error("No token found, please log in again.");
	}
	try {
		const response = await axios.put(
			`${BACKEND_ORIGIN_URL}/form/updateform/${formId}`,
			formDetails,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error updating form:", error);
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error("An unknown error occurred");
		}
	}
};

const getformbyusers = async (userId) => {
	try {
		const response = await axios.get(
			`${BACKEND_ORIGIN_URL}/form/user/${userId}`
		);
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error("An unknown error occurred");
		}
	}
};

const fetchFormById = async (formId) => {
	try {
		const response = await axios.get(
			`${BACKEND_ORIGIN_URL}/form/fetchform/${formId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching form:", error);
		throw error;
	}
};

const fetchFormByUniqueUrl = async (uniqueUrl) => {
	try {
		console.log(`Fetching form with uniqueUrl: ${uniqueUrl}`);
		const response = await axios.get(
			`${BACKEND_ORIGIN_URL}/form/fetchByUniqueUrl/${uniqueUrl}`
		);
		console.log("Response from fetchFormByUniqueUrl:", response);
		return response.data;
	} catch (error) {
		console.error("Error fetching form:", error);
		throw error;
	}
};

const getFormsByFolder = async (folderId) => {
	try {
		const response = await axios.get(
			`${BACKEND_ORIGIN_URL}/form/folder/${folderId}`
		);
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error("An unknown error occurred");
		}
	}
};

const saveFormResponse = async (uniqueUrl, response) => {
	try {
		const res = await axios.post(
			`${BACKEND_ORIGIN_URL}/responses/saveResponse/${uniqueUrl}`,
			response
		);
		return res.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error("Error while saveFormResponse");
		}
	}
};

const fetchFormResponses = async (formId) => {
	try {
		const response = await axios.get(
			`${BACKEND_ORIGIN_URL}/responses/form/${formId}/responses`
		);
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error("Error while fetching responses");
		}
	}
};

const updateFormTheme = async (formId, theme) => {
	const token = localStorage.getItem("token");
	if (!token) {
		throw new Error("No token found, please log in again.");
	}
	try {
		const response = await axios.put(
			`${BACKEND_ORIGIN_URL}/form/updateTheme/${formId}`,
			{ theme },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error updating theme:", error);
		throw error;
	}
};

const deleteForm = async (formId) => {
	const token = localStorage.getItem("token");
	if (!token) {
		throw new Error("No token found, please log in again.");
	}
	try {
		const response = await axios.delete(
			`${BACKEND_ORIGIN_URL}/form/deleteform/${formId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error deleting form:", error);
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error("An unknown error occurred");
		}
	}
};

const updateViewCount = async (formId) => {
	try {
		await axios.get(`/forms/${formId}`);
	} catch (error) {
		console.error("Error updating view count", error);
	}
};

export {
	saveForm,
	updateForm,
	getformbyusers,
	fetchFormById,
	fetchFormByUniqueUrl,
	getFormsByFolder,
	saveFormResponse,
	fetchFormResponses,
	updateFormTheme,
	deleteForm,
	updateViewCount,
};

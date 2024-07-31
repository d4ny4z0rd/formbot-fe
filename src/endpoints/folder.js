import axios from "axios";

const BACKEND_ORIGIN_URL = "https://formbot-be.vercel.app/api/v1";

const createFolder = async (foldername, userId) => {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("No token found, please log in again.");
	}

	try {
		const response = await axios.post(
			`${BACKEND_ORIGIN_URL}/folder/createfolder/${userId}`,
			{ foldername },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
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

const deleteFolder = async (folderId) => {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("No token found, please log in again.");
	}

	try {
		const response = await axios.delete(
			`${BACKEND_ORIGIN_URL}/folder/deletefolder/${folderId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
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

export { createFolder, deleteFolder };

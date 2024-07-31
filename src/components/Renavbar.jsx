import React, { useState, useEffect } from "react";
import styles from "./Renavbar.module.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Renavbar = ({
	currentPage,
	formName = "",
	setFormName,
	handleSave,
	handleShare,
	uniqueUrl,
	showFormNameInput,
	hasBubblesOrInputs,
}) => {
	const navigate = useNavigate();
	const { userId, formId, folderId } = useParams();
	const [showError, setShowError] = useState(false);
	const [isShareActive, setIsShareActive] = useState(false);

	useEffect(() => {
		console.log("Params: ", { userId, formId, folderId, uniqueUrl });
		if (uniqueUrl) {
			setIsShareActive(true);
		}
	}, [userId, formId, folderId, uniqueUrl]);

	const handleTabClick = (tab) => {
		let path = "";
		switch (tab) {
			case "theme":
				path = folderId
					? `/theme/${userId}/${folderId}/${formId}`
					: `/theme/${userId}/${formId}`;
				break;
			case "response":
				path = folderId
					? `/response/${userId}/${folderId}/${formId}`
					: `/response/${userId}/${formId}`;
				break;
			default:
				path = folderId
					? `/form/${userId}/${folderId}/${formId}`
					: `/form/${userId}/${formId}`;
				break;
		}
		navigate(path);
	};

	const handleSaveClick = () => {
		if (showFormNameInput && !formName.trim()) {
			setShowError(true);
			toast.error("Form name is required.");
			return;
		}
		setShowError(false);
		handleSave();
	};

	const handleShareClick = async () => {
		if (showFormNameInput && !formName.trim()) {
			setShowError(true);
			toast.error("Form name is required.");
			return;
		}
		setShowError(false);

		console.log("handleShareClick executed");

		try {
			await handleShare();
			console.log("handleShare executed successfully");
			const shareUrl = `${window.location.origin}/form/${uniqueUrl}`;
			console.log("Generated share URL:", shareUrl);
			navigator.clipboard.writeText(shareUrl);
			toast.success("Form link copied to clipboard");
			setIsShareActive(true);
		} catch (error) {
			console.error("Error sharing form", error.message);
			toast.error(`Error sharing form: ${error.message}`);
		}
	};

	const handleCloseClick = () => {
		navigate(`/dashboard/${userId}`);
	};

	return (
		<div className={`${styles.renavbar} open-sans`}>
			{showFormNameInput && (
				<>
					<input
						className={`${styles.input} ${showError ? styles.error : ""}`}
						type="text"
						value={formName}
						onChange={(e) => setFormName(e.target.value)}
						placeholder="Enter form name"
					/>
					{showError && (
						<span className={styles.errorMessage}>This field is required</span>
					)}
				</>
			)}
			<div className={styles.centerButtons}>
				<button
					className={`${styles.tabButton} ${
						currentPage === "form" ? styles.activeTab : ""
					}`}
					onClick={() => handleTabClick("form")}>
					Flow
				</button>
				<button
					className={`${styles.tabButton} ${
						currentPage === "theme" ? styles.activeTab : ""
					}`}
					onClick={() => handleTabClick("theme")}>
					Theme
				</button>
				<button
					className={`${styles.tabButton} ${
						currentPage === "response" ? styles.activeTab : ""
					}`}
					onClick={() => handleTabClick("response")}>
					Response
				</button>
			</div>
			<div className={styles.rightButtons}>
				<button
					className={`${styles.actionButton} ${
						isShareActive ? styles.shareActive : ""
					}`}
					onClick={handleShareClick}
					disabled={!hasBubblesOrInputs}>
					Share
				</button>
				<button
					className={styles.saveButton}
					onClick={handleSaveClick}
					disabled={!hasBubblesOrInputs}>
					Save
				</button>
				<button className={styles.closeButton} onClick={handleCloseClick}>
					X
				</button>
			</div>
		</div>
	);
};

export default Renavbar;

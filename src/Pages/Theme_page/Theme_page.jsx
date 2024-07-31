import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Renavbar from "../../components/Renavbar";
import ThemeSidebar from "./ThemeSidebar";
import ThemePreview from "./ThemePreview";
import { updateFormTheme, fetchFormById } from "../../endpoints/form";
import toast from "react-hot-toast";
import styles from "../Theme_page/Theme_page.module.css";

const ThemePage = () => {
	const { formId } = useParams();
	const [selectedTheme, setSelectedTheme] = useState("");
	const [formDetails, setFormDetails] = useState({});
	const [uniqueUrl, setUniqueUrl] = useState("");
	const [hasBubblesOrInputs, setHasBubblesOrInputs] = useState(false);

	useEffect(() => {
		const fetchFormDetails = async () => {
			try {
				console.log(`Fetching form details for formId: ${formId}`);
				const response = await fetchFormById(formId);
				console.log("Form details fetched:", response.form);
				setFormDetails(response.form);
				setSelectedTheme(response.form.theme);
				setUniqueUrl(response.form.uniqueUrl || "");
				setHasBubblesOrInputs(response.form.fields.length > 0);
			} catch (error) {
				console.error("Error fetching form details", error);
				toast.error("Error fetching form details");
			}
		};

		fetchFormDetails();
	}, [formId]);

	const handleThemeChange = async (theme) => {
		setSelectedTheme(theme);
		try {
			console.log(`Updating theme for formId: ${formId} to ${theme}`);
			await updateFormTheme(formId, theme);
			toast.success("Theme updated successfully");
		} catch (error) {
			console.error("Error updating theme", error.message);
			toast.error(`Error updating theme: ${error.message}`);
		}
	};

	const handleShare = async () => {
		console.log("handleShare executed in ThemePage component");
		if (!uniqueUrl) {
			toast.error("Please save the form before sharing.");
			return;
		}
		try {
			const shareUrl = `${window.location.origin}/form/${uniqueUrl}`;
			console.log("Generated share URL in ThemePage component:", shareUrl);
			navigator.clipboard.writeText(shareUrl);
			toast.success("Form link copied to clipboard");
		} catch (error) {
			console.error("Error sharing form", error.message);
			toast.error(`Error sharing form: ${error.message}`);
		}
	};

	return (
		<div className={styles.container}>
			<Renavbar
				currentPage="theme"
				showFormNameInput={false}
				handleShare={handleShare}
				uniqueUrl={uniqueUrl}
				hasBubblesOrInputs={hasBubblesOrInputs}
			/>
			<div className={styles.main}>
				<ThemeSidebar onThemeChange={handleThemeChange} />
				<ThemePreview selectedTheme={selectedTheme} />
			</div>
		</div>
	);
};

export default ThemePage;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Renavbar from "../../components/Renavbar";
import Sidebar from "../../components/Sidebar";
import FieldContainer from "../../components/FieldContainer";
import {
	saveForm,
	fetchFormById,
	updateForm,
	updateViewCount,
} from "../../endpoints/form";
import toast from "react-hot-toast";
import styles from "../Form_page/Form_page.module.css";
import { RiFlagFill } from "react-icons/ri";

const FormPage = ({ isNewForm }) => {
	const { userId, formId, folderId } = useParams();
	const [fields, setFields] = useState([]);
	const [formName, setFormName] = useState("");
	const [errors, setErrors] = useState({});
	const [uniqueUrl, setUniqueUrl] = useState("");
	const [bubbleCounts, setBubbleCounts] = useState({
		Text: { max: 0, available: new Set() },
		Image: { max: 0, available: new Set() },
		Video: { max: 0, available: new Set() },
		GIF: { max: 0, available: new Set() },
	});
	const [inputCounts, setInputCounts] = useState({
		Text: { max: 0, available: new Set() },
		Number: { max: 0, available: new Set() },
		Email: { max: 0, available: new Set() },
		Phone: { max: 0, available: new Set() },
		Date: { max: 0, available: new Set() },
		Rating: { max: 0, available: new Set() },
		Buttons: { max: 0, available: new Set() },
	});
	const [loading, setLoading] = useState(false);
	const [hasBubblesOrInputs, setHasBubblesOrInputs] = useState(false);
	const navigate = useNavigate();

	const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/;
	const videoUrlRegex = /\.(mp4|webm|ogg)$/;
	const gifUrlRegex = /\.(gif)$/;

	useEffect(() => {
		if (!isNewForm && formId) {
			const fetchFormDetails = async () => {
				try {
					const response = await fetchFormById(formId);
					setFormName(response.form.formname);
					setFields(response.form.fields);
					setUniqueUrl(response.form.uniqueUrl || generateUniqueUrl());

					const bubbleCounts = {
						Text: { max: 0, available: new Set() },
						Image: { max: 0, available: new Set() },
						Video: { max: 0, available: new Set() },
						GIF: { max: 0, available: new Set() },
					};

					const inputCounts = {
						Text: { max: 0, available: new Set() },
						Number: { max: 0, available: new Set() },
						Email: { max: 0, available: new Set() },
						Phone: { max: 0, available: new Set() },
						Date: { max: 0, available: new Set() },
						Rating: { max: 0, available: new Set() },
						Buttons: { max: 0, available: new Set() },
					};

					response.form.fields.forEach((field) => {
						if (field.heading.startsWith("Text")) bubbleCounts.Text.max++;
						if (field.heading.startsWith("Image")) bubbleCounts.Image.max++;
						if (field.heading.startsWith("Video")) bubbleCounts.Video.max++;
						if (field.heading.startsWith("GIF")) bubbleCounts.GIF.max++;
						if (field.heading.startsWith("Input Text")) inputCounts.Text.max++;
						if (field.heading.startsWith("Input Number"))
							inputCounts.Number.max++;
						if (field.heading.startsWith("Input Email"))
							inputCounts.Email.max++;
						if (field.heading.startsWith("Input Phone"))
							inputCounts.Phone.max++;
						if (field.heading.startsWith("Input Date")) inputCounts.Date.max++;
						if (field.heading.startsWith("Input Rating"))
							inputCounts.Rating.max++;
						if (field.heading.startsWith("Input Buttons"))
							inputCounts.Buttons.max++;
					});
					setBubbleCounts(bubbleCounts);
					setInputCounts(inputCounts);

					// Update view count
					await updateViewCount(formId);
				} catch (error) {
					console.error("Error fetching form details", error);
					toast.error("Error fetching form details");
				}
			};

			fetchFormDetails();
		}
	}, [isNewForm, formId]);

	useEffect(() => {
		setHasBubblesOrInputs(fields.length > 0);
	}, [fields]);

	const handleSaveOrUpdateForm = async () => {
		if (loading) return;
		if (!hasBubblesOrInputs) {
			toast.error("Please add at least one bubble or input field.");
			return;
		}
		setLoading(true);

		const requiredFieldTypes = ["Text", "Image", "Video", "GIF", "Buttons"];
		const newErrors = {};

		const isFormNameFilled = formName.trim() !== "";
		if (!isFormNameFilled) {
			newErrors.formName = "Form name is required";
		}

		fields.forEach((field, index) => {
			if (requiredFieldTypes.includes(field.type)) {
				if (
					field.value.trim() === "" &&
					!(
						field.heading.startsWith("Input") &&
						!field.heading.startsWith("Input Buttons")
					)
				) {
					newErrors[index] = `${field.heading} is required`;
				} else if (field.type === "Image" && !imageUrlRegex.test(field.value)) {
					newErrors[index] = "Image URL is not valid";
					toast.error("Image URL is not valid");
				} else if (field.type === "Video" && !videoUrlRegex.test(field.value)) {
					newErrors[index] = "Video URL is not valid";
					toast.error("Video URL is not valid");
				} else if (field.type === "GIF" && !gifUrlRegex.test(field.value)) {
					newErrors[index] = "GIF URL is not valid";
					toast.error("GIF URL is not valid");
				}
			}
		});

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			try {
				const formDetails = {
					formname: formName,
					folderId: folderId || null,
					theme: "default",
					fields,
				};

				if (isNewForm) {
					const response = await saveForm(formDetails);
					toast.success("Form saved successfully");
					setUniqueUrl(response.form.uniqueUrl);
					navigate(`/dashboard/${userId}/${response.form._id}`);
				} else {
					await updateForm(formId, formDetails);
					toast.success("Form updated successfully");
					navigate(`/dashboard/${userId}/${formId}`);
				}
			} catch (error) {
				console.error("Error saving form", error.message);
				toast.error(`Error saving form: ${error.message}`);
			} finally {
				setLoading(false);
			}
		} else {
			toast.error("Please fill out all required fields.");
			setLoading(false);
		}
	};

	const handleShare = async () => {
		if (!uniqueUrl) {
			toast.error("Please save the form before sharing.");
			return;
		}
		if (!hasBubblesOrInputs) {
			toast.error(
				"Please add at least one bubble or input field before sharing."
			);
			return;
		}

		try {
			const shareUrl = `${window.location.origin}/form/${uniqueUrl}`;
			navigator.clipboard.writeText(shareUrl);
			toast.success("Form link copied to clipboard");
		} catch (error) {
			console.error("Error sharing form", error.message);
			toast.error(`Error sharing form: ${error.message}`);
		}
	};

	const handleBubbleClick = (type) => {
		setBubbleCounts((prevCounts) => {
			const newCount =
				prevCounts[type].available.size > 0
					? Math.min(...prevCounts[type].available)
					: prevCounts[type].max + 1;

			const newAvailable = new Set(prevCounts[type].available);
			newAvailable.delete(newCount);

			setFields((prevFields) => [
				...prevFields,
				{ type, heading: `${type} ${newCount}`, value: "" },
			]);

			return {
				...prevCounts,
				[type]: {
					max: Math.max(prevCounts[type].max, newCount),
					available: newAvailable,
				},
			};
		});
	};

	const handleInputClick = (type) => {
		setInputCounts((prevCounts) => {
			const newCount =
				prevCounts[type].available.size > 0
					? Math.min(...prevCounts[type].available)
					: prevCounts[type].max + 1;

			const newAvailable = new Set(prevCounts[type].available);
			newAvailable.delete(newCount);

			setFields((prevFields) => [
				...prevFields,
				{ type, heading: `Input ${type} ${newCount}`, value: "" },
			]);

			return {
				...prevCounts,
				[type]: {
					max: Math.max(prevCounts[type].max, newCount),
					available: newAvailable,
				},
			};
		});
	};

	const handleChange = (index, value) => {
		setFields((prevFields) => {
			const updatedFields = [...prevFields];
			updatedFields[index].value = value;

			if (updatedFields[index].value.trim() !== "") {
				const newErrors = { ...errors };
				delete newErrors[index];
				setErrors(newErrors);
			}

			return updatedFields;
		});
	};

	const handleDelete = (index, type, isBubble) => {
		const countSet = isBubble ? setBubbleCounts : setInputCounts;

		setFields((prevFields) => {
			const updatedFields = [...prevFields];
			const removedField = updatedFields.splice(index, 1)[0];

			countSet((prevCounts) => {
				const newAvailable = new Set(prevCounts[removedField.type].available);
				const fieldNumber = parseInt(removedField.heading.split(" ").pop(), 10);
				newAvailable.add(fieldNumber);

				return {
					...prevCounts,
					[removedField.type]: {
						...prevCounts[removedField.type],
						available: newAvailable,
					},
				};
			});

			return updatedFields;
		});
	};

	return (
		<div className={`${styles.container} open-sans`}>
			<Renavbar
				currentPage="form"
				formName={formName}
				setFormName={setFormName}
				handleSave={handleSaveOrUpdateForm}
				handleShare={handleShare}
				uniqueUrl={uniqueUrl}
				showFormNameInput={true}
				hasBubblesOrInputs={hasBubblesOrInputs}
			/>
			<div className={styles.startBox}>
				<span>
					<RiFlagFill />
				</span>
				<span>Start</span>
			</div>
			<div className={styles.fieldsContainer}>
				<Sidebar
					handleBubbleClick={handleBubbleClick}
					handleInputClick={handleInputClick}
				/>
				<FieldContainer
					fields={fields}
					handleChange={handleChange}
					handleDelete={handleDelete}
					errors={errors}
				/>
			</div>
		</div>
	);
};

export default FormPage;

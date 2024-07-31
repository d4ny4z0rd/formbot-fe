import { useParams } from "react-router-dom";
import Renavbar from "../../components/Renavbar";
import { fetchFormResponses, fetchFormById } from "../../endpoints/form";
import styles from "./Response_page.module.css";
import { CiCalendar } from "react-icons/ci";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const Response = () => {
	const { formId } = useParams();
	const [responses, setResponses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [formFields, setFormFields] = useState([]);
	const [viewCount, setViewCount] = useState(0);
	const [uniqueUrl, setUniqueUrl] = useState("");
	const [hasBubblesOrInputs, setHasBubblesOrInputs] = useState(false);

	useEffect(() => {
		if (!formId) {
			setError("Form ID is not defined.");
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			try {
				setLoading(true);

				const { form } = await fetchFormById(formId);
				if (form && form.fields) {
					setViewCount(form.views);
					setUniqueUrl(form.uniqueUrl || "");
					setHasBubblesOrInputs(form.fields.length > 0);

					const filteredFields = form.fields.filter(
						(field) =>
							[
								"Text",
								"Number",
								"Email",
								"Phone",
								"Date",
								"Rating",
								"Buttons",
							].includes(field.type) &&
							!/^(text|image|video|gif)/i.test(field.heading)
					);
					setFormFields(filteredFields);
				} else {
					setError("Failed to fetch form structure.");
					setLoading(false);
					return;
				}

				const responseList = await fetchFormResponses(formId);
				if (responseList && responseList.length) {
					const emailResponsesMap = responseList.reduce((acc, response) => {
						const email = response.responses["email"];
						if (!acc[email]) {
							acc[email] = {
								...response,
								responses: { ...response.responses },
							};
						} else {
							acc[email].responses = {
								...acc[email].responses,
								...response.responses,
							};
							if (
								new Date(acc[email].submittedAt) <
								new Date(response.submittedAt)
							) {
								acc[email].submittedAt = response.submittedAt;
							}
						}
						return acc;
					}, {});

					const finalResponses = Object.values(emailResponsesMap).sort(
						(a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
					);
					setResponses(finalResponses);
				} else {
					setResponses([]);
					setError("No responses found.");
				}
			} catch (error) {
				setError("No Response yet collected");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [formId]);

	if (loading) {
		return <p>Loading...</p>;
	}

	const errorMessage = error || "No responses yet collected.";

	const completionRate = responses.length
		? ((responses.length / (viewCount / 2)) * 100).toFixed(1)
		: "0.0";

	const handleShare = async () => {
		console.log("handleShare executed in Response component");
		if (!uniqueUrl) {
			toast.error("Please save the form before sharing.");
			return;
		}
		try {
			const shareUrl = `${window.location.origin}/form/${uniqueUrl}`;
			console.log("Generated share URL in Response component:", shareUrl);
			navigator.clipboard.writeText(shareUrl);
			toast.success("Form link copied to clipboard");
		} catch (error) {
			console.error("Error sharing form", error.message);
			toast.error(`Error sharing form: ${error.message}`);
		}
	};

	const formatResponseDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	return (
		<div className={styles.container}>
			<Renavbar
				currentPage="response"
				showFormNameInput={false}
				setFormName={() => {}}
				handleSave={() => {}}
				handleShare={handleShare}
				uniqueUrl={uniqueUrl}
				hasBubblesOrInputs={hasBubblesOrInputs}
			/>
			<div className={`${styles.data} open-sans`}>
				<div className={styles.dataeach}>
					<span>Views</span>
					<span>{viewCount / 2}</span> {/* Display view count */}
				</div>
				<div className={styles.dataeach}>
					<span>Starts</span>
					<span>{responses.length}</span>
				</div>
				<div className={styles.dataeach}>
					<span>Completion rate</span>
					<span>{completionRate}%</span>
				</div>
			</div>
			{responses.length > 0 ? (
				<table className={styles.responseTable}>
					<thead>
						<tr>
							<th>Serial No</th>
							<th className={styles.serial}>
								<span>
									{" "}
									<CiCalendar />
								</span>
								<span> Submitted At</span>
							</th>
							<th>Email</th>
							{formFields.map((field, index) => (
								<th key={index}>{field.heading}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{responses.map((response, index) => (
							<tr key={index}>
								<td>{index + 1}</td> {/* Serial number */}
								<td>
									{new Date(response.submittedAt).toLocaleString("en-US", {
										day: "2-digit",
										month: "short",
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									})}
								</td>{" "}
								{/* New format */}
								<td>{response.responses["email"]}</td>
								{formFields.map((field, keyIndex) => (
									<td key={keyIndex}>
										{field.type === "Date"
											? formatResponseDate(response.responses[field._id])
											: response.responses[field._id] || "-"}{" "}
										{/* Check if field type is Date and format accordingly */}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className={styles.noResponses}>
					<p>{errorMessage}</p>
				</div>
			)}
		</div>
	);
};

export default Response;

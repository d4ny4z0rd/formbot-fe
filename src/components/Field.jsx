import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "../Pages/Form_page/Form_page.module.css";

const Field = ({ field, index, handleChange, handleDelete, error }) => {
	const getHintMessage = (type) => {
		switch (type) {
			case "Text":
				return "Hint: User will input a text on his form.";
			case "Number":
				return "Hint: User will input a number on his form.";
			case "Email":
				return "Hint: User will input an email on his form.";
			case "Phone":
				return "Hint: User will input a phone on his form.";
			case "Date":
				return "Hint: User will select a date.";
			case "Rating":
				return "Hint: User will tap to rate out of 5.";
			default:
				return "";
		}
	};

	return (
		<div
			className={`${styles.formField} ${
				error ? styles.errorInputContainer : ""
			}`}>
			<div className={styles.fieldHeader}>
				<label>{field.heading}</label>
				<RiDeleteBin6Line
					size={"20px"}
					className={styles.deleteIcon}
					onClick={() =>
						handleDelete(index, field.type, !field.heading.startsWith("Input"))
					}
				/>
			</div>
			{field.heading.startsWith("Input Buttons") ? (
				<div className={styles.inputContainer}>
					<input
						type="text"
						value={field.value || ""}
						onChange={(e) => handleChange(index, e.target.value)}
						placeholder="Click to add buttons"
						className={error ? styles.errorInput : ""}
					/>
					{error && <span className={styles.errorMessage}>{error}</span>}
				</div>
			) : field.heading.startsWith("Input") ? (
				<div className={styles.inputContainer}>
					<span className={styles.hint}>{getHintMessage(field.type)}</span>
					{error && <span className={styles.errorMessage}>{error}</span>}
				</div>
			) : (
				<div className={styles.inputContainer}>
					<input
						type="text"
						value={field.value || ""}
						onChange={(e) => handleChange(index, e.target.value)}
						placeholder="Click to add link"
						className={error ? styles.errorInput : ""}
					/>
					{error && <span className={styles.errorMessage}>{error}</span>}
				</div>
			)}
		</div>
	);
};

export default Field;

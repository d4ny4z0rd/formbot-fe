import Field from "./Field";
import styles from "../Pages/Form_page/Form_page.module.css";

const FieldContainer = ({ fields, handleChange, handleDelete, errors }) => {
	return (
		<div className={styles.fieldsContainer}>
			{fields.map((field, index) => (
				<Field
					key={index}
					field={field}
					index={index}
					handleChange={handleChange}
					handleDelete={handleDelete}
					error={errors[index]}
				/>
			))}
		</div>
	);
};

export default FieldContainer;

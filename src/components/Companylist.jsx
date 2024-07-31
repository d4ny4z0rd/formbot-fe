import React from "react";
import companylist from "../assets/Chatbotform/company.png";
import styles from "./Companylist.module.css";

function Companylist() {
	return (
		<div className={styles.container}>
			<div className={`${styles.heroCompanyText} outfit`}>
				Loved by teams and creators from all around the world
			</div>
			<div className={styles.heroCompany}>
				<img src={companylist} alt="" />
			</div>
		</div>
	);
}

export default Companylist;

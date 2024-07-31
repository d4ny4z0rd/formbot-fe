import styles from "./Engagement.module.css";
import eng1 from "../assets/Chatbotform/eng1.png";
import eng2 from "../assets/Chatbotform/eng2.png";
import { useNavigate } from "react-router-dom";

function Engagement() {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.imageWrapper}>
				<img
					src={eng2}
					alt="Engagement Graphic 2"
					className={styles.imageTop}
				/>
				<img
					src={eng1}
					alt="Engagement Graphic 1"
					className={styles.imageBottom}
				/>
			</div>

			<div className={styles.content}>
				<div className={`${styles.heading} open-sans`}>
					<div>Improve conversion and user engagement</div>
					<div>with FormBots</div>
				</div>

				<button
					onClick={() => navigate("/signup")}
					className={`${styles.engSignup} open-sans`}>
					Create a FormBot for free
				</button>

				<div className={`${styles.subheading} open-sans`}>
					No trial. Generous free plan.
				</div>
			</div>
		</div>
	);
}

export default Engagement;

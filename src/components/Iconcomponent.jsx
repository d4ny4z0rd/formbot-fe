import styles from "./Iconcomponent.module.css";
import applist from "../assets/Chatbotform/notionlist.png"; // Ensure the correct path to the image

function IntegrationIcons() {
	return (
		<div className={styles.container}>
			<img src={applist} alt="applist" className={styles.imageapp} />
			<div className={styles.writting}>
				<div className={`${styles.heading} outfit`}>
					Integrate with any platform
				</div>
				<div className={`${styles.subheading} open-sans`}>
					<div>
						Typebot offers several native integrations blocks as well as
						instructions on
					</div>
					<div>how to embed typebot on particular platforms</div>
				</div>
			</div>
		</div>
	);
}

export default IntegrationIcons;

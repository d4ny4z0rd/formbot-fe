import explore1 from "./explore-image/explore1.webp";
import explore2 from "./explore-image/explore2.webp";
import styles from "./Explore.module.css";

function Explore() {
	return (
		<div className={styles.exploreContainer}>
			<div className={styles.exploreItem1}>
				<img
					src={explore1}
					alt="Easy building experience"
					className={styles.exploreImage}
				/>
				<div className={styles.exploreDesc1}>
					<h1 className={`${styles.exploreHeading} outfit`}>
						Easy building experience
					</h1>
					<p className={`${styles.exploreDescription} open-sans`}>
						All you have to do is drag and drop blocks to create your app. Even
						if you have custom needs, you can always add custom code.
					</p>
				</div>
			</div>
			<div className={styles.exploreItem2}>
				<img
					src={explore2}
					alt="Embed it in a click"
					className={styles.exploreImage}
				/>
				<div className={styles.exploreDesc2}>
					<h1 className={`${styles.exploreHeading} outfit`}>
						Embed it in a click
					</h1>
					<p className={`${styles.exploreDescription} open-sans`}>
						Embedding your typebot in your applications is a walk in the park.
						Typebot gives you several step-by-step platform-specific
						instructions. Your typebot will always feel "native".
					</p>
				</div>
			</div>
		</div>
	);
}

export default Explore;

import React from "react";
import styles from "./CollectResult.module.css";
import chatstyle from "../assets/Chatbotform/typebotstandard.png";

function CollectResult() {
	return (
		<div className={styles.CollectResult}>
			<div className={`${styles.heading} outfit`}>
				Collect results in real-time
			</div>

			<div className={`${styles.subheading} open-sans`}>
				<div>
					One of the main advantage of a chat application is that you collect
					the user's responses on each question.
				</div>
				<div>You won't lose any valuable data.</div>
			</div>

			<div>
				<img src={chatstyle} alt="" />
			</div>
		</div>
	);
}

export default CollectResult;

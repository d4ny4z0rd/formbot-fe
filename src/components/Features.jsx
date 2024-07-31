import React from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import { IoIosCalculator } from "react-icons/io";
import { IoFolderOpen } from "react-icons/io5";
import { MdPersonAdd } from "react-icons/md";
import { LuPersonStanding } from "react-icons/lu";
import { IoGitBranch } from "react-icons/io5";
import styles from "./Features.module.css";

const Features = () => {
	const features = [
		{
			icon: <LuPersonStanding />,
			title: "Hidden fields",
			description:
				"Include data in your form URL to segment your user and use its data directly in your form.",
		},
		{
			icon: <MdPersonAdd />,
			title: "Team collaboration",
			description: "Invite your teammates to work on your typebots with you.",
		},
		{
			icon: <IoGitBranch />,
			title: "Link to sub typebots",
			description: "Reuse your typebots in different parent bots.",
		},
		{
			icon: <IoIosCalculator />,
			title: "Custom code",
			description: "Customize everything with your own Javascript & CSS code.",
		},
		{
			icon: <IoShareSocialSharp />,
			title: "Custom domain",
			description: "Connect your typebot to the custom URL of your choice.",
		},
		{
			icon: <IoFolderOpen />,
			title: "Folder management",
			description:
				"Organize your typebots in specific folders to keep it clean and work with multiple clients.",
		},
	];

	return (
		<div className={styles.container}>
			<h2 className={styles.heading}>And many more features</h2>
			<p className={styles.subheading}>
				Typebot makes form building easy and comes with powerful features
			</p>
			<div className={styles.featuresGrid}>
				{features.map((feature, index) => (
					<div key={index} className={styles.featureCard}>
						<div className={styles.iconWrapper}>
							<div className={styles.icon}>{feature.icon}</div>
						</div>
						<div className={styles.textContent}>
							<h3 className={styles.title}>{feature.title}</h3>
							<p className={styles.description}>{feature.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Features;

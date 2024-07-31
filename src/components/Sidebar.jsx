import { LuMessageSquare, LuCheckSquare } from "react-icons/lu";
import { MdOutlineGif } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { CiCalendar, CiStar, CiImageOn } from "react-icons/ci";
import { TbMovie } from "react-icons/tb";
import { PiTextT } from "react-icons/pi";
import styles from "../Pages/Form_page/Form_page.module.css";

const Sidebar = ({ handleBubbleClick, handleInputClick }) => {
	const bubbles = [
		{ name: "Text", icon: <LuMessageSquare size={"20px"} color="#4B83FF" /> },
		{ name: "Image", icon: <CiImageOn size={"20px"} color="#4B83FF" /> },
		{ name: "Video", icon: <TbMovie size={"20px"} color="#4B83FF" /> },
		{ name: "GIF", icon: <MdOutlineGif size={"25px"} color="#4B83FF" /> },
	];

	const inputs = [
		{ name: "Text", icon: <PiTextT size={"20px"} color="#FFA54C" /> },
		{ name: "Number", icon: <FaHashtag size={"18px"} color="#FFA54C" /> },
		{ name: "Email", icon: <MdAlternateEmail size={"20px"} color="#FFA54C" /> },
		{ name: "Phone", icon: <FiPhone size={"18px"} color="#FFA54C" /> },
		{ name: "Date", icon: <CiCalendar size={"20px"} color="#FFA54C" /> },
		{ name: "Rating", icon: <CiStar size={"20px"} color="#FFA54C" /> },
		{ name: "Buttons", icon: <LuCheckSquare size={"20px"} color="#FFA54C" /> },
	];

	return (
		<div className={styles.sidebar}>
			<div className={styles.section}>
				<h3>Bubbles</h3>
				<div className={styles.buttonGroup}>
					{bubbles.map((bubble, index) => (
						<button
							key={index}
							className={styles.bubbleButton}
							onClick={() => handleBubbleClick(bubble.name)}>
							<span>{bubble.icon}</span>
							<span>{bubble.name}</span>
						</button>
					))}
				</div>
			</div>
			<div className={styles.section}>
				<h3>Inputs</h3>
				<div className={styles.buttonGroup}>
					{inputs.map((input, index) => (
						<button
							key={index}
							className={styles.inputButton}
							onClick={() => handleInputClick(input.name)}>
							<span>{input.icon}</span>
							<span>{input.name}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

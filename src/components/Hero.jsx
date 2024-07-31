import styles from "./Hero.module.css";
import orange from "./images/orangetraingle.png";
import blue from "./images/blue.png";
import herochart from "./images/herochart.png";
import { useNavigate } from "react-router-dom";
import Explore from "./Explore";
import Footer from "./Footer";
import CollectResult from "./CollectResult";
import Features from "./Features";
import Engagement from "./Engagement";
import IntegrationIcons from "./Iconcomponent";
import ChatbotForm from "./Chatbotform";
import Companylist from "./Companylist";

function Hero() {
	const navigate = useNavigate();
	return (
		<div className={styles.heroContainer}>
			<div className={styles.heroTitle}>
				<img src={orange} alt="Orange Triangle" className={styles.heroImage} />
				<div className={styles.heroDesc}>
					<div className={`${styles.heroHeading} outfit`}>
						Build advanced chatbots visually
					</div>
					<div className={`${styles.heroSubheading} open-sans`}>
						Typebot gives you powerful blocks to create unique chat experiences.
						Embed them anywhere on your web/mobile apps and start collecting
						results like magic.
					</div>
					<button
						onClick={() => navigate("/signup")}
						className={`${styles.heroSignup} open-sans`}>
						Create a FormBot for free
					</button>
				</div>
				<img src={blue} alt="Blue" className={styles.heroImage} />
			</div>

			<div className={styles.heroChart}>
				<img src={herochart} alt="Hero Chart" />
			</div>
			<div className={styles.allfiles}>
				<ChatbotForm />
				<Explore />
				<IntegrationIcons />
				<CollectResult />
				<Features />
				<Companylist />
				<Engagement />
				<Footer />
			</div>
		</div>
	);
}

export default Hero;

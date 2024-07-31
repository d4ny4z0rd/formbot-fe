import styles from "./Navbar.module.css";
import logo from "./Navbar-images/logo.png";
import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<div className={styles.navbar}>
			<div className={styles.navbarContent}>
				<div>
					<img sizes="35px" src={logo} alt="FormBot logo" />
				</div>
				<div className="outfit">FormBot</div>
			</div>

			<div className={styles.navbar2}>
				<NavLink to="/signin" className={styles.navLink}>
					<div className={`${styles.signin} open-sans`}> Sign in</div>
				</NavLink>
				<NavLink to="/signup" className={styles.navLink}>
					<div className={`${styles.signup} open-sans`}> Create a FormBot</div>
				</NavLink>
			</div>
		</div>
	);
}

export default Navbar;

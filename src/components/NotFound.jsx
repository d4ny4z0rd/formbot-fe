import React from "react";
import styles1 from "./NotFound.module.css";
import { NavLink } from "react-router-dom";

function NotFound() {
	return (
		<div className={styles1.notfound}>
			<h1>404</h1>
			<h2>Page Not Found</h2>
			<p>Sorry, the page you are looking for does not exist.</p>
			<NavLink to="/">Go to Home</NavLink>
		</div>
	);
}

export default NotFound;

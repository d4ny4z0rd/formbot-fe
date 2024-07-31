import React, { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../../endpoints/user";
import { useNavigate } from "react-router-dom";
import styles from "../Login_page/Login_page.module.css";
import traingle from "../../assets/loginsignup/taringlelogin.png";
import Ellipsedown from "../../assets/loginsignup/Ellipsedown.png";
import Ellipseupper from "../../assets/loginsignup/Ellipseupper.png";
import { IoArrowBack } from "react-icons/io5";

function LoginPage({ handleLogin }) {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});

	async function submitHandler(e) {
		e.preventDefault();

		const newErrors = {};
		if (!email) newErrors.email = "Email is required";
		if (!password) newErrors.password = "Password is required";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const responseData = await login(email, password);

			if (responseData.success) {
				toast.success(responseData.message);
				handleLogin();
				localStorage.setItem("token", responseData.token || "");
				localStorage.setItem("user", responseData.user || "");
				navigate(`/dashboard/${responseData.user}`);
			} else {
				toast.error(responseData.message);
			}
		} catch (error) {
			toast.error(error.message || "An error occurred during Login");
		}
	}

	const handleRegisterClick = () => {
		navigate("/signup");
	};

	const handleBackClick = () => {
		navigate(-1); 
	};

	return (
		<div className={`${styles.container} inter`}>
			<div
				className={styles.shape}
				style={{ top: "5%", left: "5%", cursor: "pointer" }}
				onClick={handleBackClick} 
			>
				<IoArrowBack size={"25px"} color="white" />
			</div>
			<img
				src={traingle}
				alt="traingle"
				className={`${styles.shape} ${styles.traingle}`}
			/>
			<img
				src={Ellipseupper}
				alt="Ellipseupper"
				className={`${styles.shape} ${styles.ellipseUpper}`}
			/>
			<img
				src={Ellipsedown}
				alt="Ellipsedown"
				className={`${styles.shape} ${styles.ellipseDown}`}
			/>
			<div className={styles.formContainer}>
				<form onSubmit={submitHandler}>
					<div
						className={`${styles.inputGroup} ${
							errors.email ? styles.inputGroupError : ""
						}`}>
						<label htmlFor="email" className={errors.email ? styles.error : ""}>
							Email
						</label>
						<input
							id="email"
							name="email"
							onChange={(e) => {
								setEmail(e.target.value);
								setErrors((prev) => ({ ...prev, email: "" }));
							}}
							type="email"
							value={email}
							placeholder="Enter your email"
							className={errors.email ? styles.errorInput : ""}
						/>
						{errors.email && (
							<div className={styles.errorMessage}>{errors.email}</div>
						)}
					</div>
					<div
						className={`${styles.inputGroup} ${
							errors.password ? styles.inputGroupError : ""
						}`}>
						<label
							htmlFor="password"
							className={errors.password ? styles.error : ""}>
							Password
						</label>
						<input
							id="password"
							name="password"
							onChange={(e) => {
								setPassword(e.target.value);
								setErrors((prev) => ({ ...prev, password: "" }));
							}}
							type="password"
							value={password}
							placeholder="***********"
							className={errors.password ? styles.errorInput : ""}
						/>
						{errors.password && (
							<div className={styles.errorMessage}>{errors.password}</div>
						)}
					</div>
					<div>
						<button type="submit" className={styles.button}>
							Log in
						</button>
					</div>
				</form>
				<p style={{ textAlign: "center", marginTop: "10px" }}>
					Don't have an account?{" "}
					<span
						onClick={handleRegisterClick}
						style={{ color: "blue", cursor: "pointer" }}>
						Register now
					</span>
				</p>
			</div>
		</div>
	);
}

export default LoginPage;

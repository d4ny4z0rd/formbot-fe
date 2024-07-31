import React, { useState } from "react";
import { Register } from "../../endpoints/user";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "../Signup_page/Signup_page.module.css";
import traingle from "../../assets/loginsignup/taringlelogin.png";
import Ellipsedown from "../../assets/loginsignup/Ellipsedown.png";
import Ellipseupper from "../../assets/loginsignup/Ellipseupper.png";
import { IoArrowBack } from "react-icons/io5";

function Signup() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
		setErrors({
			...errors,
			[event.target.name]: "",
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {};
		if (!formData.username) newErrors.username = "Username is required";
		if (!formData.email) newErrors.email = "Email is required";
		if (!formData.password) newErrors.password = "Password is required";
		if (!formData.confirmPassword)
			newErrors.confirmPassword = "Confirm Password is required";

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		if (formData.email !== formData.email.toLowerCase()) {
			toast.error("Email should be in lowercase");
			newErrors.email = "Email should be in lowercase";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const responseData = await Register(
				formData.username,
				formData.email.toLowerCase(), 
				formData.password,
				formData.confirmPassword
			);

			if (responseData.success) {
				toast.success(responseData.message || "User registered successfully!");
				setTimeout(() => {
					navigate("/signin");
				}, 1500); 
			} else {
				toast.error(responseData.message || "Registration failed");
			}
		} catch (error) {
			toast.error(error.message || "An error occurred during signup");
		}
	};
	const handleBackClick = () => {
		navigate(-1); 
	};

	return (
		<div className={`${styles.container} inter`}>
			{/* Add decorative images */}
			<div
				onClick={handleBackClick}
				className={styles.shape}
				style={{ top: "5%", left: "5%", cursor: "pointer" }}>
				<IoArrowBack size={"25px"} color="white" />
			</div>
			<img
				src={traingle}
				alt="triangle"
				className={`${styles.shape} ${styles.traingle}`}
			/>
			<img
				src={Ellipseupper}
				alt="ellipse upper"
				className={`${styles.shape} ${styles.ellipseUpper}`}
			/>
			<img
				src={Ellipsedown}
				alt="ellipse down"
				className={`${styles.shape} ${styles.ellipseDown}`}
			/>

			<div className={styles.formContainer}>
				<form onSubmit={handleSubmit}>
					<div
						className={`${styles.inputGroup} ${
							errors.username ? styles.inputGroupError : ""
						}`}>
						<label
							htmlFor="username"
							className={errors.username ? styles.error : ""}>
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							className={errors.username ? styles.errorInput : ""}
							placeholder="Enter your username"
						/>
						{errors.username && (
							<div className={styles.errorMessage}>{errors.username}</div>
						)}
					</div>
					<div
						className={`${styles.inputGroup} ${
							errors.email ? styles.inputGroupError : ""
						}`}>
						<label htmlFor="email" className={errors.email ? styles.error : ""}>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className={errors.email ? styles.errorInput : ""}
							placeholder="Enter your email"
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
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className={errors.password ? styles.errorInput : ""}
							placeholder="***********"
						/>
						{errors.password && (
							<div className={styles.errorMessage}>{errors.password}</div>
						)}
					</div>
					<div
						className={`${styles.inputGroup} ${
							errors.confirmPassword ? styles.inputGroupError : ""
						}`}>
						<label
							htmlFor="confirmPassword"
							className={errors.confirmPassword ? styles.error : ""}>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							className={errors.confirmPassword ? styles.errorInput : ""}
							placeholder="***********"
						/>
						{errors.confirmPassword && (
							<div className={styles.errorMessage}>
								{errors.confirmPassword}
							</div>
						)}
					</div>
					<div>
						<button type="submit" className={styles.button}>
							Sign Up
						</button>
					</div>
				</form>
				<p style={{ textAlign: "center", marginTop: "10px" }}>
					Already have an account?{" "}
					<Link
						to="/signin"
						style={{
							color: "blue",
							cursor: "pointer",
							textDecoration: "none",
						}}>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Signup;

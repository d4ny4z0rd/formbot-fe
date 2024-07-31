import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Settings_page.module.css";
import { IoIosLogOut } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { updateUser } from "../../endpoints/user";
import { CiLock } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

const Settings = ({ handleLogout }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [showEmail, setShowEmail] = useState(true);
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const navigate = useNavigate();

	const userId = localStorage.getItem("user");

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await updateUser(
				username,
				email,
				newPassword,
				oldPassword,
				userId
			);
			toast.success("User updated successfully!");
			navigate(`/dashboard/${userId}`);
		} catch (error) {
			console.error("Error updating user:", error);
			toast.error(error.message || "Error updating user.");
		}
	};

	return (
		<div className={`${styles.container} open-sans`}>
			<h1 className={styles.title}>Settings</h1>
			<form onSubmit={submitHandler} className={styles.form}>
				<div className={styles.inputGroup}>
					<CiUser className={styles.icon} size={"20px"} color="#D0D0D0" />
					<input
						type="text"
						placeholder="Name"
						className={styles.input}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className={styles.inputGroup}>
					<CiLock className={styles.icon} size={"20px"} color="#D0D0D0" />
					<input
						type={showEmail ? "text" : "password"}
						placeholder="Update Email"
						className={styles.input}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button
						type="button"
						className={styles.eyeButton}
						onClick={() => setShowEmail(!showEmail)}>
						{showEmail ? (
							<IoEyeOffOutline size={"20px"} color="#D0D0D0" />
						) : (
							<IoEyeOutline size={"20px"} color="#D0D0D0" />
						)}
					</button>
				</div>
				<div className={styles.inputGroup}>
					<CiLock className={styles.icon} size={"20px"} color="#D0D0D0" />
					<input
						type={showOldPassword ? "text" : "password"}
						placeholder="Old Password"
						className={styles.input}
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
					/>
					<button
						type="button"
						className={styles.eyeButton}
						onClick={() => setShowOldPassword(!showOldPassword)}>
						{showOldPassword ? (
							<IoEyeOffOutline size={"20px"} color="#D0D0D0" />
						) : (
							<IoEyeOutline size={"20px"} color="#D0D0D0" />
						)}
					</button>
				</div>
				<div className={styles.inputGroup}>
					<CiLock className={styles.icon} size={"20px"} color="#D0D0D0" />
					<input
						type={showNewPassword ? "text" : "password"}
						placeholder="New Password"
						className={styles.input}
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<button
						type="button"
						className={styles.eyeButton}
						onClick={() => setShowNewPassword(!showNewPassword)}>
						{showNewPassword ? (
							<IoEyeOffOutline size={"20px"} color="#D0D0D0" />
						) : (
							<IoEyeOutline size={"20px"} color="#D0D0D0" />
						)}
					</button>
				</div>
				<button type="submit" className={styles.updateButton}>
					Update
				</button>
			</form>
			<button
				onClick={() => {
					handleLogout();
					navigate("/");
				}}
				className={styles.logoutButton}>
				<span>
					<IoIosLogOut size={"20px"} />
				</span>
				<span> Log out</span>
			</button>
		</div>
	);
};

export default Settings;

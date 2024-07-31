import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { FaFolderPlus } from "react-icons/fa";
import { IoAdd, IoArrowBack } from "react-icons/io5";
import { RiArrowDropDownLine, RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "../Dashboard/Dashboard.module.css";
import { getUserFolders, userDetails } from "../../endpoints/user";
import { createFolder, deleteFolder } from "../../endpoints/folder";
import {
	getformbyusers,
	getFormsByFolder,
	deleteForm,
} from "../../endpoints/form";
import toast from "react-hot-toast";

function Dashboard({ handleLogout }) {
	const { userId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [username, setUsername] = useState("");
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [isCreateFolderVisible, setIsCreateFolderVisible] = useState(false);
	const [folderName, setFolderName] = useState("");
	const [selectedFolderId, setSelectedFolderId] = useState(null);
	const [selectedFolderForms, setSelectedFolderForms] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
	const [folderToDelete, setFolderToDelete] = useState(null);
	const [formToDelete, setFormToDelete] = useState(null);
	const dropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const [folders, setFolders] = useState([]);
	const [forms, setForms] = useState([]);
	const [folderHistory, setFolderHistory] = useState([]); // State for folder history

	useLayoutEffect(() => {
		const handleResize = () => {
			if (dropdownRef.current && buttonRef.current) {
				const buttonWidth = buttonRef.current.offsetWidth;
				dropdownRef.current.style.width = `${buttonWidth}px`;
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [buttonRef.current, isDropdownVisible]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		} else {
			navigate("/signin");
		}
	}, []);

	useEffect(() => {
		const fetchFolders = async () => {
			try {
				if (userId) {
					const fetchedFolders = await getUserFolders(userId);
					setFolders(fetchedFolders);
				}
			} catch (error) {
				console.error("Error fetching folders:", error);
			}
		};

		fetchFolders();
	}, [userId]);

	useEffect(() => {
		const fetchForms = async () => {
			try {
				if (userId) {
					const fetchedForms = await getformbyusers(userId);
					setForms(fetchedForms);
				}
			} catch (error) {
				console.error("Error fetching forms:", error);
			}
		};

		fetchForms();
	}, [userId]);

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				if (userId) {
					const response = await userDetails(userId);
					setUsername(response.userDetails);
				} else {
					toast.error("User ID not found");
				}
			} catch (error) {
				toast.error(error.message);
			}
		};

		fetchUserDetails();
	}, [userId]);

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const folderIdFromUrl = urlParams.get("folderId");
		if (folderIdFromUrl) {
			setSelectedFolderId(folderIdFromUrl);
			fetchFormsInFolder(folderIdFromUrl);
		} else {
			setSelectedFolderId(null);
			setSelectedFolderForms([]);
		}
	}, [location.search]);

	const toggleDropdown = () => {
		setIsDropdownVisible(!isDropdownVisible);
	};

	const handleCreateFolderClick = () => {
		setIsCreateFolderVisible(true);
	};

	const handleCreateFolder = async () => {
		try {
			if (folderName.trim()) {
				await createFolder(folderName, userId);
				setIsCreateFolderVisible(false);
				setFolderName("");
				toast.success("Folder created successfully!");
				const fetchedFolders = await getUserFolders(userId);
				setFolders(fetchedFolders);
			} else {
				toast.error("Folder name cannot be empty");
			}
		} catch (error) {
			toast.error(`Error creating folder: ${error.message}`);
		}
	};

	const handleCancelCreateFolder = () => {
		setIsCreateFolderVisible(false);
		setFolderName("");
	};

	const handleDeleteFolderClick = (folder) => {
		setFolderToDelete(folder);
		setIsDeletePopupVisible(true);
	};

	const handleConfirmDeleteFolder = async () => {
		try {
			if (folderToDelete) {
				await deleteFolder(folderToDelete._id);
				toast.success("Folder deleted successfully!");
				const fetchedFolders = await getUserFolders(userId);
				setFolders(fetchedFolders);
				if (selectedFolderId === folderToDelete._id) {
					setSelectedFolderId(null);
					setSelectedFolderForms([]);
					navigate(`/dashboard/${userId}`, { replace: true });
				}
				setIsDeletePopupVisible(false);
				setFolderToDelete(null);
			}
		} catch (error) {
			toast.error(`Error deleting folder: ${error.message}`);
		}
	};

	const handleCancelDeleteFolder = () => {
		setIsDeletePopupVisible(false);
		setFolderToDelete(null);
	};

	const handleFormClick = (formId) => {
		navigate(`/dashboard/${userId}/${formId}`);
	};

	const handleCreateNewForm = () => {
		if (selectedFolderId) {
			navigate(`/dashboard/${userId}/${selectedFolderId}/newform`);
		} else {
			navigate(`/dashboard/${userId}/newform`);
		}
	};

	const handleFolderClick = async (folderId) => {
		setFolderHistory((prevHistory) => [...prevHistory, selectedFolderId]);
		setSelectedFolderId(folderId);
		navigate(`/dashboard/${userId}?folderId=${folderId}`, { replace: true });
		fetchFormsInFolder(folderId);
	};

	const fetchFormsInFolder = async (folderId) => {
		try {
			const formsInFolder = await getFormsByFolder(folderId);
			setSelectedFolderForms(formsInFolder);
		} catch (error) {
			console.error("Error fetching forms in folder:", error);
			toast.error("Error fetching forms in folder");
		}
	};

	const handleDeleteFormClick = (form) => {
		setFormToDelete(form);
		setIsDeletePopupVisible(true);
	};

	const handleConfirmDeleteForm = async () => {
		try {
			await deleteForm(formToDelete._id);
			toast.success("Form deleted successfully!");
			setIsDeletePopupVisible(false);
			setFormToDelete(null);
			if (selectedFolderId) {
				fetchFormsInFolder(selectedFolderId);
			} else {
				const fetchedForms = await getformbyusers(userId);
				setForms(fetchedForms);
			}
		} catch (error) {
			toast.error(`Error deleting form: ${error.message}`);
		}
	};

	const handleCancelDeleteForm = () => {
		setIsDeletePopupVisible(false);
		setFormToDelete(null);
	};

	const handleBackClick = () => {
		if (folderHistory.length > 0) {
			const previousFolderId = folderHistory[folderHistory.length - 1];
			setFolderHistory((prevHistory) => prevHistory.slice(0, -1));
			if (previousFolderId) {
				setSelectedFolderId(previousFolderId);
				fetchFormsInFolder(previousFolderId);
				navigate(`/dashboard/${userId}?folderId=${previousFolderId}`, {
					replace: true,
				});
			} else {
				setSelectedFolderId(null);
				setSelectedFolderForms([]);
				navigate(`/dashboard/${userId}`, { replace: true });
			}
		}
	};

	if (!isLoggedIn) {
		return null;
	}

	return (
		<div className={`${styles.maindiv} open-sans`}>
			<nav className={styles.navbar}>
				<div
					className={styles.userDropdown}
					onClick={toggleDropdown}
					ref={buttonRef}>
					<span>{username.username}'s workspace</span>
					<span>
						<RiArrowDropDownLine size={"20px"} />
					</span>
				</div>
				{isDropdownVisible && (
					<div className={styles.dropdownMenu} ref={dropdownRef}>
						<div onClick={() => navigate("/settings")}>Settings</div>
						<div
							onClick={() => {
								handleLogout();
								navigate("/");
							}}>
							Log Out
						</div>
					</div>
				)}
			</nav>
			<div className={styles.navLine}></div>
			<div className={styles.content}>
				<div className={styles.divone}>
					<div
						className={styles.folderOption}
						onClick={handleCreateFolderClick}>
						<FaFolderPlus /> Create a folder
					</div>
					{folders.map((folder) => (
						<div
							className={`${styles.folderList} ${
								selectedFolderId === folder._id ? styles.selectedFolder : ""
							}`}
							key={folder._id}
							onClick={() => handleFolderClick(folder._id)}
							style={{
								color: selectedFolderId === folder._id ? "#FFA54C" : "inherit",
							}}>
							<span>{folder.foldername}</span>
							<span
								onClick={(e) => {
									e.stopPropagation();
									handleDeleteFolderClick(folder);
								}}>
								<RiDeleteBin6Line
									style={{ cursor: "pointer" }}
									color="#F55050"
								/>
							</span>
						</div>
					))}
				</div>
				<div className={styles.typeBotContainer}>
					{selectedFolderId && (
						<div className={styles.shape} onClick={handleBackClick}>
							<IoArrowBack size={"30px"} color="white" />
						</div>
					)}
					<div onClick={handleCreateNewForm} className={styles.typeBotSquare}>
						<span>
							<IoAdd size={"20px"} />
						</span>
						<span>Create a TypeBot</span>
					</div>
					{selectedFolderId
						? selectedFolderForms.map((form) => (
								<div
									key={form._id}
									className={styles.formSquare}
									onClick={() => handleFormClick(form._id)}>
									<span>{form.formname}</span>
									<span
										className={styles.formDeleteIcon}
										onClick={(e) => {
											e.stopPropagation();
											handleDeleteFormClick(form);
										}}>
										<RiDeleteBin6Line size={"24px"} color="#F55050" />
									</span>
								</div>
						  ))
						: forms.map((form) => (
								<div
									key={form._id}
									className={styles.formSquare}
									onClick={() => handleFormClick(form._id)}>
									<span>{form.formname}</span>
									<span
										className={styles.formDeleteIcon}
										onClick={(e) => {
											e.stopPropagation();
											handleDeleteFormClick(form);
										}}>
										<RiDeleteBin6Line size={24} color="#F55050" />
									</span>
								</div>
						  ))}
					{isCreateFolderVisible && (
						<div className={styles.createFolderPopup}>
							<h3>Create New Folder</h3>
							<input
								type="text"
								placeholder="Enter folder name"
								value={folderName}
								onChange={(e) => setFolderName(e.target.value)}
							/>
							<div className={styles.createFolderActions}>
								<button onClick={handleCreateFolder}>Done</button>
								<button onClick={handleCancelCreateFolder}>Cancel</button>
							</div>
						</div>
					)}
					{isDeletePopupVisible && folderToDelete && (
						<div className={styles.deletePopup}>
							<h3>Are you sure you want to</h3>
							<h3>delete this folder?</h3>
							<div className={styles.deleteActions}>
								<button onClick={handleConfirmDeleteFolder}>Confirm</button>
								<button onClick={handleCancelDeleteFolder}>Cancel</button>
							</div>
						</div>
					)}
					{isDeletePopupVisible && formToDelete && (
						<div className={styles.deletePopup}>
							<h3>Are you sure you want to</h3>
							<h3>delete this form?</h3>
							<div className={styles.deleteActions}>
								<button onClick={handleConfirmDeleteForm}>Confirm</button>
								<button onClick={handleCancelDeleteForm}>Cancel</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Dashboard;

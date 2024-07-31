import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home_page/Home_page";
import Login from "./Pages/Login_page/Login_page";
import Signup from "./Pages/Signup_page/Signup_page";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectedRoute from "./Fallback";
import Settings from "./Pages/Settings_page/Settings_page";
import FormPage from "./Pages/Form_page/Form_page";
import ThemePage from "./Pages/Theme_page/Theme_page";
import Response from "./Pages/Response_page/Response_page";
import NotFound from "./components/NotFound";
import FormResponsePage from "./Pages/Formdata_page/Formdata_page";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		toast.success("User logged out successfully");
	};

	return (
		<div>
			<Toaster position="top-center" reverseOrder={false} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<Login handleLogin={handleLogin} />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/form/:userId/:formId" element={<FormPage />} />
				<Route path="/theme/:userId/:formId" element={<ThemePage />} />
				<Route
					path="/theme/:userId/:folderId/:formId"
					element={<ThemePage />}
				/>
				<Route path="/response/:userId/:formId" element={<Response />} />
				<Route
					path="/response/:userId/:folderId/:formId"
					element={<Response />}
				/>
				<Route
					path="/settings"
					element={<Settings handleLogout={handleLogout} />}
				/>
				<Route
					path="/dashboard/:userId"
					element={
						<ProtectedRoute isLoggedIn={isLoggedIn}>
							<Dashboard handleLogout={handleLogout} />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/dashboard/:userId/newform"
					element={
						<ProtectedRoute isLoggedIn={isLoggedIn}>
							<FormPage isNewForm={true} />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/dashboard/:userId/:folderId/newform"
					element={
						<ProtectedRoute isLoggedIn={isLoggedIn}>
							<FormPage isNewForm={true} />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/dashboard/:userId/:formId"
					element={
						<ProtectedRoute isLoggedIn={isLoggedIn}>
							<FormPage isNewForm={false} />
						</ProtectedRoute>
					}
				/>
				<Route path="/form/:uniqueUrl" element={<FormResponsePage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;

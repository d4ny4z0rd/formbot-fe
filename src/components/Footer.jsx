import styles from "./Footer.module.css";
import { CiShare1 } from "react-icons/ci";

const prodctList = [
	{
		name: "Status",
		icons: <CiShare1 />,
	},
	{
		name: "Documentation",
		icons: <CiShare1 />,
	},
	{
		name: "Roadmap",
		icons: <CiShare1 />,
	}
];
const Community = [
	{
		name: "Discord",
		icons: <CiShare1 />,
	},
	{
		name: "GitHub repository",
		icons: <CiShare1 />,
	},
	{
		name: "Twitter",
		icons: <CiShare1 />,
	},
	{
		name: "LinkedIn",
		icons: <CiShare1 />,
	}
];
const Company = [
	{
		name: "About",
	},
	{
		name: "Contact",
	},
	{
		name: "Terms of Service",
	},
	{
		name: "Privacy Policy",
	},
];

function Footer() {
	return (
		<div className={styles.footer}>

			<div className={`${styles.footerItem} open-sans`}>
				<ul>
					<li
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "10px",
							textDecoration: "underline",
							cursor: "pointer",
						}}>
						{prodctList.map((item, index) => {
							return (
								<div key={index} className={styles.prodctList}>
									<div>{item.name}</div>
									<div>{item.icons}</div>
								</div>
							);
						})}
					</li>
				</ul>
			</div>

			<div className={`${styles.footerItem} open-sans`}>
				<ul>
					<li
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "10px",
							textDecoration: "underline",
							cursor: "pointer",
						}}>
						{Community.map((item, index) => {
							return (
								<div key={index} className={styles.prodctList}>
									<div>{item.name}</div>
									<div>{item.icons}</div>
								</div>
							);
						})}
					</li>
				</ul>
			</div>

			<div className={`${styles.footerItem} open-sans`}>
				<ul>
					<li
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "10px",
							textDecoration: "underline",
							cursor: "pointer",
						}}>
						{Company.map((item, index) => {
							return (
								<div key={index} className={styles.prodctList}>
									<div>{item.name}</div>
									<div>{item.icons}</div>
								</div>
							);
						})}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Footer;

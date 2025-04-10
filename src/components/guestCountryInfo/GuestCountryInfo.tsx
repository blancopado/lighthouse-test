import classnames from "classnames";
import type { Growth } from "../../controllers/ProcessedGuestCountry";
import ProgressBar from "../progressBar/ProgressBar";
import styles from "./GuestCountryInfo.module.css";

interface GuestCountryInfoProps {
	countryName: string;
	value: number;
	total: number;
	growth: Growth;
}

const GuestCountryInfo = ({
	countryName,
	value,
	total,
	growth,
}: GuestCountryInfoProps) => {
	return (
		<div className={styles.guestCountryContainer}>
			<div className={styles.guestCountryItem}>
				<div className={styles.guestCountryItemHeaderContainer}>
					<h4>{countryName}</h4>
					<p>{value}</p>
				</div>
				<p
					className={classnames(
						styles.guestCountryYearGrowthText,
						styles[growth.color],
					)}
				>
					<span>{growth.sign} </span>
					{growth.absValue}
				</p>
			</div>

			<div className={styles.guestCountryItem}>
				<div className={styles.guestCountryItemProgressContainer}>
					<div className={styles.guestCountryItemProgress}>
						<ProgressBar current={value} total={total} />
					</div>
					<p className={styles.guestCountryLastYearText}>vs. Last year</p>
				</div>
			</div>
		</div>
	);
};

export default GuestCountryInfo;

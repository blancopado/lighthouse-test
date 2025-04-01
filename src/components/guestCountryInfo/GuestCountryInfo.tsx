import ProgressBar from "../progressBar/ProgressBar";
import styles from "./GuestCountryInfo.module.css";

interface GuestCountryInfoProps {
	countryName: string;
	value: number;
	total: number;
	growth: number;
}

const GuestCountryInfo = ({
	countryName,
	value,
	total,
	growth,
}: GuestCountryInfoProps) => {
	return (
		<div className={styles.cardRowContainer}>
			<div className={styles.cardRowItem}>
				<div className={styles.cardRowItemHeaderContainer}>
					<h4>{countryName}</h4>
					<p>{value}</p>
				</div>
				<p className={styles.cardRowYearGrowthText}>{growth}</p>
			</div>

			<div className={styles.cardRowItem}>
				<div className={styles.cardRowItemProgressContainer}>
					<div className={styles.cardRowItemProgress}>
						<ProgressBar current={value} total={total} />
					</div>
					<p className={styles.cardRowLastYearText}>vs. Last year</p>
				</div>
			</div>
		</div>
	);
};

export default GuestCountryInfo;

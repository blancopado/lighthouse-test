import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
	current: number;
	total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
	const safeTotal = total <= 0 ? 1 : total;
	const safeCurrent = Math.max(0, Math.min(current, safeTotal));
	const percentage = (safeCurrent / safeTotal) * 100;
	const isFullProgress = current >= total;

	return (
		<div className={styles.container}>
			<div
				className={styles.progress}
				style={{
					width: `${percentage}%`,
					borderRadius: isFullProgress ? "4px" : "4px 0 0 4px",
				}}
				role="progressbar"
				aria-valuenow={safeCurrent}
				aria-valuemin={0}
				aria-valuemax={safeTotal}
				tabIndex={0}
			/>
		</div>
	);
};

export default ProgressBar;

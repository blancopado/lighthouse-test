import styles from "./Card.module.css";

interface CardProps {
	children: React.ReactNode;
	title?: string;
}

const Card = ({ children, title }: CardProps) => {
	return (
		<div className={styles.card}>
			{title && (
				<div className={styles.header}>
					{title && <h3 className={styles.title}>{title}</h3>}
				</div>
			)}
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export default Card;

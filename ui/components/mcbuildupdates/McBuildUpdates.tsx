import styles from "./McBuildUpdates.module.less";

export interface IMcBuildUpdatesProps {
	color: string;
}

export function McBuildUpdates() {
	return (
		<div className={styles.wrapper}>
			<ul>
				{new Array(4).fill("").map((item, i) => (
					<li key={i}>
						<div className={styles.circle}>
							<span></span>
						</div>
						<div className={styles.line}></div>
						<div className={styles.flex}>
							<div className={styles.date}>
								<h6>Apr 1, 2021</h6>
							</div>
							<div className={styles.information}>
								<div>
									<h6>mc-build v2.10.3</h6>
								</div>
								<p>
									Today we're doing stuff, including other stuff and even more
									stuff. Come check the stuff out and more!
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

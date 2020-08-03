import React from "react";
import style from "./articleItem.module.css";
import { Link } from "react-router-dom";

export function ArticleItem(props) {
	return (
		<li className={style.articleItem}>
			<div className={style.infoPart}>
				<Link
					className={style.title}
					to={`/detail/${props.dataSource.id}`}
					rel="noopener noreferrer"
				>
					{props.dataSource.title}
				</Link>
				<p className={style.detail}>{props.dataSource.detail}</p>
				<div className={style.extraInfo}>
					{props.dataSource.diamond ? (
						<span className={style.diamond}>
							<svg
								className={["icon", style.iconDiamond].join(
									" "
								)}
								aria-hidden="true"
							>
								<use xlinkHref="#icon-diamond"></use>
							</svg>
							{props.dataSource.diamond}
						</span>
					) : null}
					{props.dataSource.authorName ? (
						<span className={style.author}>
							<Link
								to={`/u/${props.dataSource.authorId}`}
								rel="noopener noreferrer"
							>
								{props.dataSource.authorName}
							</Link>
						</span>
					) : null}
					{props.dataSource.commentsNumber ? (
						<span className={style.comment}>
							<Link
								to={`/detail/${props.dataSource.id}#comments`}
							>
								<svg
									className={["icon", style.iconComment].join(
										" "
									)}
									aria-hidden="true"
								>
									<use xlinkHref="#icon-pinglun2"></use>
								</svg>
								{props.dataSource.commentsNumber}
							</Link>
						</span>
					) : null}
					{props.dataSource.supportNumber ? (
						<span className={style.support}>
							<svg
								className={["icon", style.iconLove].join(" ")}
								aria-hidden="true"
							>
								<use xlinkHref="#icon-aixin"></use>
							</svg>
							{props.dataSource.supportNumber}
						</span>
					) : null}
					{props.dataSource.reward ? (
						<span className={style.support}>
							<svg
								className={["icon", style.iconShang].join(" ")}
								aria-hidden="true"
							>
								<use xlinkHref="#icon-shang"></use>
							</svg>
							{props.dataSource.reward}
						</span>
					) : null}
					{props.dataSource.ad ? (
						<span className={style.adMark}>广告</span>
					) : null}
				</div>
			</div>
			{props.dataSource.imgUrl ? (
				<div className={style.imgPart}>
					<a
						href={props.dataSource.url}
						className={style.imgRight}
						target="_blank"
						rel="noopener noreferrer"
					>
						<img src={props.dataSource.imgUrl} alt="" />
					</a>
				</div>
			) : null}
		</li>
	);
}

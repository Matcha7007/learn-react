import React from "react";

const containerStyle = {
	display: "flex",
	alignItems: "center",
	gap: "16px",
};

const containerStarStyle = {
	display: "flex",
	gap: "4px",
};

const textStyle = {
	lineHeight: "1",
	margin: "0",
};

export default function StarRatings({ maxRatings = 5 }) {
	return (
		<div style={containerStyle}>
			<div style={containerStarStyle}>
				{Array.from({ length: maxRatings }, (_, i) => (
					<span>s{i + 1}</span>
				))}
			</div>
			<p style={textStyle}>10</p>
		</div>
	);
}

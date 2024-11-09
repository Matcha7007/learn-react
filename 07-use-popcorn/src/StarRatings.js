import React from "react";

export default function StarRatings({ maxRatings }) {
	return (
		<div>
			<div>
				{Array.from({ length: maxRatings }, (_, i) => (
					<span>s{i + 1}</span>
				))}
				<p>10</p>
			</div>
		</div>
	);
}

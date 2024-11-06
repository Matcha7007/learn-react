import { StatsProps } from "../types";

export default function Stats({ items }: StatsProps) {
	if (!items.length)
		return (
			<p className="stats">
				<em>Start adding your some items to packing list</em>
			</p>
		);

	const numItems = items.length;
	const numPacked = items.filter((item) => item.packed).length;
	const percentage = Math.round((numPacked / numItems) * 100);
	return (
		<footer className="stats">
			<em>
				{percentage === 100
					? "You got everything! Ready to go ✈️"
					: `😜 You have ${numItems} items on your list, and you already packed ${numPacked} of ${numItems} (${percentage}%)`}
			</em>
		</footer>
	);
}
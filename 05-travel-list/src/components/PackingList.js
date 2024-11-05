import { useState } from "react";
import Item from "./Item";

export default function PackingList({
	items,
	onDeleteItem,
	onToggleItem,
	onClearList,
}) {
	const [sortBy, setSortBy] = useState("input");
	let sortedItems;
	const isClear = items.length > 0;

	if (sortBy === "input") sortedItems = items;
	if (sortBy === "description")
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	if (sortBy === "packed")
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));

	function handleClearList() {
		onClearList();
		setSortBy("input");
	}

	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item
						key={item.id}
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
						item={item}
					/>
				))}
			</ul>
			<div className="actions">
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value="input">Sort by input order</option>
					<option value="description">Sort by description</option>
					<option value="packed">Sort by packed status</option>
				</select>
				{isClear ? <button onClick={handleClearList}>Clear List</button> : null}
			</div>
		</div>
	);
}

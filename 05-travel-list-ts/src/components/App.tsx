import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import { ItemProps } from "../types";

export default function App() {
	const newItem: ItemProps[] = [];
	const [items, setItems] = useState(newItem);

	function handleAddItem(item: ItemProps) {
		setItems((items) => [...items, item]);
	}

	function handleDeleteItem(id: number) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	function handleToggleItem(id: number) {
		setItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	function handleClearList() {
		const confirmed = window.confirm(
			"Are you sure you want to delete all items?"
		);
		if (confirmed) setItems([]);
	}
	return (
		<div className="app">
			<Logo />
			<Form onAddItems={handleAddItem} />
			<PackingList
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
				onClearList={handleClearList}
				items={items}
			/>
			<Stats items={items} />
		</div>
	);
}

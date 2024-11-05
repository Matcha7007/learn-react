import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
	const [items, setItems] = useState([]);

	function handleAddItem(item) {
		setItems((items) => [...items, item]);
	}

	function handleDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	function handleToggleItem(id) {
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

	// karena component Form dan PackingList ini perlu state yang sama
	// sedangkan posisinya mereka siblings atau sejajar bukan parent - child
	// jadi perlu buat state nya di parent component dari Form dan PackingList
	// lalu untuk mengambil data dari Form dihandle oleh function handleAddItem, yang mana akan dipanggil dari Form saat submit untuk di-setItems
	// nah sedangkan array dari items ini dikirim ke PackingList untuk dirender

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

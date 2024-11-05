import { useState } from "react";

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

function Logo() {
	return <h1>🥳 Far Away 🙂‍↔️</h1>;
}

function Form({ onAddItems }) {
	const [quantity, setQuantity] = useState(1);
	const [description, setDescription] = useState("");

	function handleSubmit(e) {
		// e.preventDefault() untuk mencegah reload page / lainnya
		e.preventDefault();
		if (!description) return;

		const newItem = {
			description: description,
			quantity: quantity,
			packed: false,
			id: Date.now(),
		};

		onAddItems(newItem);

		setDescription("");
		setQuantity(1);
	}

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your 🤩 trip?</h3>
			<select
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}>
				{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
					<option key={num} value={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
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

function Item({ item, onDeleteItem, onToggleItem }) {
	return (
		<li>
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => onToggleItem(item.id)}
			/>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}

function Stats({ items }) {
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

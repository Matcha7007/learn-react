import { ItemComponentProps } from "../types";

export default function Item({
	item,
	onDeleteItem,
	onToggleItem,
}: ItemComponentProps) {
	return (
		<li>
			<input
				type="checkbox"
				value={String(item.packed)}
				onChange={() => onToggleItem(item.id)}
			/>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>❌</button>
		</li>
	);
}

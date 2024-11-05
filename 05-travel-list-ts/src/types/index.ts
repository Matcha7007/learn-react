export interface ItemProps {
	id: number;
	description: string;
	quantity: number;
	packed: boolean;
}

export interface FormProps {
	onAddItems: (item: ItemProps) => void;
}

export interface ItemComponentProps {
	item: ItemProps;
	onDeleteItem: (id: number) => void;
	onToggleItem: (id: number) => void;
}

export interface PackingListProps {
	items: ItemProps[];
	onClearList: () => void;
	onDeleteItem: (id: number) => void;
	onToggleItem: (id: number) => void;
}

export interface StatsProps {
	items: ItemProps[];
}

export const faultTypes = [
	{ key: "FAULT:SERVICE", label: "Faute de service", needsPlayer: true },
	{ key: "FAULT:NET", label: "Faute de filet", needsPlayer: true },
	{ key: "FAULT:BLOCK", label: "Faute de block", needsPlayer: true },
	{ key: "FAULT:PERSONAL", label: "Faute personnelle", needsPlayer: true },
	{
		key: "FAULT:ROTATION",
		label: "Faute de rotation (globale)",
		needsPlayer: false,
	},
];

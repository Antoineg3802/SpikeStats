"use client";

export default function Error({ error }: { error: Error }) {
	return (
		<div className="p-4 text-center">
			<h2 className="text-lg font-semibold text-red-600">
				Erreur de confirmation
			</h2>
		</div>
	);
}

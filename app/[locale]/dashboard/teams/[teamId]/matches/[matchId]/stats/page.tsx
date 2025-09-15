"use client";

import { use, useEffect, useState } from "react";
import { getMatchById } from "@/lib/action/match/match.action";
import { useAction } from "next-safe-action/hooks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";

const COLORS = [
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	"#d32f2f",
	"#7b1fa2",
];

export default function StatsPage({ params }: { params: Promise<{ matchId: string }> }) {
	const { matchId } = use(params);
	const { execute, result, status } = useAction(getMatchById);
	const [stats, setStats] = useState<any>(null);

	useEffect(() => {
		execute({ matchId });
	}, [matchId, execute]);

	useEffect(() => {
		if (status === "hasSucceeded" && result.data) {
			const match = result.data;
			const events = match.MatchEvent || [];

			// Fautes
			const faults = events.filter((e: any) =>
				e.type.startsWith("FAULT")
			);
			const faultsByType = faults.reduce((acc: any, e: any) => {
				acc[e.type] = (acc[e.type] || 0) + 1;
				return acc;
			}, {});

			// Points marqués
			const points = events.filter((e: any) =>
				["POINT", "ACE", "BLOCK", "SERVICE"].includes(e.type)
			);
			const pointsByType = points.reduce((acc: any, e: any) => {
				acc[e.type] = (acc[e.type] || 0) + 1;
				return acc;
			}, {});

			// Scores
			const score = match.result;

			console.log(score)

			setStats({
				faultsByType,
				pointsByType,
				score,
			});
		}
	}, [status, result.data]);

	if (!stats) return <p>Chargement des statistiques...</p>;

	const faultsData = Object.entries(stats.faultsByType).map(
		([key, value]) => ({
			name: key,
			value,
		})
	);

	const pointsData = Object.entries(stats.pointsByType).map(
		([key, value]) => ({
			name: key,
			value,
		})
	);

	return (
		<div className="p-6 grid gap-6 overflow-auto">
			{/* Résumé du match */}
			<Card>
				<CardHeader>
					<CardTitle>Résumé du match</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex justify-between text-2xl font-bold mb-4">
						<span>{result.data?.team?.name || "Équipe"}</span>
						<span>
							{stats.score}
						</span>
						<span>{result.data?.oponentName || "Adversaire"}</span>
					</div>
				</CardContent>
			</Card>

			{/* Graphique des fautes */}
			<Card>
				<CardHeader>
					<CardTitle>Répartition des fautes</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={faultsData}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={100}
								fill="#8884d8"
								label
							>
								{faultsData.map((entry, index) => (
									<Cell
										key={index}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			{/* Graphique des points */}
			<Card>
				<CardHeader>
					<CardTitle>Points par type d’action</CardTitle>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={pointsData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="value" fill="#1976d2" />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		</div>
	);
}

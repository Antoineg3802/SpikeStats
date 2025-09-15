"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const basePointTypes = ["POINT", "ACE", "BLOCK", "SERVICE"] as const;

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
] as const;

export type BasePointType = (typeof basePointTypes)[number];
export type FaultType = (typeof faultTypes)[number]["key"];
export type PointType = BasePointType | FaultType;

export interface Player {
	id: string;
	name: string;
	position: string;
	onCourt?: boolean;
}

export interface PointEvent {
	id: string;
	teamId: string;
	playerId?: string;
	type: PointType;
	timestamp: Date;
}

interface MatchState {
	players: Player[];
	starting: Record<string, Player | null>;
	score: Record<string, number>;
	points: PointEvent[];
	timeouts: Record<string, number>;

	// Actions
	setPlayers: (players: Player[]) => void;
	setOnCourt: (playerIds: string[]) => void;
	selectStarter: (pos: string, player: Player) => void;
	addPoint: (
		teamId: string,
		playerId: string | undefined,
		type: PointType
	) => void;
	addTimeout: (teamId: string) => void;
}

export const useMatchStore = create<MatchState>()(
	persist(
		(set, get) => ({
			players: [],
			starting: {},
			score: {},
			points: [],
			timeouts: {},

			setPlayers: (players) => set({ players }),

			setOnCourt: (playerIds) =>
				set((state) => ({
					players: state.players.map((p) => ({
						...p,
						onCourt: playerIds.includes(p.id),
					})),
				})),

			selectStarter: (pos, player) =>
				set((state) => ({
					starting: { ...state.starting, [pos]: player },
				})),

			addPoint: (teamId, playerId, type) =>
				set((state) => {
					const event: PointEvent = {
						id: crypto.randomUUID(),
						teamId,
						playerId,
						type,
						timestamp: new Date(),
					};

					return {
						points: [...state.points, event],
						score: {
							...state.score,
							[teamId]: (state.score[teamId] || 0) + 1,
						},
					};
				}),

			addTimeout: (teamId) =>
				set((state) => {
					const current = state.timeouts[teamId] || 0;
					if (current >= 2) {
						alert(
							"Cette équipe a déjà utilisé ses 2 temps morts !"
						);
						return state;
					}
					return {
						timeouts: { ...state.timeouts, [teamId]: current + 1 },
					};
				}),
		}),
		{ name: "match-storage" }
	)
);

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type PointType = "POINT" | "FAULT" | "ACE" | "BLOCK";

interface Player {
	id: string;
	name: string;
	position: string;
}

interface PointEvent {
	id: string;
	teamId: string;
	playerId?: string;
	type: PointType;
	timestamp: Date;
}

interface Substitution {
	id: string;
	playerOutId: string;
	playerInId: string;
	timestamp: Date;
}

interface Timeout {
	id: string;
	teamId: string;
	timestamp: Date;
}

interface MatchState {
	players: Player[];
	starting: Record<string, Player | null>; // par poste
	points: PointEvent[];
	subs: Substitution[];
	timeouts: Timeout[];
	score: Record<string, number>;

	setPlayers: (players: Player[]) => void;
	selectStarter: (position: string, player: Player) => void;
	addPoint: (teamId: string, playerId?: string, type?: PointType) => void;
	addSub: (playerOutId: string, playerInId: string) => void;
	addTimeout: (teamId: string) => void;
	reset: () => void;
}

export const useMatchStore = create<MatchState>()(
	persist(
		(set) => ({
			players: [],
			starting: {
				SETTER: null,
				LIBERO: null,
				OUTSIDEHITTER: null,
				MIDDLEBLOCKER: null,
				OPPOSITEHITTER: null,
			},
			points: [],
			subs: [],
			timeouts: [],
			score: {},

			setPlayers: (players) => set({ players }),

			selectStarter: (position, player) =>
				set((state) => ({
					starting: { ...state.starting, [position]: player },
				})),

			addPoint: (teamId, playerId, type = "POINT") =>
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

			addSub: (playerOutId, playerInId) =>
				set((state) => ({
					subs: [
						...state.subs,
						{
							id: crypto.randomUUID(),
							playerOutId,
							playerInId,
							timestamp: new Date(),
						},
					],
				})),

			addTimeout: (teamId) =>
				set((state) => ({
					timeouts: [
						...state.timeouts,
						{
							id: crypto.randomUUID(),
							teamId,
							timestamp: new Date(),
						},
					],
				})),

			reset: () =>
				set({
					players: [],
					starting: {},
					points: [],
					subs: [],
					timeouts: [],
					score: {},
				}),
		}),
		{
			name: "match-storage", // sauvegarde dans localStorage
		}
	)
);

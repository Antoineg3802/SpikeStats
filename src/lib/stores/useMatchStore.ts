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
export type ExtraType = "TIMEOUT" | "SUBSTITUTION";
export type PointType = BasePointType | FaultType | ExtraType;

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
	setNumber: number;
	metadata?: Record<string, any>;
}

interface MatchState {
	players: Player[];
	starting: Record<string, Player | null>;
	score: Record<string, number>;
	points: PointEvent[];
	currentSet: number;
	timeouts: Record<string, number>;
	substitutions: Record<string, number>;
	setsWon: Record<string, number>;
	matchFinished?: boolean;

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
	substitutePlayer: (teamId: string, outId: string, inId: string) => void;
	resetForNewSet: () => void;
}

export const createMatchStore = (matchId: string) =>
	create<MatchState>()(
		persist(
			(set, get) => ({
				players: [],
				starting: {},
				score: {},
				points: [],
				timeouts: {},
				substitutions: {},
				setsWon: {},
				currentSet: 1,

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
							setNumber: state.currentSet,
						};

						const newScore = {
							...state.score,
							[teamId]: (state.score[teamId] || 0) + 1,
						};

						// Ids des équipes
						const teamIds = Object.keys(newScore);
						const opponentId =
							teamIds.find((id) => id !== teamId) || "opponent";

						const teamScore = newScore[teamId];
						const opponentScore = newScore[opponentId] || 0;

						// Sets déjà gagnés
						const setsWon = { ...state.setsWon };
						const teamSets = setsWon[teamId] || 0;
						const opponentSets = setsWon[opponentId] || 0;

						// Règles tie-break
						const isTiebreak = teamSets === 2 && opponentSets === 2;
						const pointsToWin = isTiebreak ? 15 : 25;

						let reset = false;
						let matchFinished = false;

						// Condition victoire du set
						if (
							teamScore >= pointsToWin &&
							teamScore - opponentScore >= 2
						) {
							setsWon[teamId] = teamSets + 1;
							reset = true;

							// Fin du match si 3 sets
							if (setsWon[teamId] === 3) {
								matchFinished = true;
							}
						}

						return {
							points: [...state.points, event],
							score: reset ? {} : newScore,
							setsWon,
							timeouts: reset ? {} : state.timeouts,
							substitutions: reset ? {} : state.substitutions,
							players: reset
								? state.players.map((p) => ({
										...p,
										onCourt: false,
								  }))
								: state.players,
							currentSet: reset
								? state.currentSet + 1
								: state.currentSet,
							matchFinished,
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
						const event: PointEvent = {
							id: crypto.randomUUID(),
							teamId,
							type: "TIMEOUT",
							setNumber: state.currentSet,
						};
						return {
							points: [...state.points, event],
							timeouts: {
								...state.timeouts,
								[teamId]: current + 1,
							},
						};
					}),

				substitutePlayer: (teamId, outId, inId) =>
					set((state) => {
						const currentSubs = state.substitutions[teamId] || 0;
						if (currentSubs >= 6) {
							alert(
								"Cette équipe a déjà utilisé ses 6 remplacements !"
							);
							return state;
						}

						const players = state.players.map((p) => {
							if (p.id === outId) return { ...p, onCourt: false };
							if (p.id === inId) return { ...p, onCourt: true };
							return p;
						});

						const event: PointEvent = {
							id: crypto.randomUUID(),
							teamId,
							playerId: inId,
							type: "SUBSTITUTION",
							setNumber: state.currentSet,
							metadata: { outId, inId },
						};

						return {
							players,
							points: [...state.points, event],
							substitutions: {
								...state.substitutions,
								[teamId]: currentSubs + 1,
							},
						};
					}),

				resetForNewSet: () =>
					set((state) => ({
						score: {},
						timeouts: {},
						substitutions: {},
						players: state.players.map((p) => ({
							...p,
							onCourt: false,
						})),
						currentSet: state.currentSet + 1,
					})),
			}),
			{ name: `match-storage-${matchId}` }
		)
	);

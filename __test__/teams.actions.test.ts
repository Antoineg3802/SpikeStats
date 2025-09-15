import mockPrisma from "../__mocks__/@/lib/prisma/prisma";
import { createTeam } from "@/lib/action/team/team.action";
import { TeamDashboardExtended } from "@/datas/Teams/team";

jest.mock("@/lib/prisma/prisma", () =>
	require("../__mocks__/@/lib/prisma/prisma")
);

describe("createTeam", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("retourne null si user non connecté", async () => {
		const result = await createTeam(
			{ teamName: "Nom", description: "Desc" },
		);
		expect(result).toBeNull();
	});

	it("retourne null si la team existe déjà", async () => {
		(mockPrisma.team.findFirst as jest.Mock).mockResolvedValueOnce({
			id: "existing",
		});
		const result = await createTeam(
			{ teamName: "Nom", description: "Desc" }
		);
		expect(result).toBeNull();
	});

	it("crée la team si elle n’existe pas", async () => {
		(mockPrisma.team.findFirst as jest.Mock).mockResolvedValueOnce(null); // pas de team existante
		(mockPrisma.team.create as jest.Mock).mockResolvedValueOnce({
			id: "newteam",
			name: "Nom",
			createdAt: new Date(),
			description: "Desc",
			ownerId: "1",
			logo: null,
			teamMembers: [],
		});
		// il faudra aussi mock generateCode, soit via un spy, soit comme ci-dessous :
		jest.spyOn(global, "Math").mockImplementationOnce(
			() => ({ random: () => 0.1 } as Math)
		); // pas toujours obligatoire
		const result = await createTeam(
			{ teamName: "Nom", description: "Desc" }
		);
		expect(result).toMatchObject({ id: "newteam", name: "Nom" });
	});
});

const mockPrisma = {
	team: {
		findFirst: jest.fn(),
		create: jest.fn(),
		findMany: jest.fn(),
	},
	teamMember: {
		findFirst: jest.fn(),
		create: jest.fn(),
	},
};
export default mockPrisma;

export interface Team{
    id: number;
    name: string;
    description: string;
    members: UserSimplified[]
}

interface UserSimplified{
    id : number;
    name: string;
    role: string;
}
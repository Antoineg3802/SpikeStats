export interface AllMatches{
    passed: Match[];
    incoming: Match[];
}

export interface Match{
    id : number
    date : string
    opponent : string
    location : string
}

export interface MatchDetails{
    id: number
    date: string
    team_id: number
    opponent: string
    location: string
    sets: Set[]
}

interface Set{
    id: number
    match_id: number
    number_set: number
    start_set: number
    end_set: string
    team_score: number
    opponent_score: number
    winner: boolean
    points: Points
}

interface Points{
    teamPoints: PointFault[]
    teamFaults: PointFault[]
    opponentPoints: PointFault[]
    opponentFaults: PointFault[]
}

interface PointFault{
    name: string
    team_points: number
    oponent_points: number
    player: string
}
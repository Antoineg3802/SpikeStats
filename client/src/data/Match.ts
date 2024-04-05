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
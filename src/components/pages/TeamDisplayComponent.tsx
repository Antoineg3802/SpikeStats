"use client"
import { TeamDashboardExtended } from "@/datas/Teams/team";
import Loader from "../atoms/Loader";
import { useEffect, useState } from "react";
import { getTeamById } from "@/lib/action/team/team.action";
import DashboardPageTitle from "../atoms/Titles/DashboardPageTitle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Session } from "@/datas/session";
import { Button } from "../ui/button";

interface TeamDisplayComponentProps {
    teamId: string;
    session: Session | null;
}

export default function TeamDisplayComponent({ teamId, session }: TeamDisplayComponentProps) {
    const [team, setTeam] = useState<TeamDashboardExtended | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isMounted) return;
        setIsMounted(true);
        const fetchData = async () => {
            const response = await getTeamById({ teamId });
            if (response?.data) {
                setTeam(response.data);
            } else {
                setTeam(null);
            }
            setIsLoading(false);
        };
        fetchData()
    }, [])

    if (isLoading) {
        return <Loader />
    } else {
        if (!team) {
            return (
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Erreur</h1>
                    <p>Une erreur est survenue lors de la récupération de l'équipe.</p>
                </div>
            )
        } else {
            return (
                <div className="h-full grid grid-cols-6 grid-rows-[10%_repeat(4,_1fr)] gap-4 p-4">
                    <div className="row-start-1 row-end-2 col-start-1 col-end-7">
                        <DashboardPageTitle title={team.name} />
                        <p className="text-gray-500">{team.description}</p>
                    </div>
                    <Card className="row-start-2 row-end-4 col-start-1 col-end-3">
                        <CardHeader>
                            <CardTitle>Membre de l'équipe</CardTitle>
                            <CardDescription>
                                Vous pouvez gérer les membres de votre équipe ici.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            {team.teamMembers.map((member) => {
                                const initials = member.user.name
                                    .split(" ")
                                    .map((name) => name.charAt(0).toUpperCase())
                                    .join("")
                                    .slice(0, 2);
                                return (
                                    <div className="flex items-center justify-between space-x-4" key={member.id}>
                                        <div className="flex items-center space-x-4">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={member.user.image} alt="Image" />
                                                <AvatarFallback>{initials}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium leading-none">{member.user.name}</p>
                                                <p className="text-sm text-muted-foreground">{member.user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </CardContent>
                    </Card>
                    <Card className="row-start-2 row-end-4 col-start-3 col-end-7">
                        <CardHeader>
                            <CardTitle>Statistiques</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Vous retrouverez ici les statistiques de votre équipe.
                        </CardContent>
                        <CardFooter>
                            <Button variant='default'>Voir toutes les statistiques</Button>
                        </CardFooter>
                    </Card>
                    <Card className="row-start-4 row-end-6 col-start-1 col-end-5">
                        <CardContent>
                            <p>titutututututuu</p>
                        </CardContent>
                    </Card>
                    <Card className="row-start-4 row-end-6 col-start-5 col-end-7">
                        <CardContent>
                            <p>uuuuuuuu</p>
                        </CardContent>
                    </Card>
                </div>
            )
        }
    }

}
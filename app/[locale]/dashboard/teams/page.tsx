"use client";
import DashboardPageTitle from "@/components/atoms/Titles/DashboardPageTitle";
import DashboardPage from "@/components/pages/DashboardPage";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Session } from "@/datas/session";
import { ArrowRight, CircleCheck, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DynamicForm } from "@/components/molecules/DynamicForm";
import { Modale } from "@/components/organisms/Modale";
import { Field } from "@/datas/form";
import { createTeam, getUserTeams } from "@/lib/action/team/team.action";
import { TeamDashboardExtended } from "@/datas/Teams/team";
import { toast, Toaster } from "sonner"
import Link from "next/link";
import Loader from "@/components/atoms/Loader";

export default function Page() {
    const session = useSession().data as Session | null;
    const [userTeams, setUserTeams] = useState<TeamDashboardExtended[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const formFields: Field[] = [{ name: "teamName", type: "text", label: "Nom de l'équipe", required: true }, { name: "description", type: "textarea", label: "Description de l'équipe", required: false }]

    function handleFormSubmit(values: { teamName: string, description: string }): void {
        createTeam(values).then((res) => {
            if (res?.data && res.data !== null) {
                setUserTeams([...userTeams, res.data]);
                setShowForm(false);
                toast.success("L'équipe a été créée",
                    {
                        duration: 1500,
                        icon: <CircleCheck className="text-green-500" />
                    }
                )
            } else {
                toast.error("Une erreur est survenue lors de la création de l'équipe.");
            }
        })
    }

    useEffect(() => {
        if (!session) {
            setUserTeams([]);
        } else {
            getUserTeams()
                .then((res) => {
                    if (res && res.data) {
                        setUserTeams(res.data);
                    } else {
                        setUserTeams([]);
                    }
                })
        }
        setIsLoading(false);
    }, [])

    return <DashboardPage session={session}>
        {isLoading ? (
            <div className="h-full w-full flex align-middle">
                <Loader />
            </div>
        ) : (
            <>
                <DashboardPageTitle title="Gestionnaire d'équipes" />
                <div className="mb-4">
                    <p className="text-sm text-gray-500">
                        Cette page vous permet de gérer les équipes de votre organisation.
                    </p>
                    <p className="text-sm text-gray-500">
                        Vous pouvez ajouter, modifier ou supprimer des équipes.
                    </p>
                </div>

                <Button variant="outline" className="border-2 absolute top-8 right-8" onClick={() => setShowForm(true)}>
                    <Plus />
                    Ajouter une équipe
                </Button>

                <Toaster />

                <Modale open={showForm} onClose={() => setShowForm(false)} title="Ajouter une équipe" description="Remplissez le formulaire ci-dessous pour ajouter une équipe.">
                    <DynamicForm fields={formFields} onSubmit={function (values: { teamName: string, description: string }): void {
                        handleFormSubmit(values);
                    }} />
                </Modale>

                <div className="flex flex-col items-stretch gap-4 mb-4">
                    {userTeams.length === 0 ? (
                        <p className="text-center stretch my-auto h-fit text-gray-500">Aucune équipe trouvée.</p>
                    ) : userTeams.map((team) => {
                        let date = new Date(team.createdAt).toLocaleDateString("fr-FR");
                        let description = team.description.length > 150 ? team.description.substring(0, 150) + "..." : team.description;
                        return (
                            <Link href={`/dashboard/teams/${team.id}`} key={team.id} prefetch={true}>
                                <Card key={team.id} className="m-w-1/2 w-full group gap-2 p-3 hover:border-primary hover:bg-primary/5 duration-200 relative overflow-hidden">
                                    <CardTitle className="group-hover:text-primary duration-200 text-xl">{team.name} {session?.user.id === team.ownerId ? <small className="text-sm text-primary">(gérant)</small> : ""}</CardTitle>
                                    <CardDescription className="flex flex-col gap-2">
                                        <p>{description}</p>
                                        <small>Créée le {date}</small>
                                    </CardDescription>
                                    <ArrowRight height={36} width={36} className="absolute stroke-2 text-primary top-1/2 right-[-50px] group-hover:right-4 duration-150 translate-y-[-50%]" />
                                </Card>
                            </Link>
                        )
                    })}
                </div>
            </>
        )}

    </DashboardPage>
}
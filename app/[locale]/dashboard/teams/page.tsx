"use client";
import DashboardPageTitle from "@/components/atoms/Titles/DashboardPageTitle";
import DashboardPage from "@/components/pages/DashboardPage";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Session } from "@/datas/session";
import { CircleCheck, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DynamicForm } from "@/components/molecules/DynamicForm";
import { Modale } from "@/components/organisms/Modale";
import { Field } from "@/datas/form";
import { createTeam, getUserTeams } from "@/lib/action/team/team.action";
import { TeamDashboardExtended } from "@/datas/Teams/team";
import { toast, Toaster } from "sonner"

export default function Page() {
    const session = useSession().data as Session | null;
    const [userTeams, setUserTeams] = useState<TeamDashboardExtended[]>([]);
    const [showForm, setShowForm] = useState(false);
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
    }, [])

    return <DashboardPage session={session}>
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

        <div className="flex flex-wrap mb-4 p-2">
            {userTeams.length === 0 ? (
                <p className="text-center my-auto h-fit text-gray-500">Aucune équipe trouvée.</p>
            ) : userTeams.map((team) => (
                <Card key={team.id} className="w-1/2">
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription>
                        <p>{team.description}</p>
                        <p></p>

                        {session?.user.id === team.ownerId && (
                            <>
                                <button className="bg-blue-500 text-white py-2 px-4 rounded">Modifier</button>
                                <button className="bg-red-500 text-white py-2 px-4 rounded">Supprimer</button>
                            </>
                        )}
                    </CardDescription>
                </Card>
            ))
            }
        </div>

        <div className="position"></div>
    </DashboardPage>
}
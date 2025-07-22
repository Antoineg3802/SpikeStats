import Link from "next/link";
import { Button } from "../ui/button";

export interface WaintingListConfirmProps {
	confirmationUrl: string;
}

export default function WaintingListConfirm({confirmationUrl}: WaintingListConfirmProps) {
	return <div className="bg-white p-4 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Inscription réussie</h2>
        Merci de vous être inscrit à la liste d'attente. Un e-mail de confirmation a été envoyé à votre adresse. Veuillez cliquer sur le lien dans l'e-mail pour confirmer votre inscription. Si vous ne voyez pas l'e-mail, vérifiez votre dossier de spam ou de courrier indésirable. Si vous avez des questions, n'hésitez pas à nous contacter.
        <a className="bg-primary text-primary-foreground shadow-xs hover:bg-primary/90" href={confirmationUrl}>Confirmer mon compte</a>
    </div>;
}

import { sign } from "crypto";

export default {
	hello: "Bonjour",
	"hello.world": "Bienvenue au monde!",
	welcome: "Bienvenue {name}!",
	signed: "Connecté en tant que {email}",
	notSigned: "Non connecté",
} as const;

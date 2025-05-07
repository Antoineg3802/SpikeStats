import { createTransport } from "nodemailer";

export async function sendVerificationRequest(params: {
	identifier: any;
	url: any;
	provider: any;
}) {
	const { identifier, url, provider } = params;
	const { host } = new URL(url);
	// NOTE: You are not required to use `nodemailer`, use whatever you want.
	const transport = createTransport(provider.server);

	try {
		const result = await transport.sendMail({
			to: identifier,
			from: provider.from,
			subject: `Votre lien de connexion vers SpikeStats !`,
			text: text({ url, host }),
			html: html({ url, host }),
		});

		// Vérification des destinataires rejetés
		if (result.rejected.length > 0) {
			console.error(
				`L'envoi a échoué pour les destinataires suivants : ${result.rejected.join(
					", "
				)}`
			);
			throw new Error(
				`Email(s) non envoyé(s) à : ${result.rejected.join(", ")}`
			);
		}
	} catch (error) {
		console.error("Erreur lors de l'envoi de l'email :", error);
		throw error; // Vous pouvez personnaliser la gestion de l'erreur ici
	}
}

// TODO customize mail template
function html(params: { url: string; host: string }) {
	const { url } = params;

	console.log(url);

	const brandColor = "#feb272";
	const color = {
		background: "#f9f9f9",
		text: "#000",
		mainBackground: "#fff",
		buttonBackground: brandColor,
		buttonBorder: brandColor,
		buttonText: "#fff",
	};

	return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Votre lien de connexion vers SpikeStats : 
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Se connecter</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Si cette demande ne provient pas de vous, ignorer simplement ce mail.
      </td>
    </tr>
	<tr>
	  <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Bonne navigation sur SpikeStats !
      </td>
	</tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
	return `Sign in to ${host}\n${url}\n\n`;
}

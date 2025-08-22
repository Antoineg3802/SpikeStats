interface LoginEmailProps {
	url: string;
}

export default function LoginEmail({ url }: LoginEmailProps) {
	return (
		<div className="bg-[#f9f9f9] py-8 px-4">
			<div className="bg-white max-w-[600px] mx-auto rounded-lg p-6 text-center">
				<h1 className="text-[22px] font-sans text-black mb-6">
					Votre lien de connexion vers SpikeStats :
				</h1>

				<div className="mb-6">
					<a
						href={url}
						target="_blank"
						className="inline-block text-white text-[18px] font-bold font-sans no-underline rounded-md px-5 py-2 border border-[#feb272] bg-[#feb272]"
					>
						Se connecter
					</a>
				</div>

				<p className="text-[16px] leading-[22px] font-sans text-black mb-2">
					Si cette demande ne provient pas de vous, ignorez simplement
					ce mail.
				</p>

				<p className="text-[16px] leading-[22px] font-sans text-black">
					Bonne navigation sur SpikeStats !
				</p>
			</div>
		</div>
	);
}

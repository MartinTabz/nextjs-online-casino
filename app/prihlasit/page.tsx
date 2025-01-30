import { redirect } from "next/navigation";
import { login } from "./actions";
import { createClient } from "@/utils/supabase/server";

export default async function RegisterPage() {
	const supabase = await createClient();

	const { data } = await supabase.auth.getUser();

	if (data?.user) {
		redirect("/");
	}

	return (
		<section className="bg-blue-600 w-full h-dvh flex items-center justify-center py-2">
			<form>
				<div className="bg-white w-full max-w-[500px] rounded-lg shadow text-center px-5 py-2 flex flex-col gap-2">
					<h1 className="text-3xl font-bold py-5">Přihlášení</h1>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="E-Mail"
						className="border border-gray-400 rounded-md p-2 text-base w-full min-w-[290px]"
					/>
					<input
						id="password"
						name="password"
						type="password"
						placeholder="Heslo"
						className="border border-gray-400 rounded-md p-2 text-base w-full min-w-[290px]"
					/>
					<button
						className="bg-blue-600 my-3 cursor-pointer hover:bg-blue-700 w-full h-12 flex items-center justify-center rounded-md font-bold text-white"
						formAction={login}
					>
						Přihlásit
					</button>
				</div>
			</form>
		</section>
	);
}

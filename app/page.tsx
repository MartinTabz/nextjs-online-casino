import { createClient } from "@/utils/supabase/server";

export default async function IndexPage() {
	const supabase = await createClient();

	const { data } = await supabase.auth.getUser();

	return (
		<section>
			<h1>Ahoj {!data?.user ? "anonymní uživateli" : data.user.email}!</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</section>
	);
}

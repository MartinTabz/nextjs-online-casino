"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
	const supabase = await createClient();

	if (
		(formData.get("passwordAgain") as string) !=
		(formData.get("password") as string)
	) {
		revalidatePath("/registrovat", "page");
	}

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("passwordAgain") as string,
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		revalidatePath("/registrovat", "page");
	}

	revalidatePath("/", "layout");
	redirect("/");
}

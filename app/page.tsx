import { SignOut } from "@/components/sign-out";
import { getServerSession } from "@/lib/server-session";

export default async function Home() {
	const session = await getServerSession();

	console.log(session);

	return (
		<div>
			<h1>Home</h1>
			{session && <SignOut />}
		</div>
	);
}

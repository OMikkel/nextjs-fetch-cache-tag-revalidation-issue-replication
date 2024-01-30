import { getUser } from "@/lib/getUser";
import { revalidateUser, updateUserName } from "./actions";
import { promises } from "fs";
import { revalidateTag } from "next/cache";

export default async function Home() {
	const databaseContent = await promises.readFile(
		process.cwd() + "/src/app/user.json",
		"utf-8"
	);
	const user = await getUser("johndoe+123@gmail.com");

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="text-2xl text-slate-900 font-semibold">
				Replication of Vercel fetch cache revalidation issue
			</h1>
			<div className="grid grid-cols-2">
				<div>
					<h2 className="text-xl text-slate-900 font-semibold">
						User data fetched from database
					</h2>
					<pre className="text-slate-900">{databaseContent}</pre>
					<p>Revalidation tag: {JSON.parse(databaseContent).email}</p>
				</div>
				<div>
					<h2 className="text-xl text-slate-900 font-semibold">
						User data fetched from API
					</h2>
					<pre className="text-slate-900">{JSON.stringify(user, null, 2)}</pre>
					<p>Revalidation tag: {user.email}</p>
				</div>
			</div>
			<form action={updateUserName} className="flex items-end gap-2">
				<div className="space-y-1">
					<label htmlFor="name">User Name:</label>
					<input
						type="text"
						name="name"
						id="name"
						defaultValue={user.name}
						className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ring-ring ring-1 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
				<input type="hidden" name="email" id="email" value={user.email} />
				<button
					type="submit"
					className="bg-blue-500 px-4 py-1.5 rounded-md text-white"
				>
					Update name
				</button>
			</form>
			<div className="grid grid-cols-2 gap-10">
				<form
					action={async () => {
						"use server";
						revalidateTag(encodeURIComponent(`user-${user.email}`));
					}}
				>
					<p>
						Tag: <code>{encodeURIComponent(user.email)}</code>
					</p>
					<button
						type="submit"
						className="bg-blue-500 px-4 py-1 rounded-md text-white"
					>
						Revalidate with encoded tag
					</button>
				</form>
				<form
					action={async () => {
						"use server";
						revalidateTag(`user-${user.email}`);
					}}
				>
					<p>
						Tag: <code>{user.email}</code>
					</p>
					<button
						type="submit"
						className="bg-blue-500 px-4 py-1 rounded-md text-white"
					>
						Revalidate with tag
					</button>
				</form>
			</div>
		</main>
	);
}

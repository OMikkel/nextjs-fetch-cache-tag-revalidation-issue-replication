import ReloadButton from "@/components/reloadButton";
import { getTime } from "@/lib/getTime";
import { revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

export default async function Home() {
	const currentTime = new Date().toISOString();
	const time = await getTime();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
			<h1 className="text-2xl text-slate-900 font-semibold">
				Replication of Vercel fetch cache revalidation issue
			</h1>
			<div className="grid grid-cols-2 gap-10">
				<ReloadButton />
				<div>
					<h2 className="text-xl text-slate-900 font-semibold">Current time</h2>
					<pre className="text-slate-900">{currentTime}</pre>
				</div>
				<div>
					<h2 className="text-xl text-slate-900 font-semibold">
						Cached time from API
					</h2>
					<pre className="text-slate-900">{time.time}</pre>
					<p>
						Tag: <code>{"tag-with+123"}</code>
					</p>
				</div>
				<form
					action={async () => {
						"use server";
						revalidateTag(encodeURIComponent("tag-with+123"));
					}}
				>
					<p>
						Tag: <code>{encodeURIComponent("tag-with+123")}</code>
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
						revalidateTag("tag-with+123");
					}}
				>
					<p>
						Tag: <code>{"tag-with+123"}</code>
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

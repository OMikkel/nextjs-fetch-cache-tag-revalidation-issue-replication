"use client";

import { useRouter } from "next/navigation";

export default function ReloadButton() {
	const router = useRouter();
	return (
		<button
			onClick={() => router.refresh()}
			className="bg-blue-500 px-4 py-1 rounded-md text-white"
		>
			Reload
		</button>
	);
}

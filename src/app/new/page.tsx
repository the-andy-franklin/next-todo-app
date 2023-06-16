import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
	"use server";

	const title = data.get("title")?.valueOf();
	if (typeof title !== "string" || title.length === 0) {
		return new Error("Invalid title");
	}

	await prisma.todo.create({ data: { title } });
	redirect("/");
}

export default function Page() {
	return (
		<>
			<header className="flex justify-between items-center mb-4">
				<h1 className="text-2xl">New</h1>
			</header>
			<form action={createTodo} className="flex gap-2 flex-col">
				<input
					type="text"
					name="title"
					className="
            border rounded
            px-2 py-1
            border-slate-300
            text-slate-300
            hover:bg-slate-700
            focus-within:bg-slate-700
            outline-none
          "
				/>
				<div className="flex gap-1 justify-end">
					<Link
						href=".."
						className="
              border rounded
              px-2 py-1
              border-slate-300
              text-slate-300
              hover:bg-slate-700
              focus-within:bg-slate-700
              outline-none
            "
					>
						Cancel
					</Link>
					<button
						type="submit"
						className="
              border rounded
              px-2 py-1
              border-slate-300
              text-slate-300
              hover:bg-slate-700
              focus-within:bg-slate-700
              outline-none
            "
					>
						Submit
					</button>
				</div>
			</form>
		</>
	);
}

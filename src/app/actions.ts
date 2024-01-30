"use server"

import { getUser } from "@/lib/getUser"
import { promises } from "fs"
import { revalidateTag } from "next/cache"

export const updateUserName = async (formData: FormData) => {
    const name = formData.get("name") as string || ""
    const email = formData.get("email") as string || ""

    const user = await getUser(email)

    await promises.writeFile(process.cwd() + "/src/app/user.json", JSON.stringify({ ...user, name }, null, 2), "utf-8")

    return
}

export const revalidateUser = async (formData: FormData) => {
    const email = formData.get("email") as string || ""
    const encodeTag = formData.get("encodeTag") as unknown as boolean || false

    revalidateTag(encodeTag ? encodeURIComponent(`user-${email}`) : `user-${email}`)
}
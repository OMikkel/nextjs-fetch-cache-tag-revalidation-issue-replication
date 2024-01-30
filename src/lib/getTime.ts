export const getTime = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/time`, {
        cache: "force-cache",
        next: {
            tags: ["tag-with+123"]
        }
    });
    if (!response.ok) return {
        time: "No Date"
    }
    const data = await response.json();

    return data;
}
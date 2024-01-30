export const getUser = async (email: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/user`, {
        next: {
            tags: [`user-${email}`]
        }
    });
    const data = await response.json();

    return data;
}
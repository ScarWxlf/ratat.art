
export const actions = {
    public_profile: async ({ request, locals }) => {
        const data = await request.formData();
        const username = data.get('username');
        console.log(locals.user)

    }
}
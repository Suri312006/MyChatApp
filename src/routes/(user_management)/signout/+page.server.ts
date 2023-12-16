import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {

    const {error: err} = await locals.supabase.auth.signOut()
    
    if (err){
    return {
        success:false
    };
    }
return {
    success: true
}
}) satisfies PageServerLoad;
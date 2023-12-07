// src/routes/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AuthApiError, type Provider } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ url, locals: { supabase } }) => {

	const code = url.searchParams.get('code');
	if (code) {
		console.log('wtf')
		await supabase.auth.exchangeCodeForSession(code);
		throw redirect(303, '/');

	}
	
	return 
};



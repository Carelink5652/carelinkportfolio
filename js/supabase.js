window.CARELINK_SUPABASE = (() => {
  const url = 'https://your-project.supabase.co';
  const anonKey = 'your-anon-key';

  const isConfigured = typeof window !== 'undefined' && url && anonKey && !url.includes('your-project') && !anonKey.includes('your-anon-key');

  const getClient = () => {
    if (!window.supabase || !isConfigured) {
      return null;
    }

    return window.supabase.createClient(url, anonKey);
  };

  const insertInquiry = async (payload) => {
    if (!isConfigured) {
      return {
        ok: true,
        demoMode: true,
        message: 'Demo mode: inquiry captured locally for preview use. Replace the Supabase project URL and anon key in this file to enable live submissions.'
      };
    }

    try {
      const client = getClient();
      if (!client) {
        throw new Error('Supabase client unavailable');
      }

      const { error } = await client.from('project_inquiries').insert([payload]);
      if (error) {
        throw error;
      }

      return { ok: true, demoMode: false, message: 'Request submitted successfully.' };
    } catch (error) {
      return {
        ok: false,
        demoMode: true,
        message: 'We could not send the request at the moment. Please retry or contact us directly.'
      };
    }
  };

  return {
    isConfigured,
    insertInquiry
  };
})();

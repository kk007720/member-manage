// composables/useSupabase.js
import { useNuxtApp } from '#app';

export const useSupabase = () => {
  const nuxtApp = useNuxtApp();
  return nuxtApp.$supabase;
};

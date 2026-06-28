import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export async function recordFind(team, cacheId) {
  const { error } = await supabase.from('finds').insert({ team, cache_id: cacheId })
  if (error && error.code !== '23505') throw error
}

export async function getAllFinds() {
  const { data, error } = await supabase
    .from('finds')
    .select('team, cache_id, created_at')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

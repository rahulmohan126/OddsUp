import { supabase } from "../util/db";
import { GroupBasic, User, UserBasic } from "../util/models";

export async function registerUser(email: string, password: string): Promise<{ userId: string } | null> {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error || !data.user) return null;

  return { userId: data.user.id };
}

export async function checkUsernameAvailable(username: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('oddsupuser')
    .select('*')
    .eq('username', username)
    .limit(1);

  if (error) return false;

  return data.length === 0;
}

export async function createUser(userId: string, username: string): Promise<boolean> {
  const { error } = await supabase
    .from('oddsupuser')
    .insert({ id: userId, username });

  if (error) return false;

  return true;
}

export async function loginUser(email: string, password: string): Promise<{ userId: string } | null> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) return null;

  return { userId: data.user.id };
}

export async function getInfo(userId: string): Promise<UserBasic | null> {
  const { data, error } = await supabase
    .from('oddsupuser')
    .select()
    .eq('id', userId);

  if (error) return null;

  return data[0] as UserBasic;
}

export async function getGroups(userId: string): Promise<GroupBasic[] | null> {
  const { data, error } = await supabase
    .from('member')
    .select('usergroup(id, name, ended)')
    .eq('userid', userId);

  if (error) return null;

  return data.map(x => x.usergroup as unknown as GroupBasic) as GroupBasic[];
}
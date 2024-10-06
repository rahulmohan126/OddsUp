import { supabase } from "../util/db";
import { ChallengeBasic, GroupBasic, Member } from "../util/models";

function generateJoinCode(): string {
  var code = (Math.random()+0.1).toString(36).slice(2,8);
  if (code.length < 6) code = code.repeat(6).slice(0,6);
  return code.toUpperCase();
}

export async function getInfo(groupId: string): Promise<GroupBasic | null> {
  const { data, error } = await supabase
    .from('usergroup')
    .select('id, name, joincode, ended')
    .eq('id', groupId);
  
  if (error) return null;

  return data[0] as GroupBasic;
}

export async function getChallenges(groupId: string): Promise<ChallengeBasic[] | null> {
  const { data, error } = await supabase
    .from('challenge')
    .select()
    .eq('groupid', groupId);

  if (error) return null;

  return data as ChallengeBasic[];
}

export async function getMembers(groupId: string): Promise<Member[] | null> {
  const { data, error } = await supabase
    .from('member')
    .select()
    .eq('groupid', groupId);

  if (error) return null;

  return data as Member[];
}

export async function create(name: string): Promise<GroupBasic | null> {
  const { data, error } = await supabase
    .from('usergroup')
    .insert({ name: name, joincode: generateJoinCode() })
    .select();
  
  if (error) return null;

  return data[0] as GroupBasic;
}

export async function addMembers(groupId: string, members: string[]): Promise<boolean> {
  const memberInsertions = members.map(userId => {
    return {
      userid: userId,
      groupid: groupId,
      points: 0
    }
  });

  const { error } = await supabase
    .from('member')
    .insert(memberInsertions);
  
  if (error) return false;

  return true;
}

export async function getIdFromCode(joinCode: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('usergroup')
    .select('id')
    .ilike('joincode', `%${joinCode}%`)
    .eq('ended', false);

  if (error || data.length === 0) return null;

  return data[0].id;
}

export async function end(groupId: string): Promise<boolean> {
  const { error } = await supabase
    .from('usergroup')
    .update({ end: true })
    .eq('id', groupId);

  if (error) return false;

  return true;
}
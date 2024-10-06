import { supabase } from "../util/db";
import { ChallengeBasic, GroupBasic } from "../util/models";

export async function getInfo(groupId: string): Promise<GroupBasic | null> {
  const { data, error } = await supabase
    .from('usergroup')
    .select('id, name, joinCode, ended')
    .is('groupId', groupId);

  if (error) return null;

  return data[0] as GroupBasic;
}

export async function getChallenges(groupId: string): Promise<ChallengeBasic[] | null> {
  const { data, error } = await supabase
    .from('challenge')
    .select('id, name, completed, winner')
    .is('groupId', groupId);

  if (error) return null;

  return data as ChallengeBasic[];
}

export async function create(name: string, members: string[]): Promise<string | null> {
  const { data, error } = await supabase
    .from('usergroup')
    .insert({ name: name })
    .select('id');

  if (error) return null;

  return data[0].id;
}

export async function addMembers(groupId: string, members: string[]): Promise<number> {
  const memberInsertions = members.map(userId => {
    return {
      userId: userId,
      groupId: groupId,
      points: 0
    }
  });

  const { error } = await supabase
    .from('usergroup')
    .insert(memberInsertions);

  if (error) return 1;

  return 0;
}

export async function end(groupId: string): Promise<number> {
  const { error } = await supabase
    .from('usergroup')
    .update({ end: true })
    .eq('id', groupId);

  if (error) return 1;

  return 0;
}
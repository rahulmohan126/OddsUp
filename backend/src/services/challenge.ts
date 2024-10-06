import { supabase } from "../util/db";
import { ChallengeBasic, Odds, Option, Selection } from "../util/models";

export async function create(name: string, groupId: string): Promise<ChallengeBasic | null> {
  const { data, error } = await supabase
    .from('challenge')
    .insert({ name: name, groupid: groupId })
    .select();

  if (error) return null;

  return data[0] as ChallengeBasic;
}

export async function addOptions(challengeId: string, odds: Odds[]): Promise<string[] | null> {
  const oddsInsertion = odds.map(odd => {
    return {
      challengeid: challengeId,
      name: odd.name,
      payout: odd.payout
    }
  });

  const { data, error } = await supabase
    .from('oddsoption')
    .insert(oddsInsertion)
    .select('id');

  if (error) return null;

  return data.map(odd => odd.id);
}

export async function getInfo(challengeId: string): Promise<ChallengeBasic | null> {
  const { data, error } = await supabase
    .from('challenge')
    .select()
    .eq('id', challengeId);

  if (error) return null;

  return data[0] as ChallengeBasic;
}

export async function getSelections(challengeId: string): Promise<Selection[] | null> {
  const { data, error } = await supabase
    .from('selection')
    .select()
    .eq('challengeid', challengeId);

  if (error) return null;

  return data as Selection[];
}

export async function getOptions(challengeId: string): Promise<Option[] | null> {
  const { data, error } = await supabase
    .from('oddsoption')
    .select()
    .eq('challengeid', challengeId);

  if (error) return null;

  return data as Option[];
}

export async function select(memberId: string, challengeId: string, optionId: string): Promise<boolean> {
  const { error } = await supabase
    .from('selection')
    .upsert({ memberid: memberId, challengeid: challengeId, optionid: optionId }, { onConflict: 'memberid, challengeid' });

 if (error) return false;

  return true;
}

export async function setWinner(challengeId: string, optionId: string): Promise<boolean> {
  const { error } = await supabase
    .from('challenge')
    .update({ winner: optionId, completed: true })
    .eq('id', challengeId);

  if (error) return false;

  return true;
}

export async function givePayout(optionId: string): Promise<boolean> {
  const { error } = await supabase.rpc('givepayout', { winneroptionid: optionId });

  if (error) return false;

  return true;
}
import { addMembers, create, end, getChallenges, getIdFromCode, getInfo, getMembers } from "../services/group";
import { Group, OUResponse, resError, resSuccess } from "../util/models";

export async function temp() {
  return null;
}

export async function createGroup(req: { name: string, members: string[] }): Promise<OUResponse> {
  const groupInfo = await create(req.name);
  if (!groupInfo) {
    return resError("Couldn't create group");
  }

  const added = await addMembers(groupInfo.id, req.members);
  if (!added) {
    return resError("Couldn't add all members");
  }

  return resSuccess(groupInfo);
}

export async function joinFromCode(req: { userId: string, joinCode: string }): Promise<OUResponse> {
  const groupId = await getIdFromCode(req.joinCode);
  if (!groupId) {
    return resError("Couldn't find an open group with that join code");
  }

  const added = await addMembers(groupId, [req.userId]);
  if (!added) {
    return resError("Couldn't add new member");
  }

  const groupInfo = await getInfo(groupId);
  if (!groupInfo) {
    return resError("Couldn't retrieve group info");
  }

  return resSuccess(groupInfo);
}

export async function getAllGroupInfo(req: { groupId: string }): Promise<OUResponse> {
  const groupInfo = await getInfo(req.groupId);
  if (!groupInfo) {
    return resError("Couldn't retrieve group info");
  }

  const challenges = await getChallenges(req.groupId);
  if (!challenges) {
    return resError("Couldn't retrieve group challenges");
  }

  const members = await getMembers(req.groupId);
  if (!members) {
    return resError("Couldn't retrieve group members");
  }

  return resSuccess({ ...groupInfo, challenges, members } as Group);
}

export async function endGroup(req: { groupId: string }): Promise<OUResponse> {
  const success = await end(req.groupId);
  if (!success) {
    return resError("Couldn't end group");
  }

  return resSuccess(true);
}
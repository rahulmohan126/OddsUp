import { addOptions, create, getInfo, getOptions, getSelections, givePayout, select, setWinner } from "../services/challenge";
import { Challenge, Option, OUResponse, resError, resSuccess } from "../util/models";
import { CreateChallengeReq, GetChallengeReq, MakeSelectionReq, PayoutReq } from "../util/reqBody";

export async function createChallenge(req: CreateChallengeReq): Promise<OUResponse> {
  const challengeInfo = await create(req.name, req.groupId);
  if (!challengeInfo) {
    return resError("Couldn't create challenge");
  }

  const optionsId = await addOptions(challengeInfo.id, req.odds);
  if (!optionsId) {
    return resError("Couldn't add options");
  }

  const options = req.odds.map((val, idx) => {
    return { ...val, id: optionsId[idx], challengeid: challengeInfo.id };
  }) as Option[];

  return resSuccess({ ...challengeInfo, options: options, selections: [] } as Challenge);
}

export async function makeSelection(req: MakeSelectionReq): Promise<OUResponse> {
  const selected = await select(req.memberId, req.challengeId, req.optionId);
  if (!selected) {
    return resError("Couldn't select option");
  }

  return resSuccess(true);
}

export async function getAllInfo(req: GetChallengeReq): Promise<OUResponse> {
  const challengeInfo = await getInfo(req.challengeId);
  if (!challengeInfo) {
    return resError("Couldn't retrieve group info");
  }

  const options = await getOptions(req.challengeId);
  if (!options) {
    return resError("Couldn't retrieve challenge options");
  }

  const selections = await getSelections(req.challengeId);
  if (!selections) {
    return resError("Couldn't retrieve challenge selections");
  }

  return resSuccess({ ...challengeInfo, options, selections } as Challenge);
}

export async function payout(req: PayoutReq): Promise<OUResponse> {
  const winnerSet = await setWinner(req.challengeId, req.winnerId);
  if (!winnerSet) {
    return resError("Couldn't set winner");
  }

  const paidOut = await givePayout(req.winnerId);
  if (!paidOut) {
    return resError("Couldn't give payout");
  }

  return resSuccess(true);
}
import { Odds } from "./models";

export type SignInReq = { email: string, username: string, password: string };
export type LoginReq = { email: string, password: string };
export type GetUserReq = { userId: string };

export type CreateGroupReq = { name: string, members: string[] };
export type JoinGroupReq = { userId: string, joinCode: string };
export type GetGroupReq = { groupId: string };

export type CreateChallengeReq = { name: string, groupId: string, odds: Odds[] };
export type MakeSelectionReq = { memberId: string, challengeId: string, optionId: string };
export type GetChallengeReq = { challengeId: string };
export type PayoutReq = { winnerId: string, challengeId: string };
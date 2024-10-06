
export type User = {
  id: string
  username: string
  groups: GroupBasic[]
}

export type UserBasic = {
  id: string
  username: string
}

export type Member = {
  userId: string
  groupId: string
  points: number
}

export type Group = {
  id: string
  name: string
  joinCode: string,
  members: Member[]
  challenges: ChallengeBasic[]
  ended: boolean
}

export type GroupBasic = {
  id: string
  name: string
  joinCode: string,
  ended: boolean
}

export type Challenge = {
  id: string
  name: string
  completed: boolean
  winner: null | string
  options: Option[]
  selections: Selection[]
}


export type ChallengeBasic = {
  id: string
  name: string
  completed: boolean
  winner: null | string
}


export type Option = {
  optionId: string
  challengeId: string
  name: string
  payout: number
}

export type Selection = {
  memberId: string
  challengeId: string
  optionId: string
}

export type Odds = {
  name: string
  payout: number
}

export type OUResponse = {
  success: boolean
  error: string | null,
  data: any
}

export function resSuccess(data: any): OUResponse {
  return {
    success: true,
    error: null,
    data
  }
}

export function resError(error: string): OUResponse {
  return {
    success: false,
    data: null,
    error,
  }
}
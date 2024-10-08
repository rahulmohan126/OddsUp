
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
  userid: string
  groupid: string
  points: number
}

export type MemberExtended = Member & {
  username: string
}

export type Group = {
  id: string
  name: string
  joincode: string,
  members: Member[]
  challenges: ChallengeBasic[]
  ended: boolean
}

export type GroupBasic = {
  id: string
  name: string
  joincode: string,
  ended: boolean
}

export type Challenge = {
  id: string
  groupid: string
  name: string
  completed: boolean
  winner: null | string
  options: Option[]
  selections: Selection[]
}


export type ChallengeBasic = {
  id: string
  groupid: string
  name: string
  completed: boolean
  winner: null | string
}


export type Option = {
  id: string
  challengeid: string
  name: string
  payout: number
}

export type Selection = {
  memberid: string
  challengeid: string
  optionid: string
}

export type Odds = {
  name: string
  payout: number
}

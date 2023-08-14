import { EntitySysPerson } from "./dialogflow"

export type IntentGetCharacterAttributeParameters = {
  character: EntitySysPerson
  attribute: string
}

export type CharacterProfile = {
  age?: number
  birthday?: string
  ethnicity?: string
  gender: {
    cis: boolean
    gender?: string
    pronouns?: string
  }
  healthConditions?: {
    mental?: string
    physical?: string
  }
  height?: string
  names: {
    firstName: string
    lastName?: string
    middleNames?: string[]
    nicknames?: string[]
  }
  occupation?: {
    jobs?: {
      mainJob?: string
      sideJobs?: string
    }
    student?: boolean
  }
  orientation?: string
  religion?: string
}

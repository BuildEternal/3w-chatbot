// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DocumentData, DocumentSnapshot } from "firebase-admin/firestore"
import { CharacterProfile, IntentGetCharacterAttributeParameters } from "./chatbot"
import { characterProfiles } from "./database"

export function getCharacterAttribute(parameters: IntentGetCharacterAttributeParameters) {
  const providedName = parameters.character
    .split(" ")
    .filter((word) => word.length > 0)
    .join(" ")
    .toLowerCase()

  // TODO: Add support for nicknames
  // TODO: Add support for aliases
  // TODO: Combine into one query
  return characterProfiles
    .listDocuments()
    .then((documents) => Promise.all(documents.map((document) => document.get())))
    .then((profiles) => {
      // Match profile

      let characterProfileDocument: DocumentSnapshot<DocumentData> | undefined

      profiles.every((profile) => {
        const data = profile.data() as CharacterProfile | undefined
        if (!data) return true

        const names = data.names

        const firstName = names.firstName
        const middleNames = names.middleNames
        const lastName = names.lastName

        if (firstName.toLowerCase() === providedName) characterProfileDocument = profile
        else if (lastName && `${firstName} ${lastName}`.toLowerCase() === providedName)
          characterProfileDocument = profile
        else if (
          middleNames &&
          lastName &&
          `${firstName} ${middleNames.join(" ")} ${lastName}`.toLowerCase() === providedName
        )
          characterProfileDocument = profile

        return !characterProfileDocument
      })

      if (!characterProfileDocument) {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [`Sorry, but I don't know anyone named ${parameters.character}.`],
              },
            },
          ],
        }
      }

      const attribute = parameters.attribute

      const profile = characterProfileDocument.data() as CharacterProfile

      const age = profile.age
      const birthday = profile.birthday
      const ethnicity = profile.ethnicity
      const genderInfo = profile.gender
      const healthConditions = profile.healthConditions
      const height = profile.height
      const names = profile.names
      const occupation = profile.occupation
      const orientation = profile.orientation
      const religion = profile.religion

      const cisgender = genderInfo.cis
      const gender = genderInfo.gender
      const pronouns = genderInfo.pronouns

      const mentalConditions = healthConditions?.mental
      const physicalConditions = healthConditions?.physical

      const firstName = names.firstName
      const middleNames = names.middleNames
      const lastName = names.lastName
      const nicknames = names.nicknames

      const jobs = occupation?.jobs
      const mainJob = jobs?.mainJob
      const sideJobs = jobs?.sideJobs
      const student = occupation?.student

      if (attribute === "age") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [age ? `${firstName} is ${age} years old.` : `${firstName}'s age is unknown.`],
              },
            },
          ],
        }
      } else if (attribute === "birthday") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [birthday ? `${firstName}'s birthday is on ${birthday}.` : `${firstName}'s birthday is unknown.`],
              },
            },
          ],
        }
      } else if (attribute === "cisgender") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [`${cisgender ? "Yes" : "No"}, ${firstName} is${cisgender ? "" : " not"} cis.`],
              },
            },
          ],
        }
      } else if (attribute === "ethnicity") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [ethnicity ? `${firstName} is ${ethnicity}.` : `${firstName}'s ethnicity is unknown.`],
              },
            },
          ],
        }
      } else if (attribute === "first name") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [`${firstName}'s first name is, well, ${firstName}.`],
              },
            },
          ],
        }
      } else if (attribute === "full name") {
        const fullName = `${firstName}${middleNames ? ` ${middleNames.join(" ")}` : ""}${
          lastName ? ` ${lastName}` : ""
        }`

        return {
          fulfillmentMessages: [
            {
              text: {
                text: [`${firstName}'s full name is${!middleNames && !lastName ? " well," : ""} ${fullName}.`],
              },
            },
          ],
        }
      } else if (attribute === "gender") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [
                  gender
                    ? `${firstName} is ${gender}${cisgender ? " (cis)" : ""}.`
                    : `${firstName} doesn't have a gender.`,
                ],
              },
            },
          ],
        }
      } else if (attribute === "health conditions") {
        let message

        if (!mentalConditions && !physicalConditions) message = `${firstName} doesn't have any health conditions.`
        else if (!mentalConditions) message = `${firstName} ${physicalConditions}.`
        else if (!physicalConditions) message = `${firstName} ${mentalConditions}.`
        else message = `${firstName} ${mentalConditions}, and also ${physicalConditions}.`

        return {
          fulfillmentMessages: [
            {
              text: {
                text: [message],
              },
            },
          ],
        }
      } else if (attribute === "height") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [height ? `${firstName} is ${height}.` : `${firstName} doesn't have a height.`],
              },
            },
          ],
        }
      } else if (attribute === "last name") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [
                  lastName ? `${firstName}'s last name is ${lastName}.` : `${firstName} doesn't have a last name.`,
                ],
              },
            },
          ],
        }
      } else if (attribute === "main job") {
        let message: string

        if (occupation) {
          message = mainJob
            ? `${firstName} is${sideJobs ? " mainly" : ""} ${mainJob}.`
            : `${firstName} doesn't have a main job.`
        } else {
          message = `That doesn't apply to ${firstName}.`
        }

        return {
          fulfillmentMessages: [
            {
              text: {
                text: [message],
              },
            },
          ],
        }
      } else if (attribute === "mental conditions") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [`${firstName} ${mentalConditions || "doesn't have any mental conditions"}.`],
              },
            },
          ],
        }
      } else if (attribute === "middle names") {
        let message: string

        if (!middleNames || middleNames.length == 0) message = `${firstName} doesn't have any middle names.`
        else if (middleNames.length == 1) message = `${firstName}'s middle name is ${middleNames[0]}.`
        else if (middleNames.length == 2)
          message = `${firstName}'s middle names are ${middleNames[0]} and ${middleNames[1]}.`
        else
          message = `${firstName}'s middle names are ${middleNames.slice(0, -1).join(", ")}, and ${
            middleNames[middleNames.length - 1]
          }.`

        return {
          fulfillmentMessages: [
            {
              text: {
                text: [message],
              },
            },
          ],
        }
      } else if (attribute === "nicknames") {
        let message: string

        if (!nicknames || nicknames.length == 0) message = `${firstName} doesn't have any nicknames.`
        else if (nicknames.length == 1) message = `${firstName}'s nickname is ${nicknames[0]}.`
        else if (nicknames.length == 2) message = `${firstName}'s nicknames are ${nicknames[0]} and ${nicknames[1]}.`
        else
          message = `${firstName}'s nicknames are ${nicknames.slice(0, -1).join(", ")}, and ${
            nicknames[nicknames.length - 1]
          }.`

        return {
          fulfillmentMessages: [
            {
              text: {
                text: [message],
              },
            },
          ],
        }
      } else if (attribute === "occupation") {
        let message

        if (!occupation) message = `That doesn't apply to ${firstName}.`
        else if (!mainJob && !sideJobs) message = `${firstName} doesn't currently have a job.`
        else {
          const mainJobMessage = mainJob ? `${firstName} is${sideJobs ? " mainly" : ""} ${mainJob}.` : ""
          const sideJobsMessage = sideJobs ? `On the side, ${firstName} is ${sideJobs}.` : ""

          message = [mainJobMessage, sideJobsMessage].join(" ")
        }

        if (student != undefined) {
          if (student) message += ` ${firstName} is currently a student.`
          else message += ` ${firstName} is currently not a student.`
        }

        return {
          fulfillmentMessages: [
            {
              text: {
                text: [message],
              },
            },
          ],
        }
      } else if (attribute === "orientation") {
        let message: string

        if (!orientation) message = `${firstName} doesn't have a sexual orientation.`
        else message = `${firstName} is ${orientation}.`

        return {
          fulfillmentMessages: [
            {
              text: {
                text: [message],
              },
            },
          ],
        }
      } else if (attribute === "physical conditions") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [`${firstName} ${physicalConditions || "doesn't have any physical conditions"}.`],
              },
            },
          ],
        }
      } else if (attribute === "pronouns") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [pronouns ? `${firstName} uses ${pronouns} pronouns.` : `${firstName} doesn't use pronouns.`],
              },
            },
          ],
        }
      } else if (attribute === "religion") {
        let message: string

        if (!religion) message = `${firstName} doesn't have a religion.`
        else message = `${firstName} is ${religion}.`

        return {
          fulfillmentMessages: [
            {
              text: {
                text: [message],
              },
            },
          ],
        }
      } else if (attribute === "side jobs") {
        let message: string

        if (!occupation) message = `That doesn't apply to ${firstName}.`
        else if (!sideJobs) message = `${firstName} doesn't have any side jobs at the moment.`
        else message = `${firstName} is ${sideJobs} on the side.`

        return {
          fulfillmentMessages: [
            {
              text: {
                text: [message],
              },
            },
          ],
        }
      } else if (attribute === "student") {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [
                  student != undefined
                    ? `${firstName} is ${student ? "" : "not "}currently a student.`
                    : `That doesn't apply to ${firstName}.`,
                ],
              },
            },
          ],
        }
      } else {
        return {
          fulfillmentMessages: [
            {
              text: {
                text: [`Sorry, but I don't know what you mean by "${attribute}". Could you try rephrasing?`],
              },
            },
          ],
        }
      }
    })
    .catch((error) => {
      console.error(error)

      return {
        fulfillmentMessages: [
          {
            text: {
              text: ["Sorry, but something went wrong on my end. Could you repeat that?"],
            },
          },
        ],
      }
    })
}

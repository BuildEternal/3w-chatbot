/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https"
// import * as logger from "firebase-functions/logger"

import { getCharacterAttribute } from "./intents"
import { WebhookRequest } from "./dialogflow"
import { IntentGetCharacterAttributeParameters } from "./chatbot"

export const chatbotFulfillment = onRequest(async (request, response) => {
  const data: WebhookRequest = request.body
  const queryResult = data.queryResult
  const { intent, parameters } = queryResult

  if (intent.displayName === "Get Character Attribute") {
    try {
      response.send(await getCharacterAttribute(parameters as IntentGetCharacterAttributeParameters))
    } catch (error) {
      response.send({
        fulfillmentMessages: [
          {
            text: {
              text: ["Error: " + error],
            },
          },
        ],
      })
    }
  } else {
    response.send({
      fulfillmentMessages: [
        {
          text: {
            text: ["Default response from Firebase Cloud Functions."],
          },
        },
      ],
    })
  }
})

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

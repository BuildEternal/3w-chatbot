export type WebhookRequest = {
  session: string
  responseId: string
  queryResult: QueryResult
  originalDetectIntentRequest?: OriginalDetectIntentRequest
}

export type QueryResult = {
  queryText: string
  languageCode: string
  speechRecognitionConfidence: number
  action: string
  parameters: object
  allRequiredParamsPresent: boolean
  cancelsSlotFilling: boolean
  fulfillmentText: string
  fulfillmentMessages: Message[]
  webhookSource: string
  webhookPayload: object
  outputContexts: Context[]
  intent: Intent
  intentDetectionConfidence: number
  diagnosticInfo: object
  sentimentAnalysisResult: SentimentAnalysisResult
}

export type Message = {
  platform?: Platform
} & (
  | { text: Text }
  | { image: Image }
  | { quickReplies: QuickReplies }
  | { card: Card }
  | { payload: object }
  | { simpleResponses: SimpleResponses }
  | { basicCard: BasicCard }
  | { suggestions: Suggestions }
  | { linkOutSuggestion: LinkOutSuggestion }
  | { listSelect: ListSelect }
  | { carouselSelect: CarouselSelect }
  | { browseCarouselCard: BrowseCarouselCard }
  | { tableCard: TableCard }
  | { mediaContent: MediaContent }
)

export type Text = {
  text?: string[]
}

export type Image = {
  imageUri?: string
  accessibilityText?: string
}

export type QuickReplies = {
  title?: string
  quickReplies?: string[]
}

export type Card = {
  title?: string
  subtitle?: string
  imageUri?: string
  buttons?: CardButton[]
}

export type CardButton = {
  text?: string
  postback?: string
}

export type SimpleResponses = {
  simpleResponses: SimpleResponse[]
}

export type SimpleResponse = {
  displayText?: string
} & ({ textToSpeech: string } | { ssml: string })

export type BasicCard = {
  title?: string
  subtitle?: string
  image?: Image
  buttons?: BasicCardButton[]
} & (
  | { formattedText: string }
  | {
      formattedText?: string
      image: Image
    }
)

export type BasicCardButton = {
  title: string
  openUriAction: OpenUriAction
}

export type OpenUriAction = {
  uri: string
}

export type Suggestions = {
  suggestions: Suggestion[]
}

export type Suggestion = {
  title: string
}

export type LinkOutSuggestion = {
  destinationName: string
  uri: string
}

export type ListSelect = {
  title?: string
  items: ListSelectItem[]
  subtitle?: string
}

export type ListSelectItem = {
  info: SelectItemInfo
  title: string
  description?: string
  image?: Image
}

export type SelectItemInfo = {
  key: string
  synonyms?: string[]
}

export type CarouselSelect = {
  items: CarouselSelectItem[]
}

export type CarouselSelectItem = {
  info: SelectItemInfo
  title: string
  description?: string
  image?: Image
}

export type BrowseCarouselCard = {
  items: BrowseCarouselCardItem[]
  imageDisplayOptions?: ImageDisplayOptions
}

export type BrowseCarouselCardItem = {
  openUriAction: OpenUrlAction
  title: string
  description?: string
  image?: Image
  footer?: string
}

export type OpenUrlAction = {
  url: string
  // urlTypeHint?: UrlTypeHint
}

export type ImageDisplayOptions =
  | "IMAGE_DISPLAY_OPTIONS_UNSPECIFIED"
  | "GRAY"
  | "WHITE"
  | "CROPPED"
  | "BLURRED_BACKGROUND"

export type UrlTypeHint = "URL_TYPE_HINT_UNSPECIFIED" | "AMP_ACTION" | "AMP_CONTENT"

export type TableCard = {
  title: string
  subtitle?: string
  image?: Image
  columnProperties?: ColumnProperties[]
  rows?: TableCardRow[]
  buttons?: BasicCardButton[]
}

export type ColumnProperties = {
  header: string
  horizontalAlignment?: HorizontalAlignment
}

export type HorizontalAlignment = "HORIZONTAL_ALIGNMENT_UNSPECIFIED	" | "LEADING" | "CENTER" | "TRAILING"

export type TableCardRow = {
  cells?: TableCardCell[]
  dividerAfter?: boolean
}

export type TableCardCell = {
  text: string
}

export type MediaContent = {
  mediaType?: ResponseMediaType
  mediaObjects: ResponseMediaObject[]
}

export type ResponseMediaType = "RESPONSE_MEDIA_TYPE_UNSPECIFIED" | "AUDIO"

export type ResponseMediaObject = {
  name: string
  description?: string
  contentUrl: string
} & ({ largeImage?: Image } | { icon?: Image })

export type Platform =
  | "PLATFORM_UNSPECIFIED"
  | "FACEBOOK"
  | "SLACK"
  | "TELEGRAM"
  | "KIK"
  | "SKYPE"
  | "LINE"
  | "VIBER"
  | "ACTIONS_ON_GOOGLE"
  | "GOOGLE_HANGOUTS"

export type Context = {
  name: string
  lifespanCount?: number
  parameters?: object
}

export type Intent = {
  name?: string
  displayName: string
  webhookState?: WebhookState
  priority?: number
  isFallback?: boolean
  mlDisabled?: boolean
  liveAgentHandoff?: boolean
  endInteraction?: boolean
  inputContextNames?: string[]
  events?: string[]
  trainingPhrases?: TrainingPhrase[]
  action?: string
  outputContexts?: Context[]
  resetContexts?: boolean
  parameters?: Parameter[]
  messages?: Message[]
  defaultResponsePlatforms?: Platform[]
  rootFollowupIntentName: string
  parentFollowupIntentName: string
  followupIntentInfo: FollowupIntentInfo[]
}

export type WebhookState =
  | "WEBHOOK_STATE_UNSPECIFIED"
  | "WEBHOOK_STATE_ENABLED"
  | "WEBHOOK_STATE_ENABLED_FOR_SLOT_FILLING"

export type TrainingPhrase = {
  name: string
  type: Type
  parts: Part[]
  timesAddedCount?: number
}

export type Type = "TYPE_UNSPECIFIED" | "EXAMPLE" | "TEMPLATE"

export type Part = {
  text: string
  entityType?: string
  alias?: string
  userDefined?: boolean
}

export type Parameter = {
  name: string
  displayName: string
  value?: string
  defaultValue?: string
  entityTypeDisplayName?: string
  mandatory?: boolean
  prompts?: string[]
  isList?: boolean
}

export type FollowupIntentInfo = {
  followupIntentName: string
  parentFollowupIntentName: string
}

export type SentimentAnalysisResult = {
  queryTextSentiment: Sentiment
}

export type Sentiment = {
  score: number
  magnitude: number
}

export type OriginalDetectIntentRequest = {
  source: string
  version?: string
  payload?: object
}

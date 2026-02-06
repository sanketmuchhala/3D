import { Vector3, Euler } from 'three'

export type InteractionType = 'focus' | 'screen' | 'info' | 'book' | 'photo'

export interface FocusAnchor {
  position: Vector3
  rotation: Euler
}

export interface InteractableConfig {
  id: string
  type: InteractionType
  name: string
  focusAnchor: FocusAnchor
  screenMode?: boolean
  content?: {
    title: string
    body: string | JSX.Element
  }
}

// All interactable definitions
export const INTERACTABLES: Record<string, InteractableConfig> = {
  // Desk - main desktop view
  desk: {
    id: 'desk',
    type: 'screen',
    name: 'Desktop Workspace',
    screenMode: true,
    focusAnchor: {
      position: new Vector3(-1.5, 1.5, -1.2),
      rotation: new Euler(0, 0, 0),
    },
  },

  // Center monitor (ClaudeOS)
  monitorCenter: {
    id: 'monitorCenter',
    type: 'screen',
    name: 'ClaudeOS',
    screenMode: true,
    focusAnchor: {
      position: new Vector3(-1.5, 1.4, -1.5),
      rotation: new Euler(0, 0, 0),
    },
  },

  // Left monitor (Spotify) - vertical
  monitorLeft: {
    id: 'monitorLeft',
    type: 'screen',
    name: 'Spotify',
    screenMode: true,
    focusAnchor: {
      position: new Vector3(-2.15, 1.5, -1.6),
      rotation: new Euler(0, Math.PI / 12, 0),
    },
  },

  // Right monitor (Safari/GitHub)
  monitorRight: {
    id: 'monitorRight',
    type: 'screen',
    name: 'GitHub',
    screenMode: true,
    focusAnchor: {
      position: new Vector3(-0.85, 1.4, -1.6),
      rotation: new Euler(0, -Math.PI / 12, 0),
    },
  },

  // Corkboard with project notes
  corkboard: {
    id: 'corkboard',
    type: 'info',
    name: 'Projects Board',
    focusAnchor: {
      position: new Vector3(1.5, 1.6, -2.5),
      rotation: new Euler(0, Math.PI, 0),
    },
  },

  // Business card on desk
  businessCard: {
    id: 'businessCard',
    type: 'info',
    name: 'Contact',
    focusAnchor: {
      position: new Vector3(-0.7, 1.3, -2.0),
      rotation: new Euler(-Math.PI / 4, 0, 0),
    },
  },

  // About card on bookshelf
  aboutCard: {
    id: 'aboutCard',
    type: 'info',
    name: 'About Me',
    focusAnchor: {
      position: new Vector3(2.5, 1.3, 1.0),
      rotation: new Euler(0, -Math.PI / 3, 0),
    },
  },

  // Featured books
  bookAI: {
    id: 'bookAI',
    type: 'book',
    name: 'AI Research',
    focusAnchor: {
      position: new Vector3(2.5, 1.5, 1.0),
      rotation: new Euler(0, -Math.PI / 3, 0),
    },
  },

  bookCloud: {
    id: 'bookCloud',
    type: 'book',
    name: 'Cloud Architecture',
    focusAnchor: {
      position: new Vector3(2.5, 1.7, 1.0),
      rotation: new Euler(0, -Math.PI / 3, 0),
    },
  },

  // Photo frames on wall
  photoFrame1: {
    id: 'photoFrame1',
    type: 'photo',
    name: 'Family Photo',
    focusAnchor: {
      position: new Vector3(0.5, 1.6, -2.5),
      rotation: new Euler(0, Math.PI, 0),
    },
  },

  photoFrame2: {
    id: 'photoFrame2',
    type: 'photo',
    name: 'Family Photo',
    focusAnchor: {
      position: new Vector3(-0.5, 1.6, -2.5),
      rotation: new Euler(0, Math.PI, 0),
    },
  },
}

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Vector3, Euler } from 'three'
import type { InteractableConfig } from '../../config/interactables'

export type InteractionState = 'Explore' | 'FocusMove' | 'FocusInteract' | 'ExitFocus'

interface InteractionContextValue {
  state: InteractionState
  currentInteractable: InteractableConfig | null
  hoveredInteractable: InteractableConfig | null
  previousCameraTransform: { position: Vector3; rotation: Euler } | null

  setState: (state: InteractionState) => void
  setCurrentInteractable: (config: InteractableConfig | null) => void
  setHoveredInteractable: (config: InteractableConfig | null) => void
  setPreviousCameraTransform: (transform: { position: Vector3; rotation: Euler } | null) => void

  handleInteract: (config: InteractableConfig) => void
  handleExit: () => void
}

const InteractionContext = createContext<InteractionContextValue | null>(null)

export function useInteraction() {
  const context = useContext(InteractionContext)
  if (!context) throw new Error('useInteraction must be used within InteractionProvider')
  return context
}

export function InteractionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<InteractionState>('Explore')
  const [currentInteractable, setCurrentInteractable] = useState<InteractableConfig | null>(null)
  const [hoveredInteractable, setHoveredInteractable] = useState<InteractableConfig | null>(null)
  const [previousCameraTransform, setPreviousCameraTransform] = useState<{ position: Vector3; rotation: Euler } | null>(null)

  const handleInteract = useCallback((config: InteractableConfig) => {
    setCurrentInteractable(config)
    setState('FocusMove')
  }, [])

  const handleExit = useCallback(() => {
    setState('ExitFocus')
    setTimeout(() => {
      setCurrentInteractable(null)
      setState('Explore')
    }, 600) // Duration of exit animation
  }, [])

  return (
    <InteractionContext.Provider
      value={{
        state,
        currentInteractable,
        hoveredInteractable,
        previousCameraTransform,
        setState,
        setCurrentInteractable,
        setHoveredInteractable,
        setPreviousCameraTransform,
        handleInteract,
        handleExit,
      }}
    >
      {children}
    </InteractionContext.Provider>
  )
}

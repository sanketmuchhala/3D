import { ReactNode, useRef, useState } from 'react'
import { useFrame, ThreeEvent } from '@react-three/fiber'
import { Mesh } from 'three'
import { useInteraction } from './InteractionManager'
import type { InteractableConfig } from '../../config/interactables'

interface InteractableProps {
  config: InteractableConfig
  children: ReactNode
}

export function Interactable({ config, children }: InteractableProps) {
  const meshRef = useRef<Mesh>(null)
  const { state, handleInteract, setHoveredInteractable } = useInteraction()
  const [hovered, setHovered] = useState(false)

  const isInteractable = state === 'Explore'

  useFrame(() => {
    if (meshRef.current && hovered && isInteractable) {
      // Subtle glow effect
      const material = meshRef.current.material as any
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = 0.3 + Math.sin(Date.now() * 0.003) * 0.1
      }
    }
  })

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    if (!isInteractable) return
    e.stopPropagation()
    setHovered(true)
    setHoveredInteractable(config)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerLeave = () => {
    if (!isInteractable) return
    setHovered(false)
    setHoveredInteractable(null)
    document.body.style.cursor = 'default'
  }

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (!isInteractable) return
    e.stopPropagation()
    handleInteract(config)
  }

  return (
    <group
      ref={meshRef as any}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {children}
    </group>
  )
}

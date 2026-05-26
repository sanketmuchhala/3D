import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Raycaster, Vector2, Vector3 } from 'three'
import { useInteraction } from './InteractionManager'

export function ScreenPointer() {
  const { camera } = useThree()
  const { state, currentInteractable } = useInteraction()
  const raycaster = useRef(new Raycaster())
  const [pointerPos, setPointerPos] = useState<Vector3 | null>(null)

  const isScreenMode = state === 'FocusInteract' && currentInteractable?.screenMode

  useFrame(() => {
    if (!isScreenMode) {
      setPointerPos(null)
      return
    }

    // Raycast from camera center
    raycaster.current.setFromCamera(new Vector2(0, 0), camera)

    // For now, just show pointer at raycast hit point
    // Full UV mapping and event forwarding will be implemented per monitor
  })

  if (!isScreenMode || !pointerPos) return null

  return (
    <mesh position={pointerPos}>
      <sphereGeometry args={[0.01, 8, 8]} />
      <meshBasicMaterial color="#00ff00" transparent opacity={0.8} />
    </mesh>
  )
}

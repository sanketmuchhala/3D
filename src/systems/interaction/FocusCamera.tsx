import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3, Euler, MathUtils } from 'three'
import { useInteraction } from './InteractionManager'
import { PLAYER_SPAWN, clampToRoomBounds } from '../../config/roomConfig'

export function FocusCamera() {
  const { camera } = useThree()
  const { state, currentInteractable, previousCameraTransform, setPreviousCameraTransform, setState } = useInteraction()

  const animationRef = useRef({ progress: 0, startPos: new Vector3(), startRot: new Euler(), targetPos: new Vector3(), targetRot: new Euler() })
  const isAnimating = useRef(false)
  const hasInitialized = useRef(false)

  // Initialize camera at PlayerSpawn
  useEffect(() => {
    if (!hasInitialized.current) {
      camera.position.copy(PLAYER_SPAWN.position)
      camera.rotation.copy(PLAYER_SPAWN.rotation)
      hasInitialized.current = true
    }
  }, [camera])

  // Safety clamp every frame
  useFrame(() => {
    if (state === 'Explore') {
      const clamped = clampToRoomBounds(camera.position)
      if (!camera.position.equals(clamped)) {
        camera.position.copy(clamped)
      }
    }
  })

  // Handle focus animation
  useEffect(() => {
    if (state === 'FocusMove' && currentInteractable) {
      // Save previous position
      setPreviousCameraTransform({
        position: camera.position.clone(),
        rotation: camera.rotation.clone(),
      })

      // Setup animation
      const anim = animationRef.current
      anim.startPos.copy(camera.position)
      anim.startRot.copy(camera.rotation)
      anim.targetPos.copy(currentInteractable.focusAnchor.position)
      anim.targetRot.copy(currentInteractable.focusAnchor.rotation)
      anim.progress = 0
      isAnimating.current = true
    }

    if (state === 'ExitFocus' && previousCameraTransform) {
      // Setup return animation
      const anim = animationRef.current
      anim.startPos.copy(camera.position)
      anim.startRot.copy(camera.rotation)
      anim.targetPos.copy(previousCameraTransform.position)
      anim.targetRot.copy(previousCameraTransform.rotation)
      anim.progress = 0
      isAnimating.current = true
    }
  }, [state, currentInteractable, previousCameraTransform, camera, setPreviousCameraTransform])

  // Animation loop
  useFrame((_, delta) => {
    if (!isAnimating.current) return

    const anim = animationRef.current
    anim.progress += delta / 0.8 // 0.8 second animation

    if (anim.progress >= 1) {
      camera.position.copy(anim.targetPos)
      camera.rotation.copy(anim.targetRot)
      isAnimating.current = false

      if (state === 'FocusMove') {
        setState('FocusInteract')
      } else if (state === 'ExitFocus') {
        setState('Explore')
      }
    } else {
      // Damped cubic easing
      const t = 1 - Math.pow(1 - anim.progress, 3)

      camera.position.lerpVectors(anim.startPos, anim.targetPos, t)

      // Smooth rotation interpolation
      camera.rotation.x = MathUtils.lerp(anim.startRot.x, anim.targetRot.x, t)
      camera.rotation.y = MathUtils.lerp(anim.startRot.y, anim.targetRot.y, t)
      camera.rotation.z = MathUtils.lerp(anim.startRot.z, anim.targetRot.z, t)
    }
  })

  return null
}

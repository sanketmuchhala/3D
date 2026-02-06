import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useInteraction } from './InteractionManager'
import { clampToRoomBounds } from '../../config/roomConfig'

export function FirstPersonControls() {
  const { camera, gl } = useThree()
  const { state, handleExit } = useInteraction()

  const keysPressed = useRef<Set<string>>(new Set())
  const mouseMovement = useRef({ x: 0, y: 0 })
  const isPointerLocked = useRef(false)

  const movementEnabled = state === 'Explore'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state !== 'Explore') {
        handleExit()
        return
      }
      if (movementEnabled) {
        keysPressed.current.add(e.key.toLowerCase())
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase())
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isPointerLocked.current && movementEnabled) {
        mouseMovement.current.x += e.movementX
        mouseMovement.current.y += e.movementY
      }
    }

    const handlePointerLockChange = () => {
      isPointerLocked.current = document.pointerLockElement === gl.domElement
    }

    const handleClick = () => {
      if (movementEnabled && !isPointerLocked.current) {
        gl.domElement.requestPointerLock()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('pointerlockchange', handlePointerLockChange)
    gl.domElement.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      gl.domElement.removeEventListener('click', handleClick)
    }
  }, [gl, movementEnabled, state, handleExit])

  useFrame((_, delta) => {
    if (!movementEnabled) return

    // Mouse look
    if (mouseMovement.current.x !== 0 || mouseMovement.current.y !== 0) {
      const sensitivity = 0.002

      camera.rotation.y -= mouseMovement.current.x * sensitivity
      camera.rotation.x -= mouseMovement.current.y * sensitivity

      // Clamp vertical rotation
      camera.rotation.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, camera.rotation.x))

      mouseMovement.current.x = 0
      mouseMovement.current.y = 0
    }

    // WASD movement
    const speed = 2.5 * delta
    const direction = new Vector3()

    if (keysPressed.current.has('w')) direction.z -= 1
    if (keysPressed.current.has('s')) direction.z += 1
    if (keysPressed.current.has('a')) direction.x -= 1
    if (keysPressed.current.has('d')) direction.x += 1

    if (direction.length() > 0) {
      direction.normalize()
      direction.applyEuler(camera.rotation)
      direction.y = 0 // Keep on ground plane

      camera.position.add(direction.multiplyScalar(speed))
      camera.position.copy(clampToRoomBounds(camera.position))
    }
  })

  return null
}

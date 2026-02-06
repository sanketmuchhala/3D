import { Vector3, Euler, Box3 } from 'three'

// Room dimensions matching current Room.tsx (7m x 6m x 3m)
export const ROOM_DIMENSIONS = {
  width: 7,
  depth: 6,
  height: 3,
}

// Player spawn point - INSIDE the room near entrance
export const PLAYER_SPAWN = {
  position: new Vector3(0, 1.6, 2.2), // Eye height, near front of room
  rotation: new Euler(0, Math.PI, 0),  // Looking toward back wall
}

// Room bounds for safety clamp
export const ROOM_BOUNDS = new Box3(
  new Vector3(-ROOM_DIMENSIONS.width / 2 + 0.4, 0.5, -ROOM_DIMENSIONS.depth / 2 + 0.4),
  new Vector3(ROOM_DIMENSIONS.width / 2 - 0.4, ROOM_DIMENSIONS.height - 0.5, ROOM_DIMENSIONS.depth / 2 - 0.4)
)

// Helper to clamp camera to room bounds
export function clampToRoomBounds(position: Vector3): Vector3 {
  return new Vector3(
    Math.max(ROOM_BOUNDS.min.x, Math.min(ROOM_BOUNDS.max.x, position.x)),
    Math.max(ROOM_BOUNDS.min.y, Math.min(ROOM_BOUNDS.max.y, position.y)),
    Math.max(ROOM_BOUNDS.min.z, Math.min(ROOM_BOUNDS.max.z, position.z))
  )
}

import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function useCustomTextures() {
  const textures = useTexture({
    wood: '/textures/wood-grain.svg',
    fabric: '/textures/fabric.svg',
    carpet: '/textures/carpet.svg',
    wall: '/textures/wall-paint.svg',
    metal: '/textures/metal.svg',
  })

  // Configure textures
  Object.values(textures).forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.generateMipmaps = true
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter
  })

  textures.wood.repeat.set(2, 2)
  textures.fabric.repeat.set(4, 4)
  textures.carpet.repeat.set(8, 8)
  textures.wall.repeat.set(4, 4)
  textures.metal.repeat.set(1, 1)

  return textures
}

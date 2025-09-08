class ThreeUtils {
    static createTexturedMaterial(color, options = {}) {
        return new THREE.MeshLambertMaterial({
            color: color,
            transparent: options.transparent || false,
            opacity: options.opacity || 1.0,
            emissive: options.emissive || 0x000000,
            emissiveIntensity: options.emissiveIntensity || 0
        });
    }

    static createGlowMaterial(color, intensity = 0.5) {
        return new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: intensity,
            side: THREE.DoubleSide
        });
    }

    static createMetallicMaterial(color, roughness = 0.1) {
        return new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.8,
            roughness: roughness
        });
    }

    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    static easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    static randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    static degToRad(degrees) {
        return degrees * (Math.PI / 180);
    }

    static radToDeg(radians) {
        return radians * (180 / Math.PI);
    }
}

class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.isRunning = false;
    }

    add(name, animation) {
        this.animations.set(name, {
            ...animation,
            startTime: Date.now(),
            isActive: true
        });
        
        if (!this.isRunning) {
            this.start();
        }
    }

    remove(name) {
        this.animations.delete(name);
        
        if (this.animations.size === 0) {
            this.stop();
        }
    }

    update() {
        const currentTime = Date.now();
        const completedAnimations = [];

        this.animations.forEach((animation, name) => {
            if (!animation.isActive) return;

            const elapsed = currentTime - animation.startTime;
            const progress = Math.min(elapsed / animation.duration, 1);
            const easedProgress = animation.easing ? animation.easing(progress) : progress;

            if (animation.onUpdate) {
                animation.onUpdate(easedProgress);
            }

            if (progress >= 1) {
                if (animation.onComplete) {
                    animation.onComplete();
                }
                completedAnimations.push(name);
            }
        });

        completedAnimations.forEach(name => this.remove(name));
    }

    start() {
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
    }

    animate() {
        if (this.isRunning) {
            this.update();
            requestAnimationFrame(() => this.animate());
        }
    }
}

class CameraController {
    constructor(camera, target = new THREE.Vector3(0, 2, 0)) {
        this.camera = camera;
        this.target = target;
        this.spherical = new THREE.Spherical();
        this.sphericalDelta = new THREE.Spherical();
        this.scale = 1;
        
        this.minDistance = 5;
        this.maxDistance = 25;
        this.minPolarAngle = 0.1;
        this.maxPolarAngle = Math.PI * 0.8;
        
        this.rotateSpeed = 1.0;
        this.zoomSpeed = 1.0;
        this.dampingFactor = 0.05;
        
        this.enabled = true;
        this.update();
    }

    rotateLeft(angle) {
        this.sphericalDelta.theta -= angle;
    }

    rotateUp(angle) {
        this.sphericalDelta.phi -= angle;
    }

    dollyIn(dollyScale) {
        this.scale /= dollyScale;
    }

    dollyOut(dollyScale) {
        this.scale *= dollyScale;
    }

    update() {
        const offset = new THREE.Vector3();
        offset.copy(this.camera.position).sub(this.target);

        this.spherical.setFromVector3(offset);

        this.spherical.theta += this.sphericalDelta.theta;
        this.spherical.phi += this.sphericalDelta.phi;

        this.spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this.spherical.phi));
        this.spherical.makeSafe();

        this.spherical.radius *= this.scale;
        this.spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this.spherical.radius));

        offset.setFromSpherical(this.spherical);
        this.camera.position.copy(this.target).add(offset);
        this.camera.lookAt(this.target);

        this.sphericalDelta.set(0, 0, 0);
        this.scale = 1;

        return true;
    }

    reset() {
        this.spherical.set(12, Math.PI / 3, Math.PI / 4);
        this.camera.position.setFromSpherical(this.spherical).add(this.target);
        this.camera.lookAt(this.target);
    }
}

class PerformanceMonitor {
    constructor() {
        this.frameCount = 0;
        this.fps = 0;
        this.lastTime = performance.now();
        this.fpsHistory = [];
        this.maxHistorySize = 60;
        
        this.memoryInfo = {
            used: 0,
            total: 0,
            limit: 0
        };
    }

    update() {
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.fpsHistory.push(this.fps);
            
            if (this.fpsHistory.length > this.maxHistorySize) {
                this.fpsHistory.shift();
            }
            
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            this.updateMemoryInfo();
        }
    }

    updateMemoryInfo() {
        if (performance.memory) {
            this.memoryInfo.used = Math.round(performance.memory.usedJSHeapSize / 1048576);
            this.memoryInfo.total = Math.round(performance.memory.totalJSHeapSize / 1048576);
            this.memoryInfo.limit = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
        }
    }

    getAverageFPS() {
        if (this.fpsHistory.length === 0) return 0;
        return Math.round(this.fpsHistory.reduce((a, b) => a + b) / this.fpsHistory.length);
    }

    getPerformanceLevel() {
        const avgFPS = this.getAverageFPS();
        if (avgFPS >= 50) return 'high';
        if (avgFPS >= 30) return 'medium';
        return 'low';
    }

    shouldReduceQuality() {
        return this.getAverageFPS() < 25 && this.fpsHistory.length >= 30;
    }
}

class MobileDetector {
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static isTablet() {
        return /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent);
    }

    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    static getDeviceType() {
        if (this.isMobile()) return 'mobile';
        if (this.isTablet()) return 'tablet';
        return 'desktop';
    }

    static getScreenSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            ratio: window.innerWidth / window.innerHeight
        };
    }

    static supportsWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
        } catch (e) {
            return false;
        }
    }
}

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        
        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (!this.events[event]) return;
        
        const index = this.events[event].indexOf(callback);
        if (index > -1) {
            this.events[event].splice(index, 1);
        }
    }

    emit(event, ...args) {
        if (!this.events[event]) return;
        
        this.events[event].forEach(callback => {
            try {
                callback(...args);
            } catch (error) {
                console.error('Event callback error:', error);
            }
        });
    }

    once(event, callback) {
        const onceWrapper = (...args) => {
            callback(...args);
            this.off(event, onceWrapper);
        };
        
        this.on(event, onceWrapper);
    }
}

const GlobalAnimationManager = new AnimationManager();
const GlobalPerformanceMonitor = new PerformanceMonitor();
const GlobalEventEmitter = new EventEmitter();
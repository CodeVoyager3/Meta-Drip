// TryOn.tsx
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Camera, ShoppingCart, Share2, Video, VideoOff } from "lucide-react";

declare global {
  interface Window {
    FaceMesh: any;
    Camera: any;
  }
}

interface FaceRotation {
  pitch: number;
  yaw: number;
  roll: number;
}

export default function TryOn() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glassesContainerRef = useRef<HTMLDivElement>(null);
  const glassesImgRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState([100]);
  const [alpha, setAlpha] = useState([100]);
  const [cameraOn, setCameraOn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rotation, setRotation] = useState<FaceRotation>({ pitch: 0, yaw: 0, roll: 0 });
  const [glassesPosition, setGlassesPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const faceMeshRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);

  const glassesImg = useRef(new Image());
  useEffect(() => {
    glassesImg.current.src = "/glass.png";
  }, []);

  // Helper function to calculate head rotation angles from face landmarks
  const calculateHeadRotation = (landmarks: any[], width: number, height: number): FaceRotation => {
    try {
      // Key landmarks for rotation calculation
      const nose = landmarks[0]; // Nose tip
      const leftEar = landmarks[234]; // Left ear
      const rightEar = landmarks[454]; // Right ear
      const leftEye = landmarks[33];
      const rightEye = landmarks[263];
      const mouthLeft = landmarks[78];
      const mouthRight = landmarks[308];

      // Convert to pixel coordinates
      const noseX = nose.x * width;
      const noseY = nose.y * height;
      const leftEarX = leftEar.x * width;
      const rightEarX = rightEar.x * width;
      const leftEyeX = leftEye.x * width;
      const rightEyeX = rightEye.x * width;
      const mouthLeftY = mouthLeft.y * height;
      const mouthRightY = mouthRight.y * height;

      // Calculate YAW (head turning left/right)
      const eyeWidth = rightEyeX - leftEyeX;
      const earToNoseLeft = noseX - leftEarX;
      const earToNoseRight = rightEarX - noseX;
      const yaw = Math.atan2(earToNoseLeft - earToNoseRight, eyeWidth) * (180 / Math.PI);

      // Calculate ROLL (head tilt)
      const eyeSlope = rightEye.y - leftEye.y;
      const roll = Math.atan2(eyeSlope, (rightEyeX - leftEyeX) / width) * (180 / Math.PI);

      // Calculate PITCH (head up/down)
      const mouthTilt = Math.abs(mouthLeftY - mouthRightY);
      const pitch = Math.atan2(nose.z || 0, Math.max(1, eyeWidth / 50)) * (180 / Math.PI);

      return {
        pitch: Math.max(-30, Math.min(30, pitch * 2)),
        yaw: Math.max(-40, Math.min(40, yaw)),
        roll: Math.max(-30, Math.min(30, roll)),
      };
    } catch (e) {
      return { pitch: 0, yaw: 0, roll: 0 };
    }
  };

  // Load MediaPipe scripts
  useEffect(() => {
    const loadScripts = async () => {
      if (window.FaceMesh && window.Camera) {
        setIsLoaded(true);
        return;
      }

      const loadScript = (src: string) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          script.crossOrigin = "anonymous";
          document.head.appendChild(script);
        });
      };

      try {
        // Load FaceMesh instead of Holistic (lighter and more stable)
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js");
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js");
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js");
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js");
        
        // Wait for scripts to fully initialize
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (window.FaceMesh && window.Camera) {
          setIsLoaded(true);
        } else {
          throw new Error("MediaPipe FaceMesh failed to initialize");
        }
      } catch (err) {
        console.error("Failed to load MediaPipe", err);
      }
    };

    loadScripts();
  }, []);

  const startCamera = async () => {
    if (!isLoaded || !videoRef.current || !canvasRef.current) return;

    const faceMesh = new window.FaceMesh({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    // Optimized settings for better performance
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);
    faceMeshRef.current = faceMesh;

    const camera = new window.Camera(videoRef.current, {
      onFrame: async () => {
        if (faceMeshRef.current && videoRef.current) {
          await faceMeshRef.current.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });

    cameraRef.current = camera;
    camera.start();
    setCameraOn(true);
  };

  const stopCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
    }
    if (faceMeshRef.current) {
      faceMeshRef.current.close();
    }
    setCameraOn(false);
  };

  const onResults = (results: any) => {
    if (!canvasRef.current || !videoRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks[0]) {
      const landmarks = results.multiFaceLandmarks[0];
      const leftEye = landmarks[33];
      const rightEye = landmarks[263];

      const w = canvas.width;
      const h = canvas.height;

      const leX = leftEye.x * w;
      const leY = leftEye.y * h;
      const reX = rightEye.x * w;
      const reY = rightEye.y * h;

      const eyeDist = Math.hypot(reX - leX, reY - leY);
      const glassWidth = eyeDist * 2.2 * (scale[0] / 100);
      const glassHeight = glassWidth * (glassesImg.current.height / glassesImg.current.width);

      const centerX = (leX + reX) / 2;
      const centerY = (leY + reY) / 2;

      // Calculate 3D rotation from landmarks
      const headRotation = calculateHeadRotation(landmarks, w, h);
      setRotation(headRotation);

      // Save context for transformation
      ctx.save();

      // Move to center point for rotation
      ctx.translate(centerX, centerY);

      // Apply 2D rotation approximating 3D rotation
      ctx.rotate((headRotation.roll * Math.PI) / 180);

      // Apply perspective scaling for yaw
      const yawScale = Math.cos((headRotation.yaw * Math.PI) / 180);
      const pitchScale = Math.cos((headRotation.pitch * Math.PI) / 180);
      
      ctx.scale(Math.abs(yawScale), pitchScale);

      // Draw glasses with transparency
      ctx.globalAlpha = alpha[0] / 100;
      ctx.drawImage(
        glassesImg.current,
        -glassWidth / 2,
        -glassHeight / 2,
        glassWidth,
        glassHeight
      );

      ctx.restore();

      // Update position state for HTML overlay (if needed)
      setGlassesPosition({
        x: centerX - glassWidth / 2,
        y: centerY - glassHeight / 2,
        width: glassWidth,
        height: glassHeight
      });
    }

    ctx.restore();
  };

  const capture = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = "tryon-with-glasses.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Try On Glasses (Live Webcam)</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
            <video ref={videoRef} className="hidden" />
            <canvas ref={canvasRef} width={640} height={480} className="w-full" />

            {!cameraOn && !isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-white">Loading MediaPipe...</div>
              </div>
            )}

            {!cameraOn && isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Button size="lg" onClick={startCamera}>
                  <Video className="w-5 h-5 mr-2" /> Start Camera
                </Button>
              </div>
            )}

            {cameraOn && (
              <div className="absolute top-4 left-4 flex gap-2">
                <Button size="icon" variant="secondary" onClick={stopCamera}>
                  <VideoOff className="w-4 h-4" />
                </Button>
                <Button size="icon" onClick={capture}>
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="font-semibold mb-4">Adjust Fit</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm">Size: {scale[0]}%</label>
                  <Slider value={scale} onValueChange={setScale} min={70} max={140} />
                </div>
                <div>
                  <label className="text-sm">Transparency: {alpha[0]}%</label>
                  <Slider value={alpha} onValueChange={setAlpha} min={30} max={100} />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" size="lg">
                <ShoppingCart className="w-4 h-4 mr-2" /> Buy Now
              </Button>
              <Button variant="outline" className="flex-1" size="lg">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
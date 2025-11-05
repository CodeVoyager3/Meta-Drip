// TryOn.tsx
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Camera, Settings, ShoppingCart, Share2, Video, VideoOff } from "lucide-react";
import { Holistic } from "@mediapipe/holistic";
import { Camera as MPCamera } from "@mediapipe/camera_utils";

export default function TryOn() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState([100]);
  const [alpha, setAlpha] = useState([100]);
  const [cameraOn, setCameraOn] = useState(false);
  const [glassesImg] = useState(() => {
    const img = new Image();
    img.src = "/glass.png";  // ← Put glass.png in public/
    return img;
  });

  let holistic: Holistic | null = null;
  let camera: MPCamera | null = null;

  const startCamera = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    holistic = new Holistic({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    });

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    holistic.onResults(onResults);

    camera = new MPCamera(videoRef.current, {
      onFrame: async () => {
        if (holistic && videoRef.current) {
          await holistic.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });

    camera.start();
    setCameraOn(true);
  };

  const stopCamera = () => {
    if (camera) camera.stop();
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

    if (results.faceLandmarks) {
      const landmarks = results.faceLandmarks;
      const leftEye = landmarks[33];  // Inner corner
      const rightEye = landmarks[263];

      const w = canvas.width;
      const h = canvas.height;

      const leX = leftEye.x * w;
      const leY = leftEye.y * h;
      const reX = rightEye.x * w;
      const reY = rightEye.y * h;

      const eyeDist = Math.hypot(reX - leX, reY - leY);
      const glassWidth = eyeDist * 2.2 * (scale[0] / 100);
      const glassHeight = glassWidth * (glassesImg.height / glassesImg.width);

      const centerX = (leX + reX) / 2;
      const centerY = (leY + reY) / 2;

      const x = centerX - glassWidth / 2;
      const y = centerY - glassHeight / 2;

      ctx.globalAlpha = alpha[0] / 100;
      ctx.drawImage(glassesImg, x, y, glassWidth, glassHeight);
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

  useEffect(() => {
    return () => {
      if (camera) camera.stop();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Try On Glasses (Live Webcam)</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Camera + Canvas */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
            <video ref={videoRef} className="hidden" />
            <canvas ref={canvasRef} width={640} height={480} className="w-full" />

            {!cameraOn && (
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

          {/* Controls */}
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

            <p className="text-xs text-muted-foreground text-center">
              Uses your webcam • Works on mobile • No data sent to server
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Camera, FlipHorizontal, Settings, ArrowLeft, Share2, ShoppingCart, Maximize2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import glasses1 from "@/assets/glasses-1.png";
import { motion, AnimatePresence } from "framer-motion";

// **IMPORTANT**: This URL MUST match the Flask server's address and port (e.g., 
// http://<YOUR_IP_ADDRESS>:5000/video_feed if running on a separate machine).
const PYTHON_STREAM_URL = "http://localhost:5000/video_feed"; 

const product = {
  id: 1, 
  name: "Premium Blue Eyeglasses",
  price: 149.99,
  image: glasses1,
};

const TryOn = () => {
  const { id } = useParams();
  const [faceDetected, setFaceDetected] = useState(true); // Assumed true as the server is running
  const [showSettings, setShowSettings] = useState(false);
  const [scale, setScale] = useState([100]);
  const [transparency, setTransparency] = useState([100]);
  
  // Note: These functions are stubs. Real implementation would require a dedicated 
  // API endpoint on the Flask server and communication (e.g., WebSockets) from the React app.

  const flipCamera = () => {
    // This action would require an API call to the Python server to change its VideoCapture index/source.
    console.log("Flipping camera: Requires a dedicated Flask endpoint.");
  };

  const captureScreenshot = () => {
    // Capturing an MJPEG stream is complex and is best done on the server or via a second WebSocket stream.
    alert("Screenshot requires an additional endpoint on the Python server to return a static image.");
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="glass" asChild className="mb-4">
            <Link to={`/product/${id || 1}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Product
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative glass-strong rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-muted to-background relative">
                
                {/* *** STREAM EMBEDDED HERE *** */}
                {/* This <img> tag displays the live processed stream from your Python backend */}
                <img 
                  src={PYTHON_STREAM_URL}
                  alt="Virtual Try-On Stream from Python Server"
                  className="w-full h-full object-cover aspect-video" 
                  // Styles for stream
                />
                
                {/* --- UI Overlays (Status, Buttons) --- */}

                <motion.div 
                  className="absolute top-4 left-4 flex items-center gap-2 glass-strong px-4 py-2 rounded-full text-sm shadow-lg"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div 
                    className={`w-2 h-2 rounded-full ${faceDetected ? 'bg-green-500' : 'bg-red-500'}`}
                    animate={faceDetected ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                  <span className="font-medium">{faceDetected ? 'Face Detected (Remote)' : 'Stream Active'}</span>
                </motion.div>

                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="glass" size="icon" className="w-12 h-12 rounded-full shadow-lg" onClick={flipCamera}>
                      <FlipHorizontal className="w-5 h-5" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="accent" size="icon" className="w-16 h-16 rounded-full shadow-xl" onClick={captureScreenshot}>
                      <Camera className="w-6 h-6" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="glass" size="icon" className="w-12 h-12 rounded-full shadow-lg" onClick={() => setShowSettings(!showSettings)}>
                      <Settings className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (Settings/Buttons) */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <motion.div className="glass rounded-xl p-2" whileHover={{ scale: 1.05 }}>
                  <img src={product.image} alt="Product" className="w-20 h-20 object-contain" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-2xl font-bold gradient-text">${product.price}</p>
                </div>
              </div>

              <AnimatePresence>
                {showSettings && (
                  <motion.div 
                    className="space-y-6 pt-6 border-t border-border/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div>
                      <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-accent" />
                        Size: {scale[0]}%
                      </label>
                      <Slider value={scale} onValueChange={setScale} min={80} max={120} step={1} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-3 block">Transparency: {transparency[0]}%</label>
                      <Slider value={transparency} onValueChange={setTransparency} min={50} max={100} step={1} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="accent" className="w-full" size="lg">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="glass" className="w-full" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </motion.div>
            </div>

            <motion.div className="glass-strong rounded-2xl p-5">
              <p className="text-sm">
                <span className="text-2xl mr-2">💡</span>
                <strong className="text-accent">Tip:</strong>{" "}
                <span className="text-muted-foreground">Adjust lighting for best results.</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;
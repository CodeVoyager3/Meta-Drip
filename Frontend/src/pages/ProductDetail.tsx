import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Heart, Share2, Star, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import glasses1 from "@/assets/glasses-1.png";
import glasses2 from "@/assets/glasses-2.png";
import glasses3 from "@/assets/glasses-3.png";
import glasses4 from "@/assets/glasses-4.png";
import { motion } from "framer-motion";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data - in real app, fetch based on id
  const product = {
    id: parseInt(id || "1"),
    name: "Premium Blue Eyeglasses",
    category: "Eyeglasses",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 234,
    description:
      "Elevate your style with these premium blue eyeglasses. Crafted with precision and comfort in mind, featuring a modern acetate frame that's both durable and lightweight. Perfect for everyday wear.",
    images: [glasses1, glasses2, glasses3, glasses4],
    features: [
      "High-quality acetate frame",
      "Blue light blocking lenses",
      "Comfortable nose pads",
      "Spring hinges for durability",
      "Comes with protective case",
    ],
    details: {
      material: "Acetate Frame",
      color: "Navy Blue",
      shape: "Rectangular",
      lensType: "Blue Light Blocking",
      size: "Medium Fit",
    },
  };

  const relatedProducts = [
    { id: 2, name: "Classic Black Sunglasses", price: 199.99, image: glasses2 },
    { id: 3, name: "Aviator Gold Frame", price: 179.99, image: glasses3 },
    { id: 4, name: "Navy Cat-Eye Glasses", price: 159.99, image: glasses4 },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild>
            <Link to="/store">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Link>
          </Button>
        </motion.div>

        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.div 
              className="glass rounded-3xl overflow-hidden p-8 aspect-square"
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`glass rounded-xl overflow-hidden p-2 transition-all ${
                    selectedImage === index ? "ring-2 ring-accent" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-contain" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div>
              <motion.div 
                className="inline-block glass px-4 py-1.5 rounded-full mb-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <span className="text-sm font-semibold text-accent">{product.category}</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {product.name}
              </motion.h1>
              
              {/* Rating */}
              <motion.div 
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{product.rating}</span>
                </div>
                <button className="text-sm text-accent hover:underline">
                  Read {product.reviews} reviews
                </button>
              </motion.div>

              {/* Price */}
              <motion.div 
                className="flex items-baseline gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
                <span className="glass-strong text-accent text-sm font-semibold px-3 py-1 rounded-full">
                  25% OFF
                </span>
              </motion.div>

              {/* Description */}
              <motion.p 
                className="text-muted-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {product.description}
              </motion.p>

              {/* Features */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="font-semibold mb-3 text-primary">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Details */}
              <motion.div 
                className="glass rounded-2xl p-5 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="font-semibold mb-3 text-primary">Product Details:</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="ml-2 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="xl" variant="accent" className="w-full">
                  <Link to={`/try-on/${product.id}`}>
                    <Camera className="w-5 h-5 mr-2" />
                    TRY ME
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="xl" variant="default" className="w-full">
                  Buy Now
                </Button>
              </motion.div>
              
              <div className="flex gap-3">
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="glass" 
                    className="w-full"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                    Wishlist
                  </Button>
                </motion.div>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="glass" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Shipping Info */}
            <motion.div 
              className="glass-strong rounded-2xl p-5 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="font-medium mb-1 flex items-center gap-2">
                <span className="text-xl">🚚</span>
                Free shipping on orders over $50
              </p>
              <p className="text-muted-foreground">30-day returns policy</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div>
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            You Might Also <span className="gradient-text">Like</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Link
                  to={`/product/${item.id}`}
                  className="block glass rounded-2xl overflow-hidden group"
                >
                  <div className="aspect-square bg-gradient-to-br from-muted to-background p-6">
                    <motion.img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
                    <p className="text-lg font-bold text-primary">${item.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Search, Heart, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import glasses1 from "@/assets/glasses-1.png";
import glasses2 from "@/assets/glasses-2.png";
import glasses3 from "@/assets/glasses-3.png";
import glasses4 from "@/assets/glasses-4.png";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
}

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const products: Product[] = [
    {
      id: 1,
      name: "Premium Blue Eyeglasses",
      category: "eyeglasses",
      price: 149.99,
      image: glasses1,
      badge: "Popular",
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 2,
      name: "Classic Black Sunglasses",
      category: "sunglasses",
      price: 199.99,
      image: glasses2,
      badge: "New",
      rating: 4.9,
      reviews: 189,
    },
    {
      id: 3,
      name: "Aviator Gold Frame",
      category: "sunglasses",
      price: 179.99,
      image: glasses3,
      rating: 4.7,
      reviews: 156,
    },
    {
      id: 4,
      name: "Navy Cat-Eye Glasses",
      category: "eyeglasses",
      price: 159.99,
      image: glasses4,
      badge: "Popular",
      rating: 4.8,
      reviews: 201,
    },
    {
      id: 5,
      name: "Modern Blue Frame",
      category: "eyeglasses",
      price: 139.99,
      image: glasses1,
      rating: 4.6,
      reviews: 98,
    },
    {
      id: 6,
      name: "Sport Sunglasses",
      category: "sunglasses",
      price: 189.99,
      image: glasses2,
      rating: 4.7,
      reviews: 167,
    },
  ];

  const categories = [
    { id: "all", label: "All Products" },
    { id: "eyeglasses", label: "Eyeglasses" },
    { id: "sunglasses", label: "Sunglasses" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Browse Our <span className="gradient-text">Collection</span>
          </h1>
          <p className="text-muted-foreground text-lg">Discover the perfect accessories for your style</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div 
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative glass rounded-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-transparent border-0 focus-visible:ring-0"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedCategory === category.id ? "accent" : "glass"}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group glass rounded-2xl overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gradient-to-br from-muted to-background p-6">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  />
                  {product.badge && (
                    <motion.div 
                      className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      {product.badge}
                    </motion.div>
                  )}
                  <motion.button
                    className={`absolute top-3 left-3 w-9 h-9 glass-strong rounded-full flex items-center justify-center shadow-md ${
                      favorites.has(product.id) ? "text-red-500" : "text-muted-foreground"
                    }`}
                    aria-label="Add to wishlist"
                    onClick={() => toggleFavorite(product.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(product.id) ? "fill-current" : ""}`} />
                  </motion.button>
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-medium">{product.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <p className="text-2xl font-bold text-primary">${product.price}</p>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button asChild className="w-full" size="sm" variant="accent">
                        <Link to={`/try-on/${product.id}`}>
                          <Camera className="w-4 h-4 mr-2" />
                          Try Me
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button asChild variant="glass" className="w-full" size="sm">
                        <Link to={`/product/${product.id}`}>View Details</Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground text-lg">No products found matching your search.</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Store;

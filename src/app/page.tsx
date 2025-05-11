"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import TestimonialCard from "@/components/TestimonialCard";
import { motion } from "framer-motion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Textarea } from "@/components/ui/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faYelp,
} from "@fortawesome/free-brands-svg-icons";

// Sample property data
const featuredProperties = [
  {
    id: 1,

    title: "Luxury Desert Oasis",
    address: "123 Palm Springs Dr, Pahrump, NV",
    price: "$599,000",
    beds: 4,
    baths: 3,
    sqft: 2850,
    type: "Single Family",
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,

    title: "Modern Desert Home",
    address: "456 Mountain View Ave, Pahrump, NV",
    price: "$425,000",
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: "Single Family",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Family Home with Yard",
    address: "789 Green Valley Rd, Pahrump, NV",
    price: "$375,000",
    beds: 3,
    baths: 2,
    sqft: 1950,
    type: "Single Family",
    isNew: true,
  },
];

const soldItems = [
  {
    title: "Top Residential Sales Last 5 Years",
    text: `We helped nearly 90 clients in 2021, and closed $28.5 million in sales!  
Our team works hard every day to grow and learn, so that we may continue to excel in our market.  
Our clients deserve our best, & we want to make sure our best is better every year.`,
    img: "/kitchen.webp",
    alt: "Modern kitchen interior",
    reverse: false,
  },
  {
    title: `Don't Just List It…`,
    text: `Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips  
of every possible buyer, getting you top dollar for your home.`,
    img: "/front.webp",
    alt: "Luxury home with pool",
    reverse: true,
  },
  {
    title: "Guide to Buyers",
    text: `Nobody knows the market like we do. Enjoy having a pro at your service.  
Market analysis, upgrade lists, contractors on speed dial, & more!`,
    img: "/keys.webp",
    alt: "House keys on wooden table",
    reverse: false,
  },
];

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    quote:
      "Marci went above and beyond to help us find our dream home. Her knowledge of the Pahrump area is unmatched, and she made the entire process smooth and stress-free.",
    author: "John & Sarah Thompson",
    role: "Home Buyers",
  },
  {
    id: 2,
    quote:
      "As a first-time home seller, I was nervous about the process. Marci guided me every step of the way and got me an excellent price for my property. I couldn't be happier!",
    author: "Michael Rodriguez",
    role: "Home Seller",
  },
  {
    id: 3,
    quote:
      "Marci's attention to detail and professionalism are outstanding. She understood exactly what we were looking for and didn't waste our time with properties that didn't fit our needs.",
    author: "Lisa & David Chen",
    role: "Home Buyers",
  },
];

// Gallery card items
const galleryItems = [
  {
    image: "/sl1.webp  ",
    title: "Modern Home Design",
    description: "Contemporary living spaces with premium finishes",
  },
  {
    image: "/sl2.webp",
    title: "Mountain Views",
    description: "Properties with stunning landscape views",
  },
  {
    image: "/sl3.webp",
    title: "Luxury Kitchens",
    description: "Premium kitchen designs with high-end appliances",
  },
  {
    image: "/sl4.webp",
    title: "New Ownership",
    description: "Helping clients find their perfect home",
  },
  {
    image: "/sl5.webp",
    title: "Beautiful Landscapes",
    description: "Properties with meticulously maintained gardens",
  },
  {
    image: "/sl6.webp",
    title: "Welcoming Entry",
    description: "First impressions that last a lifetime",
  },
  {
    image: "/sl7.webp",
    title: "Luxury Living",
    description: "A home that feels like a luxury hotel",
  },
];

const images = [
  "/sl1.webp",
  "/sl2.webp",
  "/sl3.webp",
  "/sl4.webp",
  "/sl5.webp",
  "/sl6.webp",
  "/sl7.webp",
];

const logos = ["/icon-1.webp", "/icon-2.webp", "/icon-3.webp", "/icon-4.webp"];

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  // Function to start or restart the timer
  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 5 seconds
  };

  // Start on mount
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Handle click and reset timer
  const handleImageClick = (index: number) => {
    setCurrent(index);
    startAutoSlide(); // Reset the timer
  };

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[900px] w-full overflow-hidden">
        {/* Parallax background */}
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: 'url("/green.webp")' }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-xl md:text-2xl text-white mb-4 font-sans">
            MARCI METZGER - THE RIDGE REALTY GROUP
          </h1>
          <p className="text-2xl md:text-6xl font-[cinzel] text-white mb-6 uppercase">
            Pahrump Realtor
          </p>
          <Button
            size="lg"
            className="bg-white hover:bg-slate-200 text-black rounded-full"
          >
            Call Now
          </Button>
        </div>
      </section>

      {/* About Marci Section */}
      <section
        id="about"
        className="py-16 bg-neutral-900 text-center h-[800px]"
      >
        <div className="container mx-auto my-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="relative w-[400px] h-[400px] mx-auto mb-16"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="/girl.webp"
                alt="Marci Metzger"
                fill
                className="rounded-full object-cover"
              />
            </motion.div>
            <motion.h2
              className="text-7xl font-[cinzel] mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              MARCI METZGER
            </motion.h2>
            <motion.p
              className="text-gray-300 mb-10 font-sans text-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              REALTOR FOR NEARLY 3 DECADES!
            </motion.p>
            <motion.p
              className="text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              206-919-6886
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      {/* Get It Sold Section */}
      <section id="sold" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4  max-w-5xl">
          <h2 className="text-4xl font-[cinzel] text-center mb-12">
            GET IT SOLD
          </h2>

          <div className="space-y-12">
            {soldItems.map(({ title, text, img, alt, reverse }, i) => (
              <motion.div
                key={i}
                className={`
                bg-white rounded-2xl  overflow-hidden 
                grid grid-cols-1 md:grid-cols-2 items-center
                ${
                  reverse ? "md:grid-flow-col-dense md:grid-cols-[1fr,2fr]" : ""
                }
              `}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Image side */}
                <div className="relative w-full h-64 md:h-80">
                  <Image src={img} alt={alt} fill className="object-cover" />
                </div>

                {/* Text side */}
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-semibold font-sans1 mb-4">
                    {title}
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Listings Section */}
      <section className="py-16 relative bg-gradient-to-b from-gray-50 to-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-75"
          style={{ backgroundImage: "url('/door.webp')" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-light text-center mb-3 text-white"
            >
              FIND YOUR <span className="font-semibold">DREAM HOME</span>
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="w-24 h-1 bg-blue-500 mx-auto mb-12"
            />

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-8 backdrop-blur-sm bg-opacity-95"
            >
              <h3 className="text-2xl font-medium text-gray-700 mb-8 text-center">
                Search Listings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Location
                  </label>
                  <Select defaultValue="any">
                    <SelectTrigger className="w-full bg-gray-50">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="pahrump">Pahrump</SelectItem>
                      <SelectItem value="las-vegas">Las Vegas</SelectItem>
                      <SelectItem value="henderson">Henderson</SelectItem>
                      <SelectItem value="reno">Reno</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Type
                  </label>
                  <Select defaultValue="any">
                    <SelectTrigger className="w-full bg-gray-50">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="single-family">
                        Single Family
                      </SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Sort By
                  </label>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-full bg-gray-50">
                      <SelectValue placeholder="Newest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low-high">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high-low">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="bedrooms">Bedrooms</SelectItem>
                      <SelectItem value="bathrooms">Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Bedrooms
                  </label>
                  <Select defaultValue="any">
                    <SelectTrigger className="w-full bg-gray-50">
                      <SelectValue placeholder="Any Number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Number</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Baths
                  </label>
                  <Select defaultValue="any">
                    <SelectTrigger className="w-full bg-gray-50">
                      <SelectValue placeholder="Any Number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Number</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Min Price
                  </label>
                  <Input
                    type="text"
                    placeholder="$ Enter amount"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="bg-gray-50"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Max Price
                  </label>
                  <Input
                    type="text"
                    placeholder="$ Enter amount"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="bg-gray-50"
                  />
                </motion.div>
              </div>

              <div className="flex justify-center mt-8">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    variant="default"
                    size="lg"
                    className="px-10 bg-gray-900 hover:bg-gray-700 text-white font-medium"
                  >
                    SEARCH NOW
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/*  Partnerships Section */}
      <section className="bg-white py-10 px-4">
        <div className="flex flex-wrap justify-center items-center gap-16 max-w-6xl mx-auto">
          {logos.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Logo ${idx + 1}`}
              className="h-24 w-auto object-contain grayscale hover:grayscale-0 transition duration-300 cursor-pointer"
            />
          ))}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section
        id="gallery"
        className="bg-neutral-900 text-white min-h-screen flex flex-col items-center justify-center px-4 py-10"
      >
        <h2 className="text-4xl font-[cinzel] mb-8 tracking-wider">
          PHOTO GALLERY
        </h2>

        <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg">
          <motion.img
            key={images[current]}
            src={images[current]}
            alt="Gallery"
            initial={{ opacity: 0.3, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div className="flex mt-6 gap-3 overflow-x-auto max-w-4xl p-2 rounded-lg scrollbar-hide">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => handleImageClick(index)}
              className={`h-20 w-28 object-cover rounded-md cursor-pointer transition-transform duration-200 ${
                current === index
                  ? "ring-4 ring-blue-400 scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-[cinzel] text-center mb-12"
          >
            OUR SERVICES
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="relative h-72 w-full mb-4">
                      <Image
                        src="/service-1.webp"
                        alt="Home interior bathroom"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    One-on-one, personalized real estate service from start to
                    finish. We'll work together to find the home of your dreams
                    or sell your current property at the best possible price.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="relative h-72 w-full mb-4">
                      <Image
                        src="/service-2.webp"
                        alt="Grassy backyard"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Comprehensive market analysis to determine the best listing
                    price for your property or help you understand what homes
                    are worth in your desired neighborhood.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="relative h-72 w-full mb-4">
                      <Image
                        src="/service-3.webp"
                        alt="Real estate paperwork"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    Professional guidance through the often complex world of
                    real estate transactions, ensuring your interests are
                    protected and you understand every step of the process.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100 ">
        <div className="container  mx-auto px-4">
          <h2 className="text-4xl font-[cinzel] text-center mb-4">
            CLIENT TESTIMONIALS
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued clients have
            to say about working with Marci Metzger.
          </p>

          <div className="py-8 w-full">
            <InfiniteMovingCards
              items={testimonials.map((testimonial) => ({
                quote: testimonial.quote,
                name: testimonial.author,
                title: testimonial.role,
              }))}
              direction="left"
              speed="slow"
              pauseOnHover={true}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-100  ">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-center text-2xl md:text-3xl font-serif text-gray-700 mb-10">
            Call or Visit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Send Message</h3>
              <form className="space-y-4">
                <Input placeholder="Name" className="border-gray-300" />
                <Input
                  placeholder="Email*"
                  className="border-gray-300"
                  required
                />
                <Textarea
                  placeholder="Message"
                  className="border-gray-300 h-32"
                />
                <Button className="rounded-full px-8 py-2 bg-gray-700 hover:bg-gray-800">
                  SEND
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-2">
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
            </div>

            {/* Office Info */}
            <div className="space-y-6">
              <a
                href="https://wa.me/12069196886"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                Message us on WhatsApp
              </a>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Marci Metzger</strong> - THE RIDGE REALTY GROUP
                </p>
                <p>
                  3190 HW-160, Suite F, Pahrump, Nevada 89048, United States
                </p>
                <p>(206) 919-6886</p>
              </div>

              <div className="text-sm text-gray-700">
                <h4 className="font-semibold mb-2">Office Hours</h4>
                <ul className="space-y-1">
                  <li>Mon - Fri: 08:00 am – 07:00 pm</li>
                  <li>
                    Sat: <strong>08:00 am – 07:00 pm</strong>
                  </li>
                  <li>Sun: 08:00 am – 07:00 pm</li>
                  <li>Open daily: 8:00 am - 7:00 pm</li>
                </ul>
                <p className="text-xs mt-2 text-gray-500">
                  Appointments outside office hours available upon request. Just
                  call!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 h-80 w-full rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51869.62616854972!2d-116.00968395!3d36.2083261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c1fbd6a5cb5e8f%3A0x27136584d5b17fe7!2sPahrump%2C%20NV%2089048!5e0!3m2!1sen!2sus!4v1659987654321!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
          {/* Social Icons */}
          <div className="flex justify-center space-x-6 text-lg">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-gray-300 transition"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-gray-300 transition"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-gray-300 transition"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="#"
              aria-label="Yelp"
              className="hover:text-gray-300 transition"
            >
              <FontAwesomeIcon icon={faYelp} />
            </a>
          </div>

          {/* Divider */}
          <div className="h-px w-24 mx-auto bg-gray-600"></div>

          {/* Copyright */}
          <p className="text-sm font-light tracking-wide uppercase text-gray-200">
            &copy; {new Date().getFullYear()} Marci Metzger Homes &mdash; All
            rights reserved
          </p>

          {/* Powered by */}
          <div className="text-xs text-gray-400">
            Powered by{" "}
            <svg
              viewBox="0 0 131 20"
              fill="currentColor"
              width="131"
              height="20"
              data-ux="IconAiro"
              className="mx-auto mt-4"
            >
              <g>
                <path
                  fill="evenodd"
                  d="M19.3748 0.914408C17.0406 -0.544155 13.967 -0.197654 11.2308 1.52588C8.49389 -0.197654 5.42186 -0.544155 3.08767 0.914408C-0.599906 3.21843 -1.04832 9.15459 2.08731 14.1719C4.39948 17.8717 8.01369 20.0388 11.2308 19.9988C14.448 20.0388 18.063 17.8717 20.3744 14.1719C23.51 9.15459 23.0624 3.21925 19.3748 0.914408ZM3.7823 13.1129C3.12273 12.057 2.636 10.9425 2.33516 9.79949C2.05225 8.72249 1.94626 7.67157 2.02208 6.6761C2.16231 4.82212 2.91646 3.37823 4.14674 2.60941C5.37702 1.84058 7.00598 1.79574 8.73359 2.48222C8.99367 2.58576 9.2513 2.70561 9.50567 2.8385C8.58521 3.67255 7.73893 4.67536 7.01984 5.82656C5.1145 8.87576 4.53482 12.2633 5.19929 14.9693C4.67831 14.4075 4.20381 13.7863 3.78312 13.112L3.7823 13.1129ZM20.1265 9.79949C19.8257 10.9425 19.3389 12.057 18.6794 13.1129C18.2579 13.7871 17.7842 14.4075 17.2632 14.9693C17.8576 12.5462 17.4556 9.57855 15.9971 6.79513C15.8943 6.59946 15.6579 6.53424 15.4704 6.65164L10.9292 9.48886C10.7555 9.5973 10.7025 9.8264 10.811 10.0001L11.4771 11.0656C11.5855 11.2393 11.8146 11.2923 11.9882 11.1839L14.9315 9.34456C15.0301 9.62747 15.1182 9.912 15.194 10.1982C15.4769 11.2752 15.5829 12.3261 15.5071 13.3216C15.3668 15.1755 14.6127 16.6194 13.3824 17.3883C12.7677 17.7723 12.0543 17.9753 11.2781 17.9973C11.261 17.9973 11.2439 17.9973 11.2276 17.9973C11.2129 17.9973 11.1982 17.9973 11.1844 17.9973C10.4082 17.9753 9.69401 17.7723 9.07928 17.3883C7.849 16.6194 7.09403 15.1747 6.95462 13.3216C6.87961 12.3261 6.98478 11.2752 7.26769 10.1982C7.56853 9.05513 8.05526 7.94062 8.71484 6.88481C9.37441 5.82901 10.1628 4.90283 11.0588 4.13156C11.9026 3.40513 12.8011 2.84992 13.7289 2.48059C15.4565 1.79411 17.0855 1.83895 18.3158 2.60778C19.546 3.3766 20.301 4.8213 20.4404 6.67447C20.5154 7.66994 20.4102 8.72086 20.1273 9.79786L20.1265 9.79949Z"
                ></path>
                <path
                  fill="evenodd"
                  d="M43.5589 7.57455C45.9624 7.57455 47.8922 9.43832 47.8922 11.81C47.8922 14.1817 45.9624 15.9957 43.5589 15.9957C41.1554 15.9957 39.2419 14.1646 39.2419 11.81C39.2419 9.45544 41.1717 7.57455 43.5589 7.57455ZM43.5589 13.7838C44.6759 13.7838 45.5132 12.8935 45.5132 11.7929C45.5132 10.6922 44.6759 9.78645 43.5589 9.78645C42.442 9.78645 41.621 10.6931 41.621 11.7929C41.621 12.8927 42.4583 13.7838 43.5589 13.7838ZM59.2338 10.027C59.2338 13.4284 56.7912 15.7666 53.2756 15.7666H48.8828C48.67 15.7666 48.5232 15.6028 48.5232 15.3908V4.68025C48.5232 4.48377 48.67 4.32071 48.8828 4.32071H53.2756C56.7912 4.32071 59.2338 6.60924 59.2338 10.027ZM56.6664 10.0278C56.6664 8.03275 55.3253 6.57745 53.38 6.57745H50.9765V13.5107H53.38C55.3261 13.5107 56.6664 11.9902 56.6664 10.0278ZM63.6951 7.57537C64.7582 7.57537 65.6086 8.03356 65.9844 8.65482V8.16401C65.9844 7.96752 66.1646 7.80447 66.3277 7.80447H67.9794C68.1759 7.80447 68.3227 7.96834 68.3227 8.16401V15.4242C68.3227 15.6207 68.1759 15.7675 67.9794 15.7675H66.3277C66.1475 15.7675 65.9844 15.6207 65.9844 15.4242V14.9171C65.6086 15.5384 64.7419 15.9965 63.6788 15.9965C61.6185 15.9965 59.705 14.3448 59.705 11.7774C59.705 9.21003 61.6348 7.57537 63.6951 7.57537ZM64.137 13.801C65.2319 13.801 66.0521 12.9604 66.0521 11.7945C66.0521 10.6286 65.2311 9.78808 64.137 9.78808C63.0428 9.78808 62.2218 10.6286 62.2218 11.7945C62.2218 12.9604 63.0428 13.801 64.137 13.801ZM72.9177 7.57537C73.9971 7.57537 74.8638 8.03356 75.2396 8.62221V4.66313C75.2396 4.46665 75.4035 4.31989 75.5992 4.31989H77.251C77.4475 4.31989 77.5942 4.46665 77.5942 4.66313V15.4234C77.5942 15.6199 77.4475 15.7666 77.251 15.7666H75.5992C75.4198 15.7666 75.256 15.6199 75.256 15.4234V14.9163C74.8141 15.5375 74.0135 15.9957 72.9503 15.9957C70.8901 15.9957 68.9766 14.3439 68.9766 11.7766C68.9766 9.20922 70.8737 7.57374 72.9177 7.57374M73.4085 13.8205C74.4977 13.8205 75.3155 12.9718 75.3155 11.7929C75.3155 10.614 74.4986 9.76525 73.4085 9.76525C72.3185 9.76525 71.5015 10.614 71.5015 11.7929C71.5015 12.9718 72.3185 13.8205 73.4085 13.8205ZM82.1884 7.57374C83.2679 7.57374 84.1345 8.03193 84.5104 8.62057V4.66313C84.5104 4.46665 84.6742 4.31989 84.8699 4.31989H86.5217C86.7182 4.31989 86.8649 4.46665 86.8649 4.66313V15.4234C86.8649 15.6199 86.7174 15.7666 86.5217 15.7666H84.8699C84.6897 15.7666 84.5267 15.6199 84.5267 15.4234V14.9163C84.0848 15.5375 83.2842 15.9957 82.221 15.9957C80.1608 15.9957 78.2473 14.3439 78.2473 11.7766C78.2473 9.20922 80.1445 7.57374 82.1884 7.57374ZM82.6792 13.8205C83.7685 13.8205 84.5862 12.9718 84.5862 11.7929C84.5862 10.614 83.7693 9.76525 82.6792 9.76525C81.5892 9.76525 80.7722 10.614 80.7722 11.7929C80.7722 12.9718 81.5892 13.8205 82.6792 13.8205ZM95.2511 7.80283H93.6034C93.3416 7.80283 93.2112 7.98301 93.1623 8.17869L91.6409 13.8662L90.012 8.17869C89.9182 7.8754 89.7698 7.80283 89.5579 7.80283H87.8205C87.412 7.80283 87.3362 8.08085 87.4185 8.35887L89.6231 15.4226C89.6883 15.6191 89.8196 15.7658 90.065 15.7658H91.0629L90.8509 16.467C90.6422 17.0727 90.2533 17.2358 89.7454 17.2358C89.31 17.2358 89.0247 17.0638 88.7165 16.8648C88.5983 16.7882 88.5061 16.7523 88.3912 16.7523C88.2428 16.7523 88.1409 16.8192 88.0031 17.023L87.5139 17.756C87.4185 17.9076 87.3672 17.9916 87.3672 18.1538C87.3672 18.4139 87.6272 18.577 87.9387 18.7547C88.4752 19.0612 89.1584 19.2145 89.9093 19.2145C91.5611 19.2145 92.6234 18.3152 93.0979 16.811L95.5625 8.35887C95.6767 8.03193 95.578 7.80283 95.2511 7.80283ZM36.5099 14.2045C35.644 15.2978 34.1398 15.9859 32.4375 15.9859C29.2415 15.9859 26.7426 13.5816 26.7426 10.1582C26.7426 6.7348 29.4396 4.14787 32.8468 4.14787C35.3619 4.14787 37.3733 5.22976 38.2652 7.40497C38.2929 7.4759 38.3068 7.53297 38.3068 7.58597C38.3068 7.68951 38.2391 7.76696 38.0222 7.84278L36.43 8.45589C36.3077 8.49747 36.2033 8.49502 36.1283 8.45996C36.0468 8.42246 35.9971 8.34745 35.9384 8.24228C35.3717 7.15631 34.351 6.41765 32.7864 6.41765C30.7563 6.41765 29.3027 8.0034 29.3027 10.0588C29.3027 12.1141 30.5419 13.6893 32.8435 13.6893C34.055 13.6893 35.022 13.1161 35.472 12.4908H34.0346C33.8235 12.4908 33.6612 12.3285 33.6612 12.1174V10.8904C33.6612 10.6792 33.8235 10.517 34.0346 10.517H38.2465C38.4576 10.517 38.6199 10.6629 38.6199 10.8741V15.3892C38.6199 15.6003 38.4576 15.7626 38.2465 15.7626H36.8833C36.6721 15.7626 36.5099 15.6003 36.5099 15.3892V14.2045Z"
                ></path>
                <path
                  fill="evenodd"
                  d="M129.305 7.81017C129.3 7.80528 129.294 7.80283 129.286 7.80283H129.084C129.074 7.80283 129.066 7.80446 129.061 7.80854C129.054 7.81262 129.049 7.81914 129.046 7.82648L128.858 8.25125L128.671 7.82648C128.668 7.81833 128.663 7.81262 128.656 7.80854C128.65 7.80446 128.642 7.80283 128.633 7.80283H128.426C128.419 7.80283 128.412 7.80528 128.407 7.81017C128.402 7.81506 128.399 7.82159 128.399 7.82892V8.62547C128.399 8.63362 128.402 8.63933 128.407 8.64503C128.412 8.64993 128.417 8.65237 128.425 8.65237H128.546C128.553 8.65237 128.559 8.64993 128.564 8.64503C128.569 8.64014 128.571 8.63362 128.571 8.62628V8.02459L128.768 8.46159C128.772 8.47138 128.778 8.4779 128.783 8.48198C128.788 8.48605 128.796 8.48768 128.807 8.48768H128.904C128.915 8.48768 128.924 8.48605 128.929 8.48198C128.935 8.4779 128.94 8.47138 128.944 8.46159L129.14 8.02459V8.62628C129.14 8.63443 129.143 8.64014 129.148 8.64585C129.153 8.65074 129.159 8.65319 129.167 8.65319H129.287C129.295 8.65319 129.301 8.65074 129.305 8.64585C129.31 8.64096 129.312 8.63443 129.312 8.62628V7.82974C129.312 7.8224 129.31 7.81506 129.305 7.81017ZM128.214 7.81017C128.209 7.80528 128.203 7.80283 128.195 7.80283H127.524C127.516 7.80283 127.509 7.80528 127.504 7.81017C127.499 7.81588 127.497 7.8224 127.497 7.83055V7.93573C127.497 7.94388 127.499 7.9504 127.504 7.9553C127.509 7.96019 127.516 7.96263 127.524 7.96263H127.769V8.62384C127.769 8.63199 127.772 8.6377 127.776 8.6434C127.782 8.6483 127.788 8.65156 127.795 8.65156H127.922C127.929 8.65156 127.935 8.64911 127.941 8.6434C127.947 8.6377 127.949 8.63199 127.949 8.62384V7.96263H128.195C128.203 7.96263 128.209 7.96019 128.214 7.9553C128.219 7.9504 128.222 7.94388 128.222 7.93573V7.83055C128.222 7.8224 128.219 7.81588 128.214 7.81017ZM113.465 4.81315C113.002 4.56856 112.622 4.18863 112.377 3.72554C112.349 3.67337 112.309 3.63097 112.261 3.60162C112.212 3.57227 112.156 3.55596 112.098 3.55596C111.98 3.55596 111.872 3.622 111.818 3.72554C111.573 4.18863 111.193 4.56856 110.729 4.81315C110.626 4.86777 110.56 4.97539 110.56 5.09279C110.56 5.2102 110.626 5.31782 110.729 5.37244C111.193 5.61703 111.573 5.99696 111.818 6.46004C111.846 6.51222 111.886 6.55462 111.934 6.58397C111.983 6.61332 112.039 6.62962 112.098 6.62962C112.215 6.62962 112.323 6.56359 112.377 6.46004C112.622 5.99696 113.002 5.61703 113.465 5.37244C113.569 5.31782 113.634 5.2102 113.634 5.09279C113.634 4.97539 113.568 4.86777 113.465 4.81315ZM127.11 9.69677C126.772 9.07062 126.297 8.57084 125.684 8.19825C125.07 7.82729 124.354 7.64141 123.537 7.64141C122.72 7.64141 122.003 7.82729 121.389 8.19825C120.776 8.57084 120.301 9.07062 119.963 9.69677C119.626 10.3237 119.457 11.02 119.457 11.7847C119.457 12.5495 119.626 13.2449 119.963 13.8719C120.301 14.4989 120.776 14.9978 121.389 15.3696C122.003 15.7414 122.719 15.9272 123.537 15.9272C124.355 15.9272 125.07 15.7414 125.684 15.3696C126.298 14.9978 126.772 14.4989 127.11 13.8719C127.447 13.2449 127.616 12.5495 127.616 11.7847C127.616 11.02 127.447 10.3237 127.11 9.69677ZM125.34 12.9897C125.205 13.3591 124.99 13.655 124.695 13.8776C124.399 14.0994 124.013 14.2102 123.537 14.2102C123.061 14.2102 122.674 14.0994 122.378 13.8776C122.083 13.655 121.868 13.3591 121.733 12.9897C121.599 12.6204 121.532 12.2185 121.532 11.7847C121.532 11.351 121.599 10.9499 121.733 10.5789C121.868 10.2096 122.083 9.91363 122.378 9.69187C122.674 9.4693 123.06 9.35923 123.537 9.35923C124.014 9.35923 124.399 9.4693 124.695 9.69187C124.99 9.91363 125.205 10.2096 125.34 10.5789C125.474 10.9499 125.541 11.3518 125.541 11.7847C125.541 12.2177 125.474 12.6196 125.34 12.9897ZM119.036 7.67728C118.891 7.65364 118.707 7.64304 118.493 7.64304C117.99 7.64304 117.54 7.8012 117.141 8.12406C116.797 8.39963 116.525 8.77793 116.323 9.25406V7.80283H114.397V15.765H116.308V12.481C116.308 11.9201 116.4 11.4203 116.582 10.9833C116.765 10.5463 117.024 10.1998 117.36 9.94869C117.694 9.69513 118.088 9.56795 118.541 9.56795C118.752 9.56795 118.922 9.58099 119.054 9.61279C119.186 9.64214 119.3 9.67638 119.39 9.71307V7.75473C119.301 7.72538 119.181 7.70255 119.036 7.67565V7.67728ZM111.082 7.80365L107.533 10.181L105.089 4.04188H103.572L99.0838 15.3321C98.7544 16.1629 99.3659 17.0646 100.259 17.0646C100.385 17.0646 100.509 17.0458 100.628 17.01C100.747 16.9741 100.86 16.9203 100.965 16.8502L106.532 13.1153L107.494 15.7658H109.758L108.245 11.9657L111.082 10.0628V15.7658H113.057V7.80365H111.082ZM101.737 14.0659L104.31 6.99732L105.87 11.2956L101.737 14.0659Z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </footer>
    </main>
  );
}

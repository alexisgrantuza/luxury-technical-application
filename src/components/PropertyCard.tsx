import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface PropertyCardProps {
  title: string;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export default function PropertyCard({
  title,
  address,
  price,
  beds,
  baths,
  sqft,
  type,
  isNew = false,
  isFeatured = false,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-0 relative">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src="/1.jpg"
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {isNew && <Badge className="bg-green-500 text-white">New</Badge>}
            {isFeatured && (
              <Badge className="bg-blue-600 text-white">Featured</Badge>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white font-bold text-xl">{price}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{title}</h3>
        <p className="text-gray-500 text-sm mb-3 truncate">{address}</p>
        <div className="flex gap-3 text-sm text-gray-600">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {beds} {beds === 1 ? "Bed" : "Beds"}
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>
            {baths} {baths === 1 ? "Bath" : "Baths"}
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            </svg>
            {sqft.toLocaleString()} sqft
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t bg-gray-50">
        <Badge variant="outline" className="text-blue-600 border-blue-300">
          {type}
        </Badge>
      </CardFooter>
    </Card>
  );
}

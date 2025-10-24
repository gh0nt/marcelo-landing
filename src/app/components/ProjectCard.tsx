"use client";
import { Badge } from "@/app/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  demoUrl,
  repoUrl,
  featured = false,
}: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset loading states when image changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [image]);
  return (
    <div
      className={`glass-card group hover:shadow-elevated transition-all duration-300 overflow-hidden ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-background-secondary flex items-center justify-center relative">
          {image && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
              <Image
                src={image}
                alt={title}
                fill
                className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => {
                  console.log(`Image loaded successfully: ${image}`);
                  setImageLoaded(true);
                }}
                onError={(e) => {
                  console.error(`Failed to load image: ${image}`, e);
                  setImageError(true);
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="text-4xl mb-2">🎨</span>
              {imageError && (
                <span className="text-xs text-foreground-secondary">
                  Image failed to load
                </span>
              )}
            </div>
          )}
        </div>

        {/* Overlay with links */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          {demoUrl && (
            <button className="glass-button p-3 rounded-lg hover:scale-110 transition-transform">
              <ExternalLink size={20} />
            </button>
          )}
          {repoUrl && (
            <button className="glass-button p-3 rounded-lg hover:scale-110 transition-transform">
              <Github size={20} />
            </button>
          )}
        </div>

        {featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary text-primary-foreground">
              Destacado
            </Badge>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-foreground-secondary leading-relaxed">
          {description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="glass-button text-xs font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

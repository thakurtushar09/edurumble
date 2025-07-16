
import { CardSpotlight } from "./ui/card-spotlight";
import { LucideIcon } from "lucide-react";

interface CardSpotlightDemoProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function CardSpotlightDemo({
  icon: Icon,
  title,
  description,
  className = "",
}: CardSpotlightDemoProps) {
  return (
    <CardSpotlight className={`h-96 w-96 flex flex-col items-center justify-center p-8 gap-6 ${className}`}>
      <div className="p-4 rounded-full bg-primary/10">
        <Icon size={48} className="text-primary" />
      </div>
      
      <h3 className="text-2xl font-bold text-center">{title}</h3>
      
      <p className="text-muted-foreground text-center">
        {description}
      </p>
    </CardSpotlight>
  );
}
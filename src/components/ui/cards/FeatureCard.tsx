import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
}

const iconColorMap: Record<string, string> = {
  blue: 'icon-blue',
  green: 'icon-green',
  purple: 'icon-purple',
  orange: 'icon-orange',
  red: 'icon-red',
};

function getIconColorClass(iconColor: string): string {
  const match = Object.keys(iconColorMap).find(color => iconColor.includes(color));
  return match ? iconColorMap[match] : iconColor;
}

export function FeatureCard({ icon: Icon, title, description, iconColor }: FeatureCardProps) {
  return (
    <div className="card-feature transition-transform duration-300 hover:scale-105">
      <Icon className={`h-12 w-12 mx-auto mb-4 ${getIconColorClass(iconColor)}`} />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}

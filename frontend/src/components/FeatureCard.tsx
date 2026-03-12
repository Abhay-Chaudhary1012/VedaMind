import { GlassCard } from './GlassCard';
import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: string;
  delay?: number;
  index : number;
}

export function FeatureCard({ icon: Icon, title, description, accent = 'text-veda-violet-light', delay = 0 }: Props) {
  return (
    <GlassCard delay={delay} className="flex flex-col gap-4">
      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${accent}`}>
        <Icon size={20} />
      </div>
      <div>
        <h3 className="font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm text-white/55 leading-relaxed">{description}</p>
      </div>
    </GlassCard>
  );
}

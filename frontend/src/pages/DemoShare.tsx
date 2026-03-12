/**
 * /demo/share — compact 9:16 vertical layout for LinkedIn demo recording.
 * Designed for screen capture. Keep it clean and focus on the core demo flow.
 */
import { DemoPanel } from '../components/DemoPanel';
import { Brain } from 'lucide-react';

export function DemoShare() {
  return (
    <div className="min-h-screen flex flex-col" style={{ maxWidth: 390, margin: '0 auto', padding: '0 16px' }}>
      {/* Compact header */}
      <div className="py-4 flex items-center gap-2 border-b border-white/10">
        <div className="w-7 h-7 rounded-lg bg-veda-gradient flex items-center justify-center">
          <Brain size={14} className="text-white" />
        </div>
        <span className="font-bold text-sm gradient-text">VedaMind</span>
        <span className="ml-auto text-xs text-white/30 bg-veda-green/20 text-veda-green px-2 py-0.5 rounded-full">LIVE DEMO</span>
      </div>
      {/* Demo panel full height */}
      <div className="flex-1 py-4">
        <DemoPanel />
      </div>
    </div>
  );
}

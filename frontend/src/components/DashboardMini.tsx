import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import type { DashboardData } from '../lib/types';
import { GlassCard } from './GlassCard';
import { Trophy, Clock, TrendingUp, Lock, Unlock, Sparkles } from 'lucide-react';

export function DashboardMini() {
  const { studentId, token, isLoggedIn } = useAuth();
  const [dash, setDash] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !studentId || !token) return;
    setLoading(true);
    api.getDashboard(studentId, token)
      .then(setDash)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isLoggedIn, studentId, token]);

  if (!isLoggedIn) return null;
  if (loading) return <div className="glass p-6 text-center text-white/50 animate-pulse">Loading dashboard...</div>;
  if (!dash) return null;

  const { profile, masteryScores, nextGoal, careerHintIfUnlocked } = dash;
  const maxScore = Math.max(...(masteryScores.map(s => s.score) || [100]));

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <GlassCard hover={false} delay={0} className="p-4 text-center">
          <Clock size={18} className="text-veda-green mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{profile.totalLearningHours.toFixed(1)}h</div>
          <div className="text-xs text-white/40">Learning Hours</div>
        </GlassCard>
        <GlassCard hover={false} delay={0.1} className="p-4 text-center">
          <TrendingUp size={18} className="text-veda-violet-light mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{profile.avgScore}%</div>
          <div className="text-xs text-white/40">Avg Score</div>
        </GlassCard>
        <GlassCard hover={false} delay={0.2} className="p-4 text-center">
          <Trophy size={18} className="text-yellow-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">Tier {Math.max(...(profile.unlockedTiers || [0]))}</div>
          <div className="text-xs text-white/40">Unlocked</div>
        </GlassCard>
      </div>

      {/* Accuracy bar chart (CSS) */}
      {masteryScores.length > 0 && (
        <GlassCard hover={false} className="p-4">
          <p className="text-xs text-white/50 font-medium mb-3">Quiz Score History</p>
          <div className="flex items-end gap-2 h-16">
            {masteryScores.slice(-8).map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm bg-veda-gradient transition-all"
                  style={{ height: `${(s.score / Math.max(maxScore, 1)) * 100}%`, minHeight: 4 }}
                  title={`${s.topic}: ${s.score}%`}
                />
                <span className="text-[9px] text-white/30 truncate w-full text-center">{s.topic.slice(0, 5)}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Tiers */}
      <GlassCard hover={false} className="p-4">
        <p className="text-xs text-white/50 font-medium mb-3">Feature Tiers</p>
        <div className="space-y-2">
          {[
            { tier: 0, name: 'Notes & Basic Quiz', req: 'Always available' },
            { tier: 1, name: 'Analytics & Insights', req: '10 learning hours' },
            { tier: 2, name: 'Career Hints & Advanced Tutor', req: '29 hours' },
          ].map(t => {
            const unlocked = profile.unlockedTiers?.includes(t.tier);
            return (
              <div key={t.tier} className={`flex items-center gap-3 p-2 rounded-lg ${unlocked ? 'bg-veda-green/10' : 'bg-white/3'}`}>
                {unlocked
                  ? <Unlock size={14} className="text-veda-green shrink-0" />
                  : <Lock size={14} className="text-white/25 shrink-0" />}
                <div>
                  <p className={`text-xs font-medium ${unlocked ? 'text-veda-green' : 'text-white/40'}`}>{t.name}</p>
                  <p className="text-[10px] text-white/25">{t.req}</p>
                </div>
              </div>
            );
          })}
        </div>
        {nextGoal && (
          <div className="mt-3 p-2 bg-veda-violet/10 rounded-lg">
            <p className="text-xs text-veda-violet-light">
              🎯 {nextGoal.hoursNeeded.toFixed(1)}h to unlock Tier {nextGoal.tier}
            </p>
            <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-veda-gradient rounded-full"
                style={{ width: `${Math.min(100, ((profile.totalLearningHours) / (nextGoal.tier === 1 ? 10 : 29)) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </GlassCard>

      {/* Career hint */}
      {careerHintIfUnlocked && (
        <GlassCard hover={false} className="p-4 border-veda-violet/30">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-veda-violet-light" />
            <p className="text-sm font-semibold text-veda-violet-light">Career Hint (Tier 2 Unlocked!)</p>
          </div>
          <p className="text-sm text-white/70">{careerHintIfUnlocked.hint}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {careerHintIfUnlocked.matchedFields.map(f => (
              <span key={f} className="text-xs bg-veda-violet/20 text-veda-violet-light px-2 py-0.5 rounded-full">{f}</span>
            ))}
          </div>
          <p className="text-xs text-veda-green mt-3">📌 Next step: {careerHintIfUnlocked.nextStep}</p>
        </GlassCard>
      )}
    </div>
  );
}

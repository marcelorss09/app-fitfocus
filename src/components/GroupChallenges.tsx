"use client";

import { Users, Trophy, Clock, ChevronRight, Target, Flame } from "lucide-react";

interface GroupChallenge {
  id: string;
  name: string;
  description: string;
  participants: number;
  goal: number;
  currentProgress: number;
  reward: number;
  endsIn: string;
  category: "cardio" | "strength" | "endurance";
}

const challenges: GroupChallenge[] = [
  {
    id: "1",
    name: "Maratona de Março",
    description: "Complete 100km em grupo este mês",
    participants: 234,
    goal: 100000,
    currentProgress: 67500,
    reward: 500,
    endsIn: "12 dias",
    category: "cardio"
  },
  {
    id: "2",
    name: "Desafio de Força",
    description: "Levante 50 toneladas coletivamente",
    participants: 156,
    goal: 50000,
    currentProgress: 32000,
    reward: 400,
    endsIn: "8 dias",
    category: "strength"
  },
  {
    id: "3",
    name: "Queima de Calorias",
    description: "Queime 1 milhão de calorias juntos",
    participants: 512,
    goal: 1000000,
    currentProgress: 780000,
    reward: 600,
    endsIn: "5 dias",
    category: "endurance"
  }
];

export default function GroupChallenges() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "cardio":
        return "from-red-500 to-orange-500";
      case "strength":
        return "from-blue-500 to-cyan-500";
      case "endurance":
        return "from-purple-500 to-pink-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cardio":
        return <Flame className="w-5 h-5" />;
      case "strength":
        return <Target className="w-5 h-5" />;
      case "endurance":
        return <Trophy className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Users className="w-7 h-7 text-[#00FF7F]" />
          Desafios em Grupo
        </h3>
        <button className="text-[#00FF7F] text-sm font-semibold flex items-center gap-1">
          Ver todos
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {challenges.map((challenge) => {
        const progress = (challenge.currentProgress / challenge.goal) * 100;

        return (
          <div
            key={challenge.id}
            className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-white/10 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(
                    challenge.category
                  )} rounded-xl flex items-center justify-center`}
                >
                  {getCategoryIcon(challenge.category)}
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">{challenge.name}</h4>
                  <p className="text-sm text-gray-400">
                    {challenge.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-yellow-500">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">+{challenge.reward} XP</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{challenge.participants} participantes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Termina em {challenge.endsIn}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Progresso do Grupo</span>
                  <span className="font-bold text-[#00FF7F]">
                    {progress.toFixed(0)}%
                  </span>
                </div>
                <div className="bg-[#0D0D0D] rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getCategoryColor(
                      challenge.category
                    )} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-[#0D0D0D] py-3 rounded-xl font-bold hover:scale-105 transition-all">
                Participar do Desafio
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

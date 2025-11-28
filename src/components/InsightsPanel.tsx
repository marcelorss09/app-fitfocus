"use client";

import { TrendingUp, TrendingDown, Zap, Target, Calendar, Award } from "lucide-react";

interface Insight {
  id: string;
  type: "positive" | "warning" | "neutral";
  title: string;
  description: string;
  icon: any;
  action?: string;
}

const insights: Insight[] = [
  {
    id: "1",
    type: "positive",
    title: "Excelente Consistência!",
    description: "Você treinou 5 dias esta semana, 25% acima da sua média mensal.",
    icon: TrendingUp,
    action: "Continue assim!"
  },
  {
    id: "2",
    type: "warning",
    title: "Atenção ao Descanso",
    description: "Você não teve nenhum dia de descanso nos últimos 12 dias. Considere um dia off.",
    icon: Calendar,
    action: "Agendar descanso"
  },
  {
    id: "3",
    type: "positive",
    title: "Novo Recorde Pessoal",
    description: "Você queimou 650 calorias hoje, seu melhor resultado em 30 dias!",
    icon: Zap,
    action: "Ver detalhes"
  },
  {
    id: "4",
    type: "neutral",
    title: "Meta Semanal em Progresso",
    description: "Falta apenas 1 treino para completar sua meta de 4 treinos esta semana.",
    icon: Target,
    action: "Ver meta"
  }
];

export default function InsightsPanel() {
  const getTypeColor = (type: Insight["type"]) => {
    switch (type) {
      case "positive":
        return "from-[#00FF7F] to-[#00CC66]";
      case "warning":
        return "from-orange-500 to-red-500";
      case "neutral":
        return "from-blue-500 to-cyan-500";
    }
  };

  const getTypeBorder = (type: Insight["type"]) => {
    switch (type) {
      case "positive":
        return "border-[#00FF7F]/30";
      case "warning":
        return "border-orange-500/30";
      case "neutral":
        return "border-blue-500/30";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Insights Personalizados</h3>
          <p className="text-sm text-gray-400">Análise baseada em IA</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.id}
              className={`bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-5 border ${getTypeBorder(
                insight.type
              )} hover:scale-[1.02] transition-all`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(
                    insight.type
                  )} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    {insight.description}
                  </p>
                  {insight.action && (
                    <button
                      className={`text-sm font-semibold bg-gradient-to-r ${getTypeColor(
                        insight.type
                      )} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                    >
                      {insight.action} →
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-purple-500/10 via-[#1A1A1A] to-[#0D0D0D] border border-purple-500/30 rounded-2xl p-6 mt-6">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-purple-400" />
          <h4 className="font-bold">Recomendação da Semana</h4>
        </div>
        <p className="text-gray-300 mb-4">
          Baseado no seu histórico, recomendamos focar em treinos de força nos
          próximos 3 dias para equilibrar seu programa.
        </p>
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition-all">
          Ver Treinos Recomendados
        </button>
      </div>
    </div>
  );
}

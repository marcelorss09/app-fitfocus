"use client";

import { useState } from "react";
import { 
  Upload, Camera, TrendingUp, User, Home, Dumbbell, 
  Target, Award, Flame, Zap, ChevronRight, Users, 
  Trophy, Star, MessageCircle, Heart, Share2, Medal,
  Calendar, Clock, CheckCircle, Lock, Crown, Plus,
  UserPlus, Settings, Image as ImageIcon
} from "lucide-react";
import NotificationSystem from "@/components/NotificationSystem";
import PhotoUpload from "@/components/PhotoUpload";
import GroupChallenges from "@/components/GroupChallenges";
import InsightsPanel from "@/components/InsightsPanel";

export default function FitFocusApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [communityPosts, setCommunityPosts] = useState([
    {
      id: "1",
      user: "Ana Costa",
      time: "há 2 horas",
      content: "Acabei de completar meu 30º treino consecutivo! 🔥",
      likes: 45,
      comments: 12,
      image: null
    },
    {
      id: "2",
      user: "Carlos Silva",
      time: "há 5 horas",
      content: "Novo recorde pessoal no supino: 100kg! 💪",
      likes: 78,
      comments: 23,
      image: null
    },
    {
      id: "3",
      user: "Pedro Santos",
      time: "há 1 dia",
      content: "Quem mais está no desafio de 30 dias? Vamos juntos!",
      likes: 34,
      comments: 18,
      image: null
    }
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (imageUrl: string, caption: string) => {
    const newPost = {
      id: Date.now().toString(),
      user: "Você",
      time: "agora",
      content: caption || "Compartilhei meu progresso!",
      likes: 0,
      comments: 0,
      image: imageUrl
    };
    setCommunityPosts([newPost, ...communityPosts]);
    setShowPhotoUpload(false);
    setActiveTab("community");
  };

  const handleLike = (postId: string) => {
    setCommunityPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0D0D0D] to-[#1A1A1A] text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-[#00FF7F]/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-2xl flex items-center justify-center">
                <Dumbbell className="w-7 h-7 text-[#0D0D0D]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00FF7F] to-[#00CC66] bg-clip-text text-transparent">
                  FitFocus
                </h1>
                <p className="text-xs text-gray-400">Seu Personal com IA</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <NotificationSystem />
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-full border border-orange-500/40">
                <p className="text-sm font-bold text-orange-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  12 dias
                </p>
              </div>
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-4 py-2 rounded-full border border-yellow-500/40">
                <p className="text-sm font-bold text-yellow-400 flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Nível 8
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "home" && (
          <div className="space-y-6">
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-[#00FF7F]/20 via-[#1A1A1A] to-[#0D0D0D] border border-[#00FF7F]/30 rounded-3xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF7F]/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-[#00FF7F]" />
                  <span className="text-sm font-semibold text-[#00FF7F]">Powered by AI</span>
                </div>
                <h2 className="text-4xl font-bold mb-4">
                  Transforme Seus
                  <span className="block bg-gradient-to-r from-[#00FF7F] to-[#00CC66] bg-clip-text text-transparent">
                    Treinos com IA
                  </span>
                </h2>
                <p className="text-gray-300 mb-6 max-w-2xl text-lg">
                  Envie fotos dos seus equipamentos e receba treinos personalizados
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveTab("upload")}
                    className="bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-[#0D0D0D] px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-3"
                  >
                    <Camera className="w-6 h-6" />
                    Analisar Equipamento
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowPhotoUpload(true)}
                    className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-3"
                  >
                    <ImageIcon className="w-6 h-6" />
                    Compartilhar Progresso
                  </button>
                </div>
              </div>
            </div>

            {/* Gamification Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-[#00FF7F]/20 hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <Dumbbell className="w-8 h-8 text-[#00FF7F]" />
                  <span className="text-xs text-[#00FF7F] font-bold">+5 XP</span>
                </div>
                <p className="text-3xl font-bold mb-1">24</p>
                <p className="text-gray-400 text-sm">Treinos Completos</p>
                <div className="mt-3 bg-[#0D0D0D] rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#00FF7F] to-[#00CC66] h-2 rounded-full" style={{width: "80%"}}></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-orange-500/20 hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <Flame className="w-8 h-8 text-orange-500" />
                  <span className="text-xs text-orange-500 font-bold">RECORDE!</span>
                </div>
                <p className="text-3xl font-bold mb-1">12d</p>
                <p className="text-gray-400 text-sm">Sequência Ativa</p>
                <p className="text-xs text-orange-400 mt-2">Melhor: 15 dias</p>
              </div>
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-blue-500/20 hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <Target className="w-8 h-8 text-blue-500" />
                  <span className="text-xs text-blue-500 font-bold">75%</span>
                </div>
                <p className="text-3xl font-bold mb-1">3/4</p>
                <p className="text-gray-400 text-sm">Metas Semanais</p>
                <div className="mt-3 bg-[#0D0D0D] rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: "75%"}}></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-purple-500/20 hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <Trophy className="w-8 h-8 text-purple-500" />
                  <span className="text-xs text-purple-500 font-bold">NOVO!</span>
                </div>
                <p className="text-3xl font-bold mb-1">8</p>
                <p className="text-gray-400 text-sm">Conquistas</p>
                <p className="text-xs text-purple-400 mt-2">Próximo em 2 treinos</p>
              </div>
            </div>

            {/* AI Insights */}
            <InsightsPanel />

            {/* Daily Challenge */}
            <div className="bg-gradient-to-br from-yellow-500/10 via-[#1A1A1A] to-[#0D0D0D] border border-yellow-500/30 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Desafio Diário</h3>
                    <p className="text-sm text-gray-400">Ganhe 50 XP extras!</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-500">2/3</p>
                  <p className="text-xs text-gray-400">Completo</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#0D0D0D]/50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#00FF7F]" />
                  <span className="flex-1">Complete 1 treino</span>
                  <span className="text-[#00FF7F] font-bold text-sm">+20 XP</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#0D0D0D]/50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-[#00FF7F]" />
                  <span className="flex-1">Queime 500 calorias</span>
                  <span className="text-[#00FF7F] font-bold text-sm">+15 XP</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#0D0D0D]/50 rounded-xl opacity-50">
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-full"></div>
                  <span className="flex-1">Compartilhe seu progresso</span>
                  <span className="text-gray-500 font-bold text-sm">+15 XP</span>
                </div>
              </div>
            </div>

            {/* Workout Suggestions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Treinos Recomendados</h3>
                <button className="text-[#00FF7F] text-sm font-semibold flex items-center gap-1">
                  Ver todos
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-white/10 hover:scale-105 transition-all cursor-pointer"
                     onClick={() => setShowWorkoutModal(true)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">45 min</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Treino HIIT Intenso</h4>
                  <p className="text-gray-400 text-sm mb-4">Queime calorias com exercícios de alta intensidade</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold">650 kcal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-semibold">Cardio</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-white/10 hover:scale-105 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Dumbbell className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">60 min</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Força Total</h4>
                  <p className="text-gray-400 text-sm mb-4">Desenvolva músculos com treino completo</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold">420 kcal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-semibold">Força</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "upload" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] bg-clip-text text-transparent">
                Análise Inteligente
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Envie uma foto dos seus equipamentos e receba um treino personalizado
              </p>
            </div>

            {!uploadedImage ? (
              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-3xl p-20 border-2 border-dashed border-[#00FF7F]/30 hover:border-[#00FF7F]/60 transition-all">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Upload className="w-12 h-12 text-[#0D0D0D]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Enviar Foto</h3>
                    <p className="text-gray-400">Clique ou arraste uma imagem dos seus equipamentos</p>
                  </div>
                </div>
              </label>
            ) : (
              <div className="space-y-6">
                <div className="rounded-3xl overflow-hidden border border-[#00FF7F]/30">
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-auto" />
                </div>
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-[#00FF7F]/20">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-[#00FF7F]" />
                    Equipamentos Identificados
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-xl">
                      <span className="font-semibold">Halteres</span>
                      <span className="text-[#00FF7F] font-bold">95%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-xl">
                      <span className="font-semibold">Banco Ajustável</span>
                      <span className="text-[#00FF7F] font-bold">88%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-xl">
                      <span className="font-semibold">Barra Fixa</span>
                      <span className="text-[#00FF7F] font-bold">82%</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowWorkoutModal(true)}
                    className="w-full mt-6 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-[#0D0D0D] py-4 rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Gerar Treino Personalizado
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "community" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] bg-clip-text text-transparent">
                Comunidade FitFocus
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Conecte-se, compartilhe e inspire-se com outros atletas
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setShowPhotoUpload(true)}
                className="flex-1 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-[#0D0D0D] py-4 rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Compartilhar Progresso
              </button>
              <button
                onClick={() => setShowFriendsModal(true)}
                className="bg-white/5 border border-white/10 text-white px-6 py-4 rounded-xl font-bold hover:scale-105 transition-all flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Adicionar Amigos
              </button>
            </div>

            {/* Group Challenges */}
            <GroupChallenges />

            {/* Leaderboard */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-3xl p-6 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Trophy className="w-7 h-7 text-yellow-500" />
                  Ranking Semanal
                </h3>
                <span className="text-sm text-gray-400">Atualizado há 2h</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Carlos Silva", xp: 2850, position: 1, avatar: "🏆" },
                  { name: "Ana Costa", xp: 2720, position: 2, avatar: "🥈" },
                  { name: "Você", xp: 2580, position: 3, avatar: "🥉", isYou: true },
                  { name: "Pedro Santos", xp: 2450, position: 4, avatar: "👤" },
                  { name: "Maria Oliveira", xp: 2380, position: 5, avatar: "👤" },
                ].map((user, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      user.isYou 
                        ? "bg-gradient-to-r from-[#00FF7F]/20 to-[#00CC66]/20 border border-[#00FF7F]/40" 
                        : "bg-[#0D0D0D]/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-gray-500 w-8">{user.position}</span>
                      <span className="text-3xl">{user.avatar}</span>
                      <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.xp} XP</p>
                      </div>
                    </div>
                    {user.isYou && (
                      <span className="bg-[#00FF7F] text-[#0D0D0D] px-3 py-1 rounded-full text-xs font-bold">
                        VOCÊ
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Community Feed */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Feed da Comunidade</h3>
              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <div key={post.id} className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-[#0D0D0D]" />
                      </div>
                      <div>
                        <p className="font-bold">{post.user}</p>
                        <p className="text-sm text-gray-400">{post.time}</p>
                      </div>
                    </div>
                    {post.image && (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <img src={post.image} alt="Post" className="w-full h-auto" />
                      </div>
                    )}
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-semibold">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-[#00FF7F] transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-semibold">{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "progress" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] bg-clip-text text-transparent">
                Seu Progresso
              </h2>
              <p className="text-gray-400">Acompanhe sua evolução e conquistas</p>
            </div>

            {/* Level Progress */}
            <div className="bg-gradient-to-br from-purple-500/10 via-[#1A1A1A] to-[#0D0D0D] border border-purple-500/30 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Nível 8</h3>
                    <p className="text-sm text-gray-400">Atleta Dedicado</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-400">2,580 XP</p>
                  <p className="text-sm text-gray-400">420 XP para Nível 9</p>
                </div>
              </div>
              <div className="bg-[#0D0D0D] rounded-full h-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full" style={{width: "86%"}}></div>
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-3xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-6">Atividade dos Últimos 7 Dias</h3>
              <div className="flex items-end justify-between gap-2 h-48">
                {[
                  { day: "Seg", value: 65 },
                  { day: "Ter", value: 80 },
                  { day: "Qua", value: 45 },
                  { day: "Qui", value: 90 },
                  { day: "Sex", value: 70 },
                  { day: "Sáb", value: 85 },
                  { day: "Dom", value: 95 }
                ].map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#00FF7F] to-[#00CC66] hover:scale-105 transition-all cursor-pointer"
                      style={{ height: `${item.value}%` }}
                    ></div>
                    <span className="text-xs text-gray-400">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Conquistas Recentes</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Flame, name: "Sequência de Fogo", desc: "12 dias seguidos", color: "orange" },
                  { icon: Trophy, name: "Campeão Semanal", desc: "Top 3 no ranking", color: "yellow" },
                  { icon: Target, name: "Meta Atingida", desc: "100% das metas", color: "blue" },
                  { icon: Medal, name: "Primeiro Treino", desc: "Jornada iniciada", color: "purple" },
                ].map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-4 border border-white/10 text-center hover:scale-105 transition-all">
                    <div className={`w-16 h-16 bg-gradient-to-br from-${achievement.color}-500 to-${achievement.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-1">{achievement.name}</h4>
                    <p className="text-xs text-gray-400">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked Achievements */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-gray-500" />
                Próximas Conquistas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Maratonista", desc: "50 treinos completos", progress: "24/50" },
                  { name: "Lenda", desc: "Alcance nível 10", progress: "8/10" },
                  { name: "Social", desc: "10 amigos adicionados", progress: "3/10" },
                  { name: "Consistência", desc: "30 dias seguidos", progress: "12/30" },
                ].map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-4 border border-gray-700 text-center opacity-60">
                    <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Lock className="w-8 h-8 text-gray-600" />
                    </div>
                    <h4 className="font-bold mb-1">{achievement.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{achievement.desc}</p>
                    <p className="text-xs text-gray-400 font-semibold">{achievement.progress}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-16 h-16 text-[#0D0D0D]" />
              </div>
              <h2 className="text-3xl font-bold mb-2">João Silva</h2>
              <p className="text-gray-400 mb-4">Membro desde Janeiro 2024</p>
              <div className="flex items-center justify-center gap-4">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full border border-purple-500/40">
                  <p className="text-sm font-bold text-purple-400 flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Nível 8
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-full border border-orange-500/40">
                  <p className="text-sm font-bold text-orange-400 flex items-center gap-2">
                    <Flame className="w-4 h-4" />
                    12 dias
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-[#00FF7F]/20 text-center">
                <Dumbbell className="w-12 h-12 text-[#00FF7F] mx-auto mb-3" />
                <p className="text-3xl font-bold text-[#00FF7F] mb-2">24</p>
                <p className="text-gray-400">Total de Treinos</p>
              </div>
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-blue-500/20 text-center">
                <Target className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-blue-500 mb-2">18h</p>
                <p className="text-gray-400">Horas Treinadas</p>
              </div>
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-2xl p-6 border border-orange-500/20 text-center">
                <Flame className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-orange-500 mb-2">8.5k</p>
                <p className="text-gray-400">Calorias Queimadas</p>
              </div>
            </div>

            {/* Personal Records */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-3xl p-6 border border-white/10">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-7 h-7 text-yellow-500" />
                Recordes Pessoais
              </h3>
              <div className="space-y-3">
                {[
                  { exercise: "Supino", weight: "85kg", date: "15 Mar 2024" },
                  { exercise: "Agachamento", weight: "120kg", date: "12 Mar 2024" },
                  { exercise: "Levantamento Terra", weight: "140kg", date: "10 Mar 2024" },
                ].map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#0D0D0D]/50 rounded-xl">
                    <div>
                      <p className="font-bold">{record.exercise}</p>
                      <p className="text-sm text-gray-400">{record.date}</p>
                    </div>
                    <p className="text-2xl font-bold text-[#00FF7F]">{record.weight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings Button */}
            <button className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2">
              <Settings className="w-5 h-5" />
              Configurações da Conta
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {showPhotoUpload && (
        <PhotoUpload
          onUpload={handlePhotoUpload}
          onClose={() => setShowPhotoUpload(false)}
        />
      )}

      {/* Workout Modal */}
      {showWorkoutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={() => setShowWorkoutModal(false)}>
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-3xl p-8 border border-[#00FF7F]/30 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold">Treino HIIT Intenso</h3>
              <button 
                onClick={() => setShowWorkoutModal(false)}
                className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold">45 minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">650 kcal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">Cardio</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold">Exercícios:</h4>
              {[
                { name: "Burpees", sets: "4x15", rest: "30s" },
                { name: "Mountain Climbers", sets: "4x20", rest: "30s" },
                { name: "Jump Squats", sets: "4x15", rest: "30s" },
                { name: "High Knees", sets: "4x30s", rest: "30s" },
                { name: "Plank Jacks", sets: "4x20", rest: "30s" },
              ].map((exercise, index) => (
                <div key={index} className="bg-[#0D0D0D]/50 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold">{exercise.name}</p>
                    <p className="text-sm text-gray-400">Descanso: {exercise.rest}</p>
                  </div>
                  <p className="text-[#00FF7F] font-bold">{exercise.sets}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-[#0D0D0D] py-4 rounded-xl font-bold hover:scale-105 transition-all">
              Iniciar Treino
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D]/95 backdrop-blur-xl border-t border-[#00FF7F]/20 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                activeTab === "home" ? "text-[#00FF7F] bg-[#00FF7F]/10" : "text-gray-400"
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-semibold">Início</span>
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                activeTab === "upload" ? "text-[#00FF7F] bg-[#00FF7F]/10" : "text-gray-400"
              }`}
            >
              <Camera className="w-6 h-6" />
              <span className="text-xs font-semibold">Análise</span>
            </button>
            <button
              onClick={() => setActiveTab("community")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                activeTab === "community" ? "text-[#00FF7F] bg-[#00FF7F]/10" : "text-gray-400"
              }`}
            >
              <Users className="w-6 h-6" />
              <span className="text-xs font-semibold">Comunidade</span>
            </button>
            <button
              onClick={() => setActiveTab("progress")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                activeTab === "progress" ? "text-[#00FF7F] bg-[#00FF7F]/10" : "text-gray-400"
              }`}
            >
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs font-semibold">Progresso</span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                activeTab === "profile" ? "text-[#00FF7F] bg-[#00FF7F]/10" : "text-gray-400"
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-semibold">Perfil</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

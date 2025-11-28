"use client";

import { useState, useEffect } from "react";
import { Bell, X, Trophy, Flame, Users, Target } from "lucide-react";

interface Notification {
  id: string;
  type: "achievement" | "streak" | "social" | "challenge";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "Nova Conquista!",
      message: "Você desbloqueou 'Sequência de Fogo' - 12 dias consecutivos!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false
    },
    {
      id: "2",
      type: "social",
      title: "Novo Seguidor",
      message: "Ana Costa começou a seguir você!",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false
    },
    {
      id: "3",
      type: "challenge",
      title: "Desafio Quase Completo",
      message: "Falta apenas 1 treino para completar o desafio diário!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: true
    }
  ]);

  const [showPanel, setShowPanel] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "achievement":
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case "streak":
        return <Flame className="w-5 h-5 text-orange-500" />;
      case "social":
        return <Users className="w-5 h-5 text-blue-500" />;
      case "challenge":
        return <Target className="w-5 h-5 text-purple-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d atrás`;
    if (hours > 0) return `${hours}h atrás`;
    if (minutes > 0) return `${minutes}min atrás`;
    return "Agora";
  };

  return (
    <>
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 hover:bg-white/5 rounded-xl transition-all"
      >
        <Bell className="w-6 h-6 text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {showPanel && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowPanel(false)}
          />
          <div className="absolute right-0 top-16 w-96 max-h-[600px] bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0D0D0D]/95 backdrop-blur-xl">
              <h3 className="text-lg font-bold">Notificações</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-[#00FF7F] hover:text-[#00CC66] font-semibold"
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>

            <div className="overflow-y-auto max-h-[500px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhuma notificação</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-4 hover:bg-white/5 cursor-pointer transition-all ${
                        !notification.read ? "bg-[#00FF7F]/5" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-bold text-sm">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-[#00FF7F] rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

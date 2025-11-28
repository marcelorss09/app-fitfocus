"use client";

import { useState } from "react";
import { Upload, Camera, X, Check } from "lucide-react";

interface PhotoUploadProps {
  onUpload: (imageUrl: string, caption: string) => void;
  onClose: () => void;
}

export default function PhotoUpload({ onUpload, onClose }: PhotoUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setUploading(true);
    // Simular upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onUpload(selectedImage, caption);
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] rounded-3xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0D0D0D]/95 backdrop-blur-xl">
          <h3 className="text-2xl font-bold">Compartilhar Progresso</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!selectedImage ? (
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <div className="bg-[#0D0D0D]/50 rounded-2xl p-16 border-2 border-dashed border-[#00FF7F]/30 hover:border-[#00FF7F]/60 transition-all text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00FF7F] to-[#00CC66] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-10 h-10 text-[#0D0D0D]" />
                </div>
                <h4 className="text-xl font-bold mb-2">Adicionar Foto</h4>
                <p className="text-gray-400">
                  Clique para selecionar uma foto do seu progresso
                </p>
              </div>
            </label>
          ) : (
            <>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-auto"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Legenda (opcional)
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Conte sobre seu progresso..."
                  className="w-full bg-[#0D0D0D]/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF7F]/50 transition-all resize-none"
                  rows={3}
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {caption.length}/200 caracteres
                </p>
              </div>

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full bg-gradient-to-r from-[#00FF7F] to-[#00CC66] text-[#0D0D0D] py-4 rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-[#0D0D0D]/30 border-t-[#0D0D0D] rounded-full animate-spin" />
                    Compartilhando...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Compartilhar na Comunidade
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

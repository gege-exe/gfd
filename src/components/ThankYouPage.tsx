import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Star, Gift } from "lucide-react";
import celebrationImg from "@/assets/celebration.jpg";

interface ThankYouPageProps {
  onBackToMain: () => void;
  onShowGames: () => void;
}

const ThankYouPage = ({ onBackToMain, onShowGames }: ThankYouPageProps) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Create confetti effect
    const newConfetti = [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="min-h-screen gradient-soft flex flex-col relative overflow-hidden">
      {/* Top gradient header */}
      <div className="gradient-romantic py-4 px-6 text-center">
        <h1 className="text-3xl font-bold text-white">Happy Girlfriend's Day! 💕</h1>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        {/* Animated confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="absolute animate-bounce"
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            >
              {Math.random() > 0.5 ? (
                <Heart className="text-love-red w-4 h-4" />
              ) : (
                <Star className="text-love-purple w-4 h-4" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          {/* Main celebration */}
          <div className="mb-12">
            <h1 className="text-7xl font-bold mb-6 gradient-romantic bg-clip-text text-transparent animate-pulse">
              OMG THANK YOU! 
            </h1>
            <div className="text-6xl mb-8 animate-bounce">
              🎉💕🎊💖🌟
            </div>
          </div>

          {/* Celebration image */}
          <div className="mb-12">
            <img 
              src={celebrationImg} 
              alt="Celebration" 
              className="w-full max-w-2xl mx-auto rounded-3xl shadow-heart pulse-love"
            />
          </div>

          {/* Thank you message */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-heart mb-12">
            <h2 className="text-4xl font-bold text-love-pink mb-6">
              Shreya, you made my day! 💝
            </h2>
            <div className="text-xl text-foreground space-y-4">
              <p>🌈 You're absolutely amazing!</p>
              <p>✨ Thank you for being so wonderful!</p>
              <p>💫 You light up my world every single day!</p>
              <p>🦋 Happy Girlfriend's Day, beautiful!</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button
              variant="love"
              size="xl"
              onClick={onShowGames}
              className="grow-love"
            >
              <Gift className="w-6 h-6 mr-2" />
              Play Fun Games! 🎮
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={onBackToMain}
              className="grow-love"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Back to Question
            </Button>
          </div>

          {/* Fun emojis */}
          <div className="text-4xl space-x-4 animate-pulse">
            💖 🌸 🦄 🌈 ✨ 🎀 💐 🍭
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
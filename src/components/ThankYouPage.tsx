import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Gift } from "lucide-react";
import celebrationImg from "@/assets/celebration.jpg";

interface ThankYouPageProps {
  onBackToMain: () => void;
  onShowGames: () => void;
}

const ThankYouPage = ({ onBackToMain, onShowGames }: ThankYouPageProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="love-gradient py-6 px-6 text-center">
        <h1 className="text-2xl font-semibold text-white">Happy Girlfriend's Day! 💕</h1>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6">
        {/* Subtle confetti */}
        {showConfetti && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random()}s`
                }}
              >
                <Heart className="text-love-primary w-3 h-3" />
              </div>
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Main celebration */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-love-primary mb-4">
              Thank You! 
            </h1>
            <div className="text-4xl mb-6">
              🎉 💕 ✨
            </div>
          </div>

          {/* Celebration image */}
          <div className="mb-8">
            <img 
              src={celebrationImg} 
              alt="Celebration" 
              className="w-full max-w-md mx-auto rounded-xl"
            />
          </div>

          {/* Thank you message */}
          <div className="minimal-card p-8 mb-8">
            <h2 className="text-2xl font-semibold text-love-primary mb-4">
              Shreya, you made my day!
            </h2>
            <div className="text-foreground space-y-2 text-sm">
              <p>You're absolutely wonderful</p>
              <p>Thank you for being amazing</p>
              <p>You light up my world every day</p>
              <p>Happy Girlfriend's Day! 🌟</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="love"
              size="lg"
              onClick={onShowGames}
            >
              <Gift className="w-4 h-4 mr-2" />
              Play Games 🎮
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={onBackToMain}
            >
              Back to Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface QuestionPageProps {
  onYes: () => void;
}

const QuestionPage = ({ onYes }: QuestionPageProps) => {
  const [noClickCount, setNoClickCount] = useState(0);

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);
  };

  const getNoButtonText = () => {
    const texts = ["No", "Are you sure?", "Really?", "Think again!", "Pretty please?", "Just click Yes!", "Come on!"];
    return texts[Math.min(noClickCount, texts.length - 1)];
  };

  const getYesButtonSize = () => {
    const baseSize = 1;
    const growth = 0.2;
    return baseSize + (noClickCount * growth);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="love-gradient py-6 px-6 text-center">
        <h1 className="text-2xl font-semibold text-white">Happy Girlfriend's Day! 💕</h1>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6">
        {/* Subtle floating hearts */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {[...Array(8)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-love-primary w-4 h-4 heart-float"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-lg mx-auto text-center">
          {/* Name */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-love-primary mb-2">Shreya Arya</h2>
            <p className="text-muted-foreground">You make every day special ✨</p>
          </div>

          {/* Question Card */}
          <div className="minimal-card p-8 mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Will you be my Girlfriend?
            </h3>
            <p className="text-muted-foreground mb-8">
              You bring so much joy to my life 💫
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <Button
                variant="love"
                size="lg"
                onClick={onYes}
                className="transition-transform duration-300"
                style={{
                  transform: `scale(${getYesButtonSize()})`,
                }}
              >
                <Heart className="w-4 h-4 mr-2" />
                YES! 💖
              </Button>

              <Button
                variant="loveOutline"
                size="default"
                onClick={handleNoClick}
              >
                {getNoButtonText()}
              </Button>
            </div>

            {noClickCount > 2 && (
              <p className="mt-6 text-love-primary text-sm">
                The Yes button keeps growing, maybe it's a hint! 😉
              </p>
            )}
          </div>

          {/* Hint */}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
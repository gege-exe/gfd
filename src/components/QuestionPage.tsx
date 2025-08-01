import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

interface QuestionPageProps {
  onYes: () => void;
}

const QuestionPage = ({ onYes }: QuestionPageProps) => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [isNoShaking, setIsNoShaking] = useState(false);

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);
    setIsNoShaking(true);
    setTimeout(() => setIsNoShaking(false), 500);
  };

  const getNoButtonText = () => {
    const texts = ["No", "Are you sure?", "Really?", "Think again!", "Pretty please?", "Just click Yes!", "Come on!"];
    return texts[Math.min(noClickCount, texts.length - 1)];
  };

  const getYesButtonSize = () => {
    const baseSize = 1;
    const growth = 0.3;
    return baseSize + (noClickCount * growth);
  };

  return (
    <div className="min-h-screen gradient-soft flex flex-col relative overflow-hidden">
      {/* Top gradient header */}
      <div className="gradient-romantic py-4 px-6 text-center">
        <h1 className="text-3xl font-bold text-white">Happy Girlfriend's Day! 💕</h1>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className={`absolute text-love-pink/20 heart-float w-6 h-6`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="text-love-purple w-8 h-8" />
              <h2 className="text-4xl font-bold text-love-pink">Shreya Arya</h2>
              <Sparkles className="text-love-purple w-8 h-8" />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-heart mb-12">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Will you be my Girlfriend? 💕
              </h3>
              <p className="text-lg text-muted-foreground">
                You make every day feel like a celebration! 🌟
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              <Button
                variant="love"
                size="xl"
                onClick={onYes}
                className="grow-love pulse-love"
                style={{
                  transform: `scale(${getYesButtonSize()})`,
                  fontSize: `${1 + noClickCount * 0.1}rem`
                }}
              >
                <Heart className="w-6 h-6 mr-2" />
                YES! 💖
              </Button>

              <Button
                variant="loveNo"
                size="lg"
                onClick={handleNoClick}
                className={`${isNoShaking ? 'wiggle' : ''}`}
              >
                {getNoButtonText()}
              </Button>
            </div>

            {noClickCount > 2 && (
              <p className="mt-6 text-love-pink font-semibold animate-pulse">
                The Yes button is getting bigger! Maybe it's a sign? 😉
              </p>
            )}
          </div>

          {/* Fun fact */}
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              ✨ Every click on "No" makes "Yes" grow bigger! ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
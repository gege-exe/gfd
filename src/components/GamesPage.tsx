import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, Gift, Gamepad2 } from "lucide-react";

interface GamesPageProps {
  onBack: () => void;
}

const GamesPage = ({ onBack }: GamesPageProps) => {
  const [memorySequence, setMemorySequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'ready' | 'showing' | 'waiting' | 'correct' | 'wrong'>('ready');
  const [score, setScore] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState<string>('');

  const [loveQuizIndex, setLoveQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);

  const emojis = ["💖", "🌟", "🦄", "🌈"];

  const loveQuestions = [
    {
      question: "What makes Shreya special?",
      options: ["Her smile", "Her kindness", "Her beautiful heart", "All of the above"],
      correct: 3
    },
    {
      question: "What's the best thing about today?",
      options: ["It's Girlfriend's Day", "Spending time together", "Celebrating love", "All of the above"],
      correct: 3
    },
    {
      question: "How amazing is Shreya?",
      options: ["Very amazing", "Super amazing", "Incredibly amazing", "Beyond amazing!"],
      correct: 3
    }
  ];

  const startNewGame = () => {
    const newEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setMemorySequence([newEmoji]);
    setPlayerSequence([]);
    setScore(0);
    setGameState('showing');
    showSequence([newEmoji]);
  };

  const showSequence = async (sequence: string[]) => {
    setGameState('showing');
    
    for (let i = 0; i < sequence.length; i++) {
      setCurrentEmoji(sequence[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
      setCurrentEmoji('');
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setGameState('waiting');
  };

  const handleEmojiClick = async (emoji: string) => {
    if (gameState !== 'waiting') return;

    const newPlayerSequence = [...playerSequence, emoji];
    setPlayerSequence(newPlayerSequence);

    if (emoji !== memorySequence[newPlayerSequence.length - 1]) {
      setGameState('wrong');
      setTimeout(() => setGameState('ready'), 2000);
      return;
    }

    if (newPlayerSequence.length === memorySequence.length) {
      setGameState('correct');
      const newScore = score + 1;
      setScore(newScore);
      
      setTimeout(() => {
        const nextEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const newSequence = [...memorySequence, nextEmoji];
        setMemorySequence(newSequence);
        setPlayerSequence([]);
        showSequence(newSequence);
      }, 1500);
    }
  };

  const handleQuizAnswer = (answer: number) => {
    if (answer === loveQuestions[loveQuizIndex].correct) {
      setQuizScore(quizScore + 1);
    }
    
    if (loveQuizIndex < loveQuestions.length - 1) {
      setLoveQuizIndex(loveQuizIndex + 1);
    } else {
      setLoveQuizIndex(0);
    }
  };

  const getGameMessage = () => {
    switch (gameState) {
      case 'ready': return "Click Start to begin";
      case 'showing': return "Watch the sequence";
      case 'waiting': return "Repeat the sequence";
      case 'correct': return `Perfect! Score: ${score + 1}`;
      case 'wrong': return `Game Over! Final score: ${score}`;
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="love-gradient py-6 px-6 text-center">
        <h1 className="text-2xl font-semibold text-white">Happy Girlfriend's Day! 💕</h1>
      </div>
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="secondary" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h2 className="text-2xl font-semibold text-love-primary">
              Games for Shreya
            </h2>
            <div className="w-16"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Memory Game */}
            <Card className="minimal-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-love-primary text-lg">
                  <Gamepad2 className="w-5 h-5" />
                  Memory Game
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Remember and repeat the emoji sequence
                </p>
                
                <div className="text-center space-y-2">
                  <p className="font-medium">{getGameMessage()}</p>
                  <p className="text-sm text-muted-foreground">Score: {score}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {emojis.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      size="lg"
                      onClick={() => handleEmojiClick(emoji)}
                      className={`text-2xl h-16 transition-all duration-200 ${
                        currentEmoji === emoji ? 'bg-love-primary text-white' : ''
                      }`}
                      disabled={gameState !== 'waiting'}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>

                <Button 
                  variant="love" 
                  onClick={startNewGame}
                  className="w-full"
                  disabled={gameState === 'showing'}
                >
                  {gameState === 'ready' ? 'Start Game' : 'Restart'}
                </Button>
              </CardContent>
            </Card>

            {/* Love Quiz */}
            <Card className="minimal-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-love-primary text-lg">
                  <Heart className="w-5 h-5" />
                  Love Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Answer these sweet questions
                </p>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Score: {quizScore}/{loveQuestions.length}</p>
                </div>

                <div className="bg-love-light/30 rounded-lg p-4">
                  <h3 className="font-medium mb-4">
                    {loveQuestions[loveQuizIndex].question}
                  </h3>
                  
                  <div className="space-y-2">
                    {loveQuestions[loveQuizIndex].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleQuizAnswer(index)}
                        className="w-full text-left justify-start text-sm"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="love" 
                  onClick={() => {setLoveQuizIndex(0); setQuizScore(0);}}
                  className="w-full"
                >
                  Restart Quiz
                </Button>
              </CardContent>
            </Card>

            {/* Message */}
            <Card className="minimal-card lg:col-span-2">
              <CardContent className="text-center p-6">
                <h3 className="text-lg font-semibold text-love-primary mb-2">
                  For Shreya ✨
                </h3>
                <p className="text-muted-foreground">
                  Every moment with you makes life more beautiful
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
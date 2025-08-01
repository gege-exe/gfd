import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, Sparkles, Gift, Gamepad2 } from "lucide-react";

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

    // Check if the clicked emoji is correct
    if (emoji !== memorySequence[newPlayerSequence.length - 1]) {
      setGameState('wrong');
      setTimeout(() => setGameState('ready'), 2000);
      return;
    }

    // Check if player completed the sequence
    if (newPlayerSequence.length === memorySequence.length) {
      setGameState('correct');
      const newScore = score + 1;
      setScore(newScore);
      
      setTimeout(() => {
        // Add new emoji to sequence
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
      case 'ready': return "Click Start to begin!";
      case 'showing': return "Watch the sequence!";
      case 'waiting': return "Repeat the sequence!";
      case 'correct': return `Perfect! Score: ${score + 1} 🎉`;
      case 'wrong': return `Game Over! Final score: ${score} 💕`;
      default: return "";
    }
  };

  return (
    <div className="min-h-screen gradient-soft flex flex-col">
      {/* Top gradient header */}
      <div className="gradient-romantic py-4 px-6 text-center">
        <h1 className="text-3xl font-bold text-white">Happy Girlfriend's Day! 💕</h1>
      </div>
      
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="secondary" onClick={onBack} className="grow-love">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h2 className="text-4xl font-bold gradient-romantic bg-clip-text text-transparent">
              Fun Games for Shreya! 🎮
            </h2>
            <div className="w-20"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Memory Game */}
            <Card className="shadow-heart">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-love-pink">
                  <Sparkles className="w-6 h-6" />
                  Memory Game
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Remember the sequence of emojis and repeat it!
                </p>
                
                <div className="text-center">
                  <p className="font-semibold mb-4">{getGameMessage()}</p>
                  <p className="text-lg">Score: {score}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {emojis.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      size="xl"
                      onClick={() => handleEmojiClick(emoji)}
                      className={`text-4xl h-20 grow-love transition-all duration-200 ${
                        currentEmoji === emoji ? 'bg-love-pink text-white scale-110' : ''
                      } ${gameState === 'waiting' ? 'hover:scale-105' : ''}`}
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
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  {gameState === 'ready' ? 'Start New Game' : 'Restart Game'}
                </Button>
              </CardContent>
            </Card>

            {/* Love Quiz */}
            <Card className="shadow-heart">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-love-purple">
                  <Heart className="w-6 h-6" />
                  Love Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Answer these sweet questions!
                </p>
                
                <div className="text-center">
                  <p className="text-lg font-semibold">Quiz Score: {quizScore}/{loveQuestions.length}</p>
                </div>

                <div className="bg-love-light/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-4 text-lg">
                    {loveQuestions[loveQuizIndex].question}
                  </h3>
                  
                  <div className="space-y-2">
                    {loveQuestions[loveQuizIndex].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleQuizAnswer(index)}
                        className="w-full text-left justify-start grow-love"
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
                  <Gift className="w-4 h-4 mr-2" />
                  Restart Quiz
                </Button>
              </CardContent>
            </Card>

            {/* Special Message */}
            <Card className="shadow-heart lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-love-red">
                  <Heart className="w-6 h-6" />
                  Special Message
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-2xl font-bold text-love-pink">
                  🌟 Shreya, you're absolutely wonderful! 🌟
                </div>
                <p className="text-lg">
                  Every game we play, every moment we share, makes life more beautiful! 💖
                </p>
                <div className="text-3xl space-x-2">
                  💝 🦋 🌸 💐 🎀 ✨ 🌈 💕
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
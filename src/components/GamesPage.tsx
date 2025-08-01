import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, Sparkles, Gift, Gamepad2 } from "lucide-react";

interface GamesPageProps {
  onBack: () => void;
}

const GamesPage = ({ onBack }: GamesPageProps) => {
  const [memoryGame, setMemoryGame] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [gameMessage, setGameMessage] = useState("Click Start to begin!");
  const [score, setScore] = useState(0);

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

  const startMemoryGame = () => {
    setMemoryGame([]);
    setUserSequence([]);
    setGameActive(true);
    setScore(0);
    addToSequence();
  };

  const addToSequence = () => {
    const newEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const newSequence = [...memoryGame, newEmoji];
    setMemoryGame(newSequence);
    setGameMessage("Watch the sequence!");
    
    // Show sequence
    setTimeout(() => {
      setUserSequence([]);
      setGameMessage("Now repeat the sequence!");
    }, newSequence.length * 1000 + 500);
  };

  const handleEmojiClick = (emoji: string) => {
    if (!gameActive) return;
    
    const newUserSequence = [...userSequence, emoji];
    setUserSequence(newUserSequence);

    if (newUserSequence[newUserSequence.length - 1] !== memoryGame[newUserSequence.length - 1]) {
      setGameMessage(`Oops! Final score: ${score}. Try again! 💕`);
      setGameActive(false);
      return;
    }

    if (newUserSequence.length === memoryGame.length) {
      const newScore = score + 1;
      setScore(newScore);
      setGameMessage(`Correct! Score: ${newScore} 🎉`);
      
      setTimeout(() => {
        addToSequence();
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
      // Quiz completed
      setLoveQuizIndex(0);
    }
  };

  return (
    <div className="min-h-screen gradient-soft p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="secondary" onClick={onBack} className="grow-love">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold gradient-romantic bg-clip-text text-transparent">
            Fun Games for Shreya! 🎮
          </h1>
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
                <p className="font-semibold mb-4">{gameMessage}</p>
                <p className="text-lg">Score: {score}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {emojis.map((emoji, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    size="xl"
                    onClick={() => handleEmojiClick(emoji)}
                    className={`text-4xl h-20 grow-love ${
                      gameActive && memoryGame.length > 0 && 
                      memoryGame[userSequence.length] === emoji ? 'animate-pulse' : ''
                    }`}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>

              <Button 
                variant="love" 
                onClick={startMemoryGame}
                className="w-full"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                Start New Game
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

          {/* Color Matching Game */}
          <Card className="shadow-heart lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-love-red text-center">
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
  );
};

export default GamesPage;
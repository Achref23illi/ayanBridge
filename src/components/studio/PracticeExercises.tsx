import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, RotateCcw, Target, BookOpen, Lightbulb, Trophy, Star, Brain } from 'lucide-react';
import type { ExerciseQuestion } from '../../types/studio';

interface PracticeExercisesProps {
  exercises: ExerciseQuestion[];
  onComplete: () => void;
  onBack: () => void;
}

interface ExerciseResult {
  questionId: string;
  isCorrect: boolean;
  userAnswer: string | string[];
  timeSpent: number;
}

const PracticeExercises: React.FC<PracticeExercisesProps> = ({
  exercises,
  onComplete,
  onBack
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [userAnswer, setUserAnswer] = useState<string | string[]>('');
  const [showResult, setShowResult] = useState(false);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [draggedItems, setDraggedItems] = useState<string[]>([]);
  
  const currentQuestion = exercises[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === exercises.length - 1;

  const checkAnswer = (question: ExerciseQuestion, answer: string | string[]): boolean => {
    if (Array.isArray(question.correctAnswer)) {
      if (Array.isArray(answer)) {
        return question.correctAnswer.every(correct => 
          answer.some(userAns => userAns.toLowerCase().includes(correct.toLowerCase()))
        );
      }
      return question.correctAnswer.some(correct => 
        (answer as string).toLowerCase().includes(correct.toLowerCase())
      );
    }
    
    if (Array.isArray(answer)) {
      return answer.some(ans => 
        ans.toLowerCase().includes((question.correctAnswer as string).toLowerCase())
      );
    }
    
    return (answer as string).toLowerCase().includes((question.correctAnswer as string).toLowerCase());
  };

  const handleSubmit = () => {
    const timeSpent = Date.now() - startTime;
    const isCorrect = checkAnswer(currentQuestion, userAnswer);
    
    const result: ExerciseResult = {
      questionId: currentQuestion.id,
      isCorrect,
      userAnswer,
      timeSpent
    };
    
    setResults(prev => [...prev, result]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowFinalResults(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setShowResult(false);
      setStartTime(Date.now());
      setDraggedItems([]);
    }
  };

  const resetExercise = () => {
    setCurrentQuestionIndex(0);
    setResults([]);
    setUserAnswer('');
    setShowResult(false);
    setShowFinalResults(false);
    setStartTime(Date.now());
    setDraggedItems([]);
  };

  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case 'mcq':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => setUserAnswer(option)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  userAnswer === option
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    userAnswer === option
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {userAnswer === option && (
                      <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className="text-foreground">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        );

      case 'fill-blank':
        const questionParts = currentQuestion.question.split('_______');
        return (
          <div className="space-y-4">
            <div className="text-lg leading-relaxed">
              {questionParts.map((part, index) => (
                <span key={index}>
                  {part}
                  {index < questionParts.length - 1 && (
                    <input
                      type="text"
                      value={Array.isArray(userAnswer) ? userAnswer[index] || '' : userAnswer}
                      onChange={(e) => {
                        if (Array.isArray(userAnswer)) {
                          const newAnswers = [...userAnswer];
                          newAnswers[index] = e.target.value;
                          setUserAnswer(newAnswers);
                        } else {
                          setUserAnswer(e.target.value);
                        }
                      }}
                      className="mx-2 px-3 py-2 border-2 border-primary/50 rounded-lg bg-card text-foreground focus:border-primary focus:outline-none min-w-[120px]"
                      placeholder="Votre réponse"
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        );

      case 'short-answer':
        return (
          <div className="space-y-4">
            <textarea
              value={userAnswer as string}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Écrivez votre réponse ici..."
              className="w-full h-32 p-4 border-2 border-border rounded-lg bg-card text-foreground focus:border-primary focus:outline-none resize-none"
            />
          </div>
        );

      case 'drag-drop':
        const items = ['Machine Learning', 'Deep Learning', 'Algorithme', 'Dataset', 'Neural Network'];
        const targets = ['Apprentissage', 'Données', 'Méthode'];
        
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {targets.map((target, index) => (
                <div
                  key={target}
                  className="min-h-[100px] p-4 border-2 border-dashed border-border rounded-lg bg-muted/20"
                  onDrop={(e) => {
                    e.preventDefault();
                    const item = e.dataTransfer.getData('text/plain');
                    setDraggedItems(prev => [...prev, `${target}: ${item}`]);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <h4 className="font-medium text-foreground mb-2">{target}</h4>
                  <div className="space-y-2">
                    {draggedItems
                      .filter(item => item.startsWith(`${target}:`))
                      .map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="p-2 bg-primary/10 text-primary rounded text-sm"
                        >
                          {item.split(': ')[1]}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 p-4 bg-muted/10 rounded-lg">
              {items.map((item, index) => (
                <div
                  key={item}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', item)}
                  className="px-4 py-2 bg-card border border-border rounded-lg cursor-move hover:shadow-md transition-shadow"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showFinalResults) {
    const correctAnswers = results.filter(r => r.isCorrect).length;
    const score = Math.round((correctAnswers / exercises.length) * 100);
    const averageTime = Math.round(results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length / 1000);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background p-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Exercice terminé ! 🎉
            </h1>
            <p className="text-xl text-muted-foreground">
              Voici vos résultats
            </p>
          </motion.div>

          {/* Score Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-card p-6 rounded-xl text-center"
            >
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-1">{score}%</h3>
              <p className="text-muted-foreground">Score global</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-card p-6 rounded-xl text-center"
            >
              <Target className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {correctAnswers}/{exercises.length}
              </h3>
              <p className="text-muted-foreground">Réponses correctes</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-card p-6 rounded-xl text-center"
            >
              <Brain className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-1">{averageTime}s</h3>
              <p className="text-muted-foreground">Temps moyen</p>
            </motion.div>
          </div>

          {/* Detailed Results */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-foreground mb-6">Détail des réponses</h2>
            <div className="space-y-4">
              {results.map((result, index) => {
                const question = exercises[index];
                return (
                  <div
                    key={result.questionId}
                    className={`p-4 rounded-lg border-2 ${
                      result.isCorrect
                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                        : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {result.isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 mt-1" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-2">
                          Question {index + 1}: {question.question}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-muted-foreground">Votre réponse:</span>
                            <p className="text-foreground">
                              {Array.isArray(result.userAnswer) 
                                ? result.userAnswer.join(', ') 
                                : result.userAnswer}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Réponse correcte:</span>
                            <p className="text-foreground">
                              {Array.isArray(question.correctAnswer)
                                ? question.correctAnswer.join(', ')
                                : question.correctAnswer}
                            </p>
                          </div>
                        </div>
                        {question.explanation && (
                          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                              <p className="text-sm text-blue-700 dark:text-blue-300">
                                {question.explanation}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetExercise}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Recommencer
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Retour à la leçon
            </button>
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              Terminer
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background p-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la leçon
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} sur {exercises.length}
            </div>
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / exercises.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card rounded-xl p-8 shadow-lg"
        >
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">{currentQuestionIndex + 1}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {currentQuestion.question}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Type: {currentQuestion.type === 'mcq' ? 'Choix multiple' : 
                         currentQuestion.type === 'fill-blank' ? 'Texte à trous' :
                         currentQuestion.type === 'short-answer' ? 'Réponse courte' : 'Glisser-déposer'}
                </p>
              </div>
            </div>
          </div>

          {renderQuestionContent()}

          {/* Result Display */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className={`p-4 rounded-lg border-2 ${
                  results[results.length - 1]?.isCorrect
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                }`}>
                  <div className="flex items-start gap-3">
                    {results[results.length - 1]?.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <div>
                      <h3 className="font-medium text-foreground mb-2">
                        {results[results.length - 1]?.isCorrect ? 'Correct !' : 'Incorrect'}
                      </h3>
                      {currentQuestion.explanation && (
                        <p className="text-sm text-foreground mb-3">
                          {currentQuestion.explanation}
                        </p>
                      )}
                      {!results[results.length - 1]?.isCorrect && (
                        <p className="text-sm text-foreground">
                          <span className="font-medium">Réponse correcte :</span> {' '}
                          {Array.isArray(currentQuestion.correctAnswer)
                            ? currentQuestion.correctAnswer.join(', ')
                            : currentQuestion.correctAnswer}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex justify-between mt-8">
            <div />
            
            <div className="flex gap-3">
              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Valider
                  <CheckCircle className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  {isLastQuestion ? 'Voir les résultats' : 'Question suivante'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PracticeExercises;
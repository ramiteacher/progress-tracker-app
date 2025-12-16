import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, RotateCcw } from "lucide-react";
import { mockHearingQnA } from "@/lib/qnaData";

interface MockHearingProps {
  onQuestionCompleted: (questionId: string) => void;
}

export default function MockHearing({ onQuestionCompleted }: MockHearingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQnA = mockHearingQnA[currentIndex];
  const totalQuestions = mockHearingQnA.length;

  const handleSubmitAnswer = () => {
    setShowAnswer(true);
    onQuestionCompleted(`q-${currentIndex}`);
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setShowAnswer(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer("");
      setShowAnswer(false);
    }
  };

  const handleReset = () => {
    setUserAnswer("");
    setShowAnswer(false);
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-600">
          <span>질문 {currentIndex + 1} / {totalQuestions}</span>
          <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Category Badge */}
      <div className="inline-block">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
          {currentQnA.category}
        </span>
      </div>

      {/* Question */}
      <Card className="p-6 bg-slate-50 border-l-4 border-l-blue-600">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">질문</h3>
        <p className="text-slate-700 leading-relaxed text-base">
          {currentQnA.question}
        </p>
      </Card>

      {/* User Answer Input */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-900">
          당신의 답변
        </label>
        <Textarea
          placeholder="여기에 당신의 답변을 입력하세요..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={showAnswer}
          className="min-h-32 resize-none"
        />
        <div className="flex gap-2">
          <Button
            onClick={handleSubmitAnswer}
            disabled={!userAnswer.trim() || showAnswer}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            답변 제출
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            disabled={!userAnswer && !showAnswer}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </Button>
        </div>
      </div>

      {/* Model Answer */}
      {showAnswer && (
        <Card className="p-6 bg-green-50 border-l-4 border-l-green-600 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">모범 답변</h3>
          <p className="text-slate-700 leading-relaxed text-base whitespace-pre-wrap">
            {currentQnA.answer}
          </p>
          
          {currentQnA.tips && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
              <h4 className="font-semibold text-slate-900 mb-2">💡 답변 팁</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {currentQnA.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          onClick={handlePreviousQuestion}
          disabled={currentIndex === 0}
          variant="outline"
          className="flex-1"
        >
          이전
        </Button>
        <Button
          onClick={handleNextQuestion}
          disabled={currentIndex === totalQuestions - 1 || !showAnswer}
          className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          다음
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Completion Message */}
      {currentIndex === totalQuestions - 1 && showAnswer && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-slate-700">
            ✅ 모든 질문을 완료했습니다! 다시 한번 복습하거나 Q&A 목록 탭에서 카테고리별로 학습하세요.
          </p>
        </Card>
      )}
    </div>
  );
}

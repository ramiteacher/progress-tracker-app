import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BookOpen, Mic2, FileText, BarChart3 } from "lucide-react";
import HearingStatements from "./HearingStatements";
import MockHearing from "./MockHearing";
import QnAList from "./QnAList";
import ProgressTracker from "./ProgressTracker";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">모의 심문 학습 앱</h1>
          <p className="text-slate-600">
            중앙노동위원회 심문회의 대비를 위한 예상 질문 및 답변 학습 플랫폼
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">개요</span>
            </TabsTrigger>
            <TabsTrigger value="statements" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">발언</span>
            </TabsTrigger>
            <TabsTrigger value="mock" className="flex items-center gap-2">
              <Mic2 className="w-4 h-4" />
              <span className="hidden sm:inline">모의 심문</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">진행도</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  심문회의 발언
                </h3>
                <p className="text-slate-600 mb-4">
                  심문회의 시작 시 할 도입 발언과 종료 시 할 최후 발언을 학습합니다.
                </p>
                <Button 
                  onClick={() => setActiveTab("statements")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  발언 보기
                </Button>
              </Card>

              <Card className="p-6 border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Mic2 className="w-5 h-5 text-green-600" />
                  모의 심문
                </h3>
                <p className="text-slate-600 mb-4">
                  예상 질문을 받고 답변을 입력한 후 모범 답변과 비교합니다.
                </p>
                <Button 
                  onClick={() => setActiveTab("mock")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  모의 심문 시작
                </Button>
              </Card>

              <Card className="p-6 border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  질문 & 답변 목록
                </h3>
                <p className="text-slate-600 mb-4">
                  카테고리별로 분류된 예상 질문과 모범 답변을 확인합니다.
                </p>
                <Button 
                  onClick={() => setActiveTab("qna")}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  variant="default"
                >
                  Q&A 보기
                </Button>
              </Card>

              <Card className="p-6 border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  학습 진행도
                </h3>
                <p className="text-slate-600 mb-4">
                  모의 심문을 통해 학습한 질문과 답변의 진행도를 추적합니다.
                </p>
                <Button 
                  onClick={() => setActiveTab("progress")}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  진행도 확인
                </Button>
              </Card>
            </div>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">사용 방법</h3>
              <ol className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="font-semibold text-blue-600 min-w-6">1.</span>
                  <span><strong>발언 탭</strong>에서 도입 발언과 최후 발언을 읽고 암기합니다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-blue-600 min-w-6">2.</span>
                  <span><strong>모의 심문 탭</strong>에서 예상 질문에 답변하고 모범 답변과 비교합니다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-blue-600 min-w-6">3.</span>
                  <span><strong>Q&A 목록 탭</strong>에서 카테고리별 질문을 복습합니다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-blue-600 min-w-6">4.</span>
                  <span><strong>진행도 탭</strong>에서 학습 현황을 확인합니다.</span>
                </li>
              </ol>
            </Card>
          </TabsContent>

          {/* Statements Tab */}
          <TabsContent value="statements">
            <HearingStatements />
          </TabsContent>

          {/* Mock Hearing Tab */}
          <TabsContent value="mock">
            <MockHearing 
              onQuestionCompleted={(questionId) => {
                if (!completedQuestions.includes(questionId)) {
                  setCompletedQuestions([...completedQuestions, questionId]);
                }
              }}
            />
          </TabsContent>

          {/* Q&A List Tab */}
          <TabsContent value="qna">
            <QnAList />
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <ProgressTracker completedCount={completedQuestions.length} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="container py-6 text-center text-slate-600 text-sm">
          <p>이 애플리케이션은 중앙노동위원회 심문회의 대비를 위한 학습 도구입니다.</p>
          <p className="mt-2">실제 심문회의에서는 반드시 법률 전문가(노무사, 변호사)의 조언을 받으십시오.</p>
        </div>
      </footer>
    </div>
  );
}

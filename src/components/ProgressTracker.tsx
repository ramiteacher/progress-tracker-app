import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { mockHearingQnA } from "@/lib/qnaData";

interface ProgressTrackerProps {
  completedCount: number;
}

export default function ProgressTracker({ completedCount }: ProgressTrackerProps) {
  const totalQuestions = mockHearingQnA.length;
  const completionPercentage = Math.round((completedCount / totalQuestions) * 100);

  // Group by category
  const categoryStats = mockHearingQnA.reduce((acc, item) => {
    const category = item.category;
    const existing = acc.find((c) => c.name === category);
    if (existing) {
      existing.total += 1;
    } else {
      acc.push({ name: category, total: 1, completed: 0 });
    }
    return acc;
  }, [] as Array<{ name: string; total: number; completed: number }>);

  const pieData = [
    { name: "완료", value: completedCount, fill: "#3b82f6" },
    { name: "미완료", value: totalQuestions - completedCount, fill: "#e5e7eb" }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">전체 진행도</h3>
        
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">완료한 질문</span>
                <span className="font-semibold text-slate-900">
                  {completedCount} / {totalQuestions}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="text-right text-sm font-semibold text-blue-600">
                {completionPercentage}%
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">카테고리별 진행도</h3>
        
        <div className="space-y-4">
          {categoryStats.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-900">{category.name}</span>
                <span className="text-slate-600">
                  {category.completed} / {category.total}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(category.completed / category.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-6 bg-green-50 border-green-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">💡 학습 팁</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>매일 조금씩 학습하는 것이 효과적입니다.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>모의 심문을 여러 번 반복하여 자신감을 높이세요.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>모범 답변을 암기하기보다는 핵심 논리를 이해하세요.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>심문회의 전에 도입 발언과 최후 발언을 충분히 연습하세요.</span>
          </li>
        </ul>
      </Card>

      {/* Encouragement */}
      {completionPercentage === 100 ? (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">🎉 축하합니다!</h3>
          <p className="text-slate-700">
            모든 질문을 완료했습니다. 이제 심문회의에 자신감을 가지고 임하실 수 있습니다.
            마지막으로 도입 발언과 최후 발언을 한 번 더 복습하고, 실제 심문회의에서는 차분한 태도로 임하세요.
          </p>
        </Card>
      ) : completionPercentage >= 50 ? (
        <Card className="p-6 bg-amber-50 border-amber-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">📚 계속 학습 중입니다</h3>
          <p className="text-slate-700">
            좋은 진행도입니다! 남은 질문들도 꾸준히 학습하면 심문회의에 충분히 준비할 수 있습니다.
          </p>
        </Card>
      ) : (
        <Card className="p-6 bg-slate-50 border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">🚀 학습을 시작하세요</h3>
          <p className="text-slate-700">
            모의 심문 탭에서 예상 질문에 답변하여 학습을 진행하세요.
            각 질문마다 모범 답변과 팁을 제공합니다.
          </p>
        </Card>
      )}
    </div>
  );
}

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mockHearingQnA } from "@/lib/qnaData";

export default function QnAList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group by category
  const groupedQnA = mockHearingQnA.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof mockHearingQnA>);

  const categories = Object.keys(groupedQnA);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {categories.map((category) => (
          <div key={category} className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded-full" />
              {category}
            </h3>

            <div className="space-y-3">
              {groupedQnA[category].map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-l-4 border-l-blue-500 hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full p-4 text-left flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-sm leading-relaxed">
                        {item.question}
                      </p>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {expandedId === item.id ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {expandedId === item.id && (
                    <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2 text-sm">
                          모범 답변
                        </h4>
                        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                          {item.answer}
                        </p>
                      </div>

                      {item.tips && item.tips.length > 0 && (
                        <div className="bg-white rounded-lg p-3 border border-blue-200">
                          <h4 className="font-semibold text-slate-900 mb-2 text-sm">
                            💡 답변 팁
                          </h4>
                          <ul className="space-y-1">
                            {item.tips.map((tip, idx) => (
                              <li key={idx} className="text-sm text-slate-700 flex gap-2">
                                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Card className="p-4 bg-amber-50 border-amber-200">
        <h4 className="font-semibold text-slate-900 mb-2">📚 학습 방법</h4>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>• 각 질문을 클릭하여 모범 답변과 팁을 확인하세요.</li>
          <li>• 모범 답변을 읽고 핵심 논리를 파악하세요.</li>
          <li>• 팁을 참고하여 자신만의 답변을 준비하세요.</li>
          <li>• 모의 심문 탭에서 실제로 답변해보세요.</li>
        </ul>
      </Card>
    </div>
  );
}

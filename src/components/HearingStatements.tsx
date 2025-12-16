import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function HearingStatements() {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const openingStatement = `존경하는 중앙노동위원회 위원장님과 위원님들께,

저는 오늘 이 자리에 부당하게 해고당한 근로자로서 섰습니다.

피신청인(사용자) 측은 저의 근로관계 종료가 '합의해지'였다고 주장하고 있습니다. 그러나 이는 저의 정당한 권리(4대보험 가입) 요구에 대한 보복성 해고를 은폐하기 위한 명백한 가장행위에 불과합니다.

사용자는 2025년 2월 10일, 저에게 "이번 주까지 마무리하자"고 일방적으로 통보했습니다. 이는 근로자의 의사를 묻지 않은 명백한 해고 통보였습니다. 제가 퇴사 시기를 한 달 뒤로 조정한 것은, 갑작스러운 해고 통보로 인한 생계적 충격 속에서 최소한의 생계 유지 기간과 인수인계 기간을 확보하려 했던 비자발적인 대응이었습니다.

또한, 사용자가 저에게 지급한 900만원은 근로관계 종료에 대한 '합의의 대가'가 아니라, 제가 당연히 받아야 할 법정 퇴직금과 미사용 연차수당이 주를 이루는 금액이었습니다. 사용자는 이 법정 금품 지급을 볼모로 구제신청권을 포기하는 합의서 서명을 강요했습니다.

저는 오늘 이 자리에서, 사용자의 주장이 얼마나 허위적이고 부당한지, 그리고 저의 근로관계 종료가 정당한 이유 없는 일방적인 부당해고였음을 명백히 입증하겠습니다. 위원님들께서 이 사건의 실질을 정확히 파악하시어, 저의 억울함을 풀어주시기를 간곡히 부탁드립니다.`;

  const closingStatement = `존경하는 중앙노동위원회 위원장님과 위원님들께,

저는 지난 몇 년간 피신청인 사업장에서 성실하게 근로해왔습니다. 그러나 4대보험 가입이라는 최소한의 근로자 권리를 요구했다는 이유만으로, 하루아침에 일자리를 잃었습니다.

사용자는 '합의해지'라는 그럴듯한 명분 뒤에 부당해고의 책임을 숨기려 하고 있습니다.

첫째, 근로관계 종료는 사용자의 일방적인 통보로 시작되었습니다.

둘째, 제가 퇴사 시기를 조정한 것은 생계적 궁박 상태에서 어쩔 수 없는 선택이었습니다.

셋째, 제가 받은 900만원은 합의의 대가가 아닌 법정 금품이었으며, 사용자는 이 법정 금품을 볼모로 저의 구제신청권을 포기하도록 강요했습니다.

위원님들께서도 아시다시피, 근로기준법은 근로자의 생존권을 보호하기 위한 최소한의 장치입니다. 사용자의 부당한 행위가 '합의'라는 형식적 논리로 정당화된다면, 앞으로 어떤 근로자가 자신의 정당한 권리를 주장할 수 있겠습니까.

저는 단지 부당하게 빼앗긴 저의 일터와 정당한 권리를 되찾고 싶습니다. 위원님들께서 이 사건의 실질적인 진실, 즉 사용자의 보복성 부당해고를 인정하시어, 저의 재심 신청을 인용해 주시기를 다시 한번 간곡히 부탁드립니다.

경청해 주셔서 감사합니다.`;

  const copyToClipboard = (text: string, tab: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="opening" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="opening">도입 발언</TabsTrigger>
          <TabsTrigger value="closing">최후 발언</TabsTrigger>
        </TabsList>

        <TabsContent value="opening" className="space-y-4">
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-slate-900">심문회의 도입 발언</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(openingStatement, "opening")}
                className="flex items-center gap-2"
              >
                {copiedTab === "opening" ? (
                  <>
                    <Check className="w-4 h-4" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    복사
                  </>
                )}
              </Button>
            </div>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-serif text-base">
                {openingStatement}
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-amber-50 border-amber-200">
            <h4 className="font-semibold text-slate-900 mb-2">💡 학습 팁</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• 발언을 여러 번 읽고 핵심 논리를 파악하세요.</li>
              <li>• 각 문단의 주요 주장을 암기하는 것을 목표로 하세요.</li>
              <li>• 위원들의 질문에 따라 발언의 일부를 유연하게 조정할 준비를 하세요.</li>
              <li>• 발언 시 자신감 있고 차분한 목소리를 유지하세요.</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="closing" className="space-y-4">
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-slate-900">심문회의 최후 발언</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(closingStatement, "closing")}
                className="flex items-center gap-2"
              >
                {copiedTab === "closing" ? (
                  <>
                    <Check className="w-4 h-4" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    복사
                  </>
                )}
              </Button>
            </div>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-serif text-base">
                {closingStatement}
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-amber-50 border-amber-200">
            <h4 className="font-semibold text-slate-900 mb-2">💡 학습 팁</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• 최후 발언은 심문회의의 마지막 기회이므로 매우 중요합니다.</li>
              <li>• 핵심 논리 3가지를 명확하게 강조하세요.</li>
              <li>• 감정적이지 않으면서도 진정성 있게 전달하세요.</li>
              <li>• 위원들의 판정을 존중하는 태도를 보여주세요.</li>
            </ul>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

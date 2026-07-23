import session from "../assets/icons/session.svg";
import Card from "../components/Card";
import makeBlack from "../assets/icons/makeBlack.svg";

const sessions = [
  { title: "영화의 이해", description: "설명글" },
  { title: "멋쟁이 사자처럼", description: "설명글" },
  { title: "스튜디오 2", description: "설명글" },
  { title: "세션 이름", description: "설명글" },
];

const recentQuestions = [
  {
    session: "영화의 이해",
    text: "혹시 이번에 나오는 호프 영화에 대해서 어떻게 생각하시나요?",
  },
  {
    session: "영화의 이해",
    text: "혹시 이번에 나오는 호프 영화에 대해서 어떻게 생각하시나요?",
  },
  {
    session: "영화의 이해",
    text: "혹시 이번에 나오는 호프 영화에 대해서 어떻게 생각하시나요?",
  },
];

export default function CreateSessionPage() {
  return (
    <div className="px-[29px] py-[29px]">
      <h1 className="text-[#0070F5] font-semibold text-[24px] pb-10">
        세션 만들기
      </h1>
      <div className="flex flex-col items-center">
        <p>간편하게 대화를 연결해보세요</p>

        <button className="mt-4 h-[64px] px-[80px] rounded-[20px] flex items-center justify-center gap-[10px] bg-[#0070F5]">
          <img src={session} alt="물꼬 로고" className="w-6 h-6" />
          <span className="text-white">물꼬 틀러 가기</span>
        </button>
      </div>

      <h1 className="pb-5">내가 만든 세션</h1>
      <div className="flex gap-6 overflow-x-auto pb-2">
        {sessions.map((s) => (
          <Card key={s.title} title={s.title} description={s.description} />
        ))}
      </div>

      <h2 className="font-['Pretendard'] font-medium text-[20px] leading-[120%] mt-16">
        최근에 받은 질문들
      </h2>
      <div className="flex flex-col gap-3 mt-5">
        {recentQuestions.map((q, i) => (
          <div
            key={i}
            className="flex items-start gap-2 text-[14px] text-gray-700"
          >
            <img src={makeBlack} alt="" />
            <span className="font-medium shrink-0">{q.session}</span>
            <span className="text-gray-500">{q.text}</span>
          </div>
        ))}
      </div>

      <button className="mt-5 border border-[#B2DFFF] text-[#0070F5] text-[14px] font-medium px-5 py-2 rounded-full hover:bg-blue-50 transition-colors">
        답변하러 가기
      </button>
    </div>
  );
}

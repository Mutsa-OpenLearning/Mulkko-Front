import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const sessionInfo = {
  title: '영화의 이해',
  imageUrl: '',
};

const dateList = ['03/21', '03/22', '03/23', '03/24', '03/25', '03/26'];

const initialMessages = [
  {
    id: 1,
    type: 'question',
    author: '물꼬기 332',
    likeCount: 5,
    text: '감독이 화면을 전체적으로 어둡게 연출한 이유가 분위기 조성 의도도 있나요?',
    date: '03/21',
  },
  {
    id: 2,
    type: 'answer',
    text: '점프 스케어의 횟수보다는 서사의 분위기 안에서 얼마나 효과적으로 사용되었는지가 더 중요합니다.',
    date: '03/21',
  },
  {
    id: 3,
    type: 'question',
    author: '물꼬기 332',
    likeCount: 5,
    text: '점프 스케어가 많이 사용되면 작품성이 낮은 공포영화라고 볼 수 있나요?',
    date: '03/22',
  },
  {
    id: 4,
    type: 'question',
    author: '물꼬기 332',
    likeCount: 5,
    text: '같은 장면을 롱테이크와 빠른 편집으로 표현하면 어떤 차이가 생기나요?',
    date: '03/23',
  },
  {
    id: 5,
    type: 'answer',
    text: '네, 색상과 채도, 명암은 장면의 분위기뿐 아니라 인물의 감정과 영화의 주제를 전달하는 중요한 연출 요소입니다. 어두운 조명은 관객에게 보이는 정보를 제한해 긴장감을 높이고, 인물의 불안과 고립된 심리를 시각적으로 보여주는 역할을 합니다.',
    date: '03/23',
  },
  {
    id: 6,
    type: 'question',
    author: '물꼬기 332',
    likeCount: 5,
    text: '영화의 색감은 관객의 감정을 유도하기 위해 의도적으로 정해지는 건가요?',
    date: '03/24',
  },
  {
    id: 7,
    type: 'question',
    author: '물꼬기 332',
    likeCount: 5,
    text: '열린 결말은 관객에게 해석을 맡긴 건가요?',
    date: '03/26',
  },
];

function HeartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 21s-6.716-4.35-9.428-8.03C.943 10.732 1.3 7.67 3.65 5.79c2.002-1.6 4.95-1.2 6.35 1.01 1.4-2.21 4.348-2.61 6.35-1.01 2.35 1.88 2.707 4.942 1.078 7.18C18.716 16.65 12 21 12 21Z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 5V19M12 5L6 11M12 5L18 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CameraPlaceholder() {
  return (
    <div
      className="
        flex h-[58px] w-[58px] items-center justify-center
        rounded-[12px] bg-[#E9EDF3] text-[#AAB2BF]
      "
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5v7A2.5 2.5 0 0 1 17.5 18h-11A2.5 2.5 0 0 1 4 15.5v-7Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M9 6l1-1.4A1.2 1.2 0 0 1 11 4h2a1.2 1.2 0 0 1 1 .6L15 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

function QuestionMeta({ author, likeCount }) {
  return (
    <div className="mt-2 flex items-center justify-between px-1">
      <div className="flex items-center gap-1 text-[12px] text-white/95">
        <span className="text-[13px]">💬</span>
        <span>{author}</span>
      </div>

      <div className="flex items-center gap-1 text-[12px] text-[#3E7DF3]">
        <HeartIcon />
        <span>{likeCount}</span>
      </div>
    </div>
  );
}

function QuestionBubble({ message }) {
  return (
    <div className="max-w-[420px]">
      <div
        className="
          relative rounded-[24px] rounded-bl-[8px]
          bg-white px-5 py-4
          text-[14px] leading-[150%] text-[#717A88]
          shadow-[0_4px_16px_rgba(25,40,70,0.06)]
        "
      >
        {message.text}
      </div>

      <QuestionMeta
        author={message.author}
        likeCount={message.likeCount}
      />
    </div>
  );
}

function AnswerBubble({ message }) {
  return (
    <div className="ml-auto max-w-[540px]">
      <div
        className="
          relative rounded-[24px] rounded-tr-[8px]
          bg-white px-5 py-4
          text-[14px] leading-[160%] text-[#717A88]
          shadow-[0_4px_16px_rgba(25,40,70,0.06)]
        "
      >
        {message.text}
      </div>
    </div>
  );
}

export default function AudienceSessionPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [selectedDate, setSelectedDate] = useState('03/23');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  const scrollRef = useRef(null);

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => message.date === selectedDate);
  }, [messages, selectedDate]);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [filteredMessages]);

  const handleSendQuestion = () => {
    if (!inputValue.trim()) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      type: 'question',
      author: '물꼬기 332',
      likeCount: 0,
      text: inputValue.trim(),
      date: selectedDate,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
  };

  return (
    <main className="h-[calc(100vh)] overflow-hidden bg-[#F8FAFD]">
      <div className="flex h-full">
        {/* 왼쪽 날짜/세션 정보 영역 */}
        <aside
          className="
            flex h-full w-[180px] shrink-0 flex-col
            border-r border-[#E8EDF4] bg-[#F4F6FA]
          "
        >
          <div className="px-5 pt-6">
            <div className="flex items-start gap-3">
              {sessionInfo.imageUrl ? (
                <img
                  src={sessionInfo.imageUrl}
                  alt={sessionInfo.title}
                  className="h-[58px] w-[58px] rounded-[12px] object-cover"
                />
              ) : (
                <CameraPlaceholder />
              )}

              <div className="min-w-0 pt-1">
                <p className="text-[18px] font-medium text-[#242A33]">
                  {sessionInfo.title}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex-1 overflow-y-auto px-5">
            <div className="flex flex-col gap-5">
              {dateList.map((date) => {
                const active = selectedDate === date;

                return (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={[
                      'flex h-[48px] items-center justify-center rounded-[14px]',
                      'text-[16px] font-medium transition',
                      active
                        ? 'bg-white text-[#2F73EE] shadow-[0_4px_16px_rgba(30,45,70,0.08)]'
                        : 'text-[#A3ACBA] hover:bg-white/70',
                    ].join(' ')}
                  >
                    {date}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="px-5 pb-6 pt-4">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="
                flex h-[42px] w-[92px] items-center justify-center
                rounded-full bg-[#D5392F]
                text-[14px] font-medium text-white
                hover:bg-[#c42d24]
              "
            >
              나가기
            </button>
          </div>
        </aside>

        {/* 오른쪽 채팅 영역 */}
        <section
          className="
            relative flex min-w-0 flex-1 flex-col
            bg-[linear-gradient(180deg,#5E98F0_0%,#A9C5EF_100%)]
          "
        >
          <div
            ref={scrollRef}
            className="
              flex-1 overflow-y-auto px-6 pb-[110px] pt-6
            "
          >
            <div className="mx-auto flex w-full max-w-[980px] flex-col gap-6">
              {filteredMessages.map((message) =>
                message.type === 'question' ? (
                  <QuestionBubble key={message.id} message={message} />
                ) : (
                  <AnswerBubble key={message.id} message={message} />
                ),
              )}
            </div>
          </div>

          {/* 하단 입력창 */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
            <div
              className="
                mx-auto flex w-full max-w-[980px] items-center gap-3
                rounded-t-[12px] bg-[#F6F7F9] px-5 py-4
              "
            >
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSendQuestion();
                  }
                }}
                placeholder="질문을 입력해보세요"
                className="
                  h-[40px] flex-1 rounded-full bg-[#E8EBF0]
                  px-4 text-[14px] text-[#2A313B]
                  outline-none placeholder:text-[#A2AAB7]
                "
              />

              <button
                type="button"
                onClick={handleSendQuestion}
                disabled={!inputValue.trim()}
                className="
                  flex h-[36px] w-[36px] items-center justify-center
                  rounded-full bg-[#2E323A]
                  text-white transition
                  hover:bg-[#1F2329]
                  disabled:cursor-not-allowed disabled:bg-[#B8BFCA]
                "
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </section>
      </div>

      <span className="sr-only">현재 세션 ID: {sessionId}</span>
    </main>
  );
}
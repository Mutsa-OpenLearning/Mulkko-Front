import { useState } from 'react';

const faqItems = [
  {
    id: 1,
    question: 'PIN Code는 어디에서 확인할 수 있나요?',
    answer:
      '세션을 만든 사용자가 생성 완료 화면에서 6자리 PIN Code를 확인하고 공유할 수 있습니다.',
  },
  {
    id: 2,
    question: '잘못된 PIN Code라고 표시됩니다.',
    answer:
      '입력한 여섯 자리 번호가 정확한지 확인해 주세요. 세션이 종료되었거나 삭제된 경우에도 참여할 수 없습니다.',
  },
  {
    id: 3,
    question: '질문은 익명으로 등록되나요?',
    answer:
      '세션 설정에 따라 익명 또는 닉네임으로 표시될 수 있습니다. 질문 입력 화면에서 현재 공개 방식을 확인할 수 있습니다.',
  },
  {
    id: 4,
    question: '내가 만든 세션을 삭제할 수 있나요?',
    answer:
      '마이 물꼬 또는 만든 세션 상세 화면에서 세션 관리 메뉴를 통해 삭제할 수 있도록 제공할 예정입니다.',
  },
];

function ChevronIcon({ opened }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={[
        'transition-transform',
        opened ? 'rotate-180' : '',
      ].join(' ')}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SupportPage() {
  const [openedFaqId, setOpenedFaqId] = useState(null);

  const [category, setCategory] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid =
    category &&
    email.trim() &&
    title.trim() &&
    content.trim() &&
    agreed;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      /*
       * 백엔드 연동 시 문의 등록 API를 호출한다.
       *
       * await fetch(
       *   `${import.meta.env.VITE_API_BASE_URL}/inquiries`,
       *   {
       *     method: 'POST',
       *     headers: {
       *       'Content-Type': 'application/json',
       *     },
       *     body: JSON.stringify({
       *       category,
       *       email: email.trim(),
       *       title: title.trim(),
       *       content: content.trim(),
       *     }),
       *   },
       * );
       */

      window.alert(
        '문의가 접수되었습니다. 입력한 이메일로 답변드리겠습니다.',
      );

      setCategory('');
      setTitle('');
      setContent('');
      setAgreed(false);
    } catch (error) {
      console.error('문의 등록 실패:', error);
      window.alert('문의 등록에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFD] px-[40px] py-[32px]">
      <div className="mx-auto w-full max-w-[820px]">
        <h1 className="text-[24px] font-semibold text-[#0070F5]">
          고객 문의
        </h1>

        <section
          className="
            mt-10 rounded-[22px]
            bg-gradient-to-r from-[#3F94FB] to-[#78B7FF]
            px-8 py-8 text-white
          "
        >
          <h2 className="text-[22px] font-semibold">
            물꼬 이용에 어려움이 있나요?
          </h2>

          <p className="mt-3 text-[14px] leading-[160%] text-white/85">
            자주 묻는 질문을 먼저 확인하거나,
            <br />
            해결되지 않은 문제는 문의를 남겨주세요.
          </p>
        </section>

        {/* 자주 묻는 질문 */}
        <section className="mt-10">
          <h2 className="text-[18px] font-medium text-[#20242B]">
            자주 묻는 질문
          </h2>

          <div
            className="
              mt-4 overflow-hidden rounded-[20px]
              border border-[#EDF0F4] bg-white
            "
          >
            {faqItems.map((item, index) => {
              const opened = openedFaqId === item.id;

              return (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenedFaqId(opened ? null : item.id)
                    }
                    className="
                      flex w-full items-center justify-between
                      gap-5 px-7 py-6 text-left
                      hover:bg-[#FAFBFD]
                    "
                  >
                    <span className="text-[15px] font-medium text-[#282D35]">
                      {item.question}
                    </span>

                    <span className="shrink-0 text-[#98A1AE]">
                      <ChevronIcon opened={opened} />
                    </span>
                  </button>

                  {opened && (
                    <div className="bg-[#F8FAFD] px-7 py-5">
                      <p className="text-[14px] leading-[160%] text-[#737C89]">
                        {item.answer}
                      </p>
                    </div>
                  )}

                  {index < faqItems.length - 1 && (
                    <div className="mx-7 h-px bg-[#EEF1F5]" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 문의 작성 */}
        <section className="mt-12">
          <h2 className="text-[18px] font-medium text-[#20242B]">
            문의하기
          </h2>

          <form
            onSubmit={handleSubmit}
            className="
              mt-4 rounded-[20px]
              border border-[#EDF0F4] bg-white
              px-8 py-8
            "
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label>
                <span className="text-[14px] font-medium text-[#515A67]">
                  문의 유형
                </span>

                <select
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  className="
                    mt-3 h-[50px] w-full
                    rounded-[14px] border border-transparent
                    bg-[#F1F4F8] px-4
                    text-[14px] text-[#252A32]
                    outline-none
                    focus:border-[#3F94FB]
                    focus:bg-white
                  "
                >
                  <option value="">문의 유형을 선택해주세요</option>
                  <option value="account">계정 및 로그인</option>
                  <option value="session">세션 생성 및 참여</option>
                  <option value="question">질문 및 답변</option>
                  <option value="error">오류 신고</option>
                  <option value="etc">기타 문의</option>
                </select>
              </label>

              <label>
                <span className="text-[14px] font-medium text-[#515A67]">
                  답변받을 이메일
                </span>

                <input
                  type="email"
                  value={email}
                  placeholder="example@email.com"
                  onChange={(event) => setEmail(event.target.value)}
                  className="
                    mt-3 h-[50px] w-full
                    rounded-[14px] border border-transparent
                    bg-[#F1F4F8] px-4
                    text-[14px] text-[#252A32]
                    outline-none
                    placeholder:text-[#A1A9B5]
                    focus:border-[#3F94FB]
                    focus:bg-white
                  "
                />
              </label>
            </div>

            <label className="mt-6 block">
              <span className="text-[14px] font-medium text-[#515A67]">
                제목
              </span>

              <input
                type="text"
                value={title}
                maxLength={50}
                placeholder="문의 제목을 입력해주세요"
                onChange={(event) => setTitle(event.target.value)}
                className="
                  mt-3 h-[50px] w-full
                  rounded-[14px] border border-transparent
                  bg-[#F1F4F8] px-4
                  text-[14px] text-[#252A32]
                  outline-none
                  placeholder:text-[#A1A9B5]
                  focus:border-[#3F94FB]
                  focus:bg-white
                "
              />
            </label>

            <label className="mt-6 block">
              <span className="text-[14px] font-medium text-[#515A67]">
                문의 내용
              </span>

              <textarea
                value={content}
                maxLength={1000}
                placeholder="문의 내용을 자세히 입력해주세요"
                onChange={(event) => setContent(event.target.value)}
                className="
                  mt-3 h-[180px] w-full resize-none
                  rounded-[14px] border border-transparent
                  bg-[#F1F4F8] px-4 py-4
                  text-[14px] leading-[160%] text-[#252A32]
                  outline-none
                  placeholder:text-[#A1A9B5]
                  focus:border-[#3F94FB]
                  focus:bg-white
                "
              />

              <p className="mt-2 text-right text-[12px] text-[#A1A9B5]">
                {content.length}/1000
              </p>
            </label>

            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="
                  mt-[2px] h-4 w-4
                  rounded border-[#C7CFDA]
                  accent-[#3F94FB]
                "
              />

              <span className="text-[13px] leading-[150%] text-[#747D8A]">
                문의 답변을 위한 이메일 수집 및 이용에 동의합니다.
              </span>
            </label>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="
                mx-auto mt-8 flex h-[48px] w-[180px]
                items-center justify-center
                rounded-[14px] bg-[#3F94FB]
                text-[14px] font-medium text-white
                hover:bg-[#2D84E9]
                disabled:cursor-not-allowed
                disabled:bg-[#CDD5E0]
              "
            >
              {isSubmitting ? '접수 중...' : '문의 접수하기'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
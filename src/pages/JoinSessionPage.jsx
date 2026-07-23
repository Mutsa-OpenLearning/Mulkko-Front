import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import makeBlack from '../assets/icons/makeBlack.svg';
import sessionIcon from '../assets/icons/session.svg';
import Card from '../components/Card';

const joinedSessions = [
  {
    id: 1,
    title: '영화의 이해',
    description: '설명글',
  },
  {
    id: 2,
    title: '멋쟁이 사자처럼',
    description: '설명글',
  },
  {
    id: 3,
    title: '스튜디오 2',
    description: '설명글',
  },
];

const likedQuestions = [
  {
    id: 1,
    session: '영화의 이해',
    text: '혹시 이번에 나오는 호프 영화에 대해서 어떻게 생각하시나요?',
  },
  {
    id: 2,
    session: '영화의 이해',
    text: '혹시 이번에 나오는 호프 영화에 대해서 어떻게 생각하시나요?',
  },
  {
    id: 3,
    session: '영화의 이해',
    text: '혹시 이번에 나오는 호프 영화에 대해서 어떻게 생각하시나요?',
  },
];

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="8" fill="#A7ADB8" />

      <path
        d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SessionJoinModal({
  session,
  isJoining,
  onClose,
  onConfirm,
}) {
  useEffect(() => {
    if (!session) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [session, onClose]);

  if (!session) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-[200]
        flex items-center justify-center
        bg-black/30 px-5
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-session-modal-title"
        className="
          relative flex w-full max-w-[326px]
          flex-col rounded-[18px] bg-white
          px-8 pb-8 pt-9
          shadow-[0_16px_50px_rgba(20,30,45,0.2)]
        "
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="모달 닫기"
          className="
            absolute right-4 top-4
            flex h-7 w-7 items-center justify-center
          "
        >
          <CloseIcon />
        </button>

        <div
          className="
            mx-auto flex h-[180px] w-[180px]
            items-center justify-center overflow-hidden
            rounded-[16px] bg-[#EEF1F6]
          "
        >
          {session.imageUrl ? (
            <img
              src={session.imageUrl}
              alt={`${session.title} 세션`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-[12px] text-[#A2AAB7]">
              세션 이미지
            </span>
          )}
        </div>

        <div className="mt-6">
          <h2
            id="join-session-modal-title"
            className="
              text-[16px] font-semibold leading-[120%]
              text-[#1F2329]
            "
          >
            {session.title}
          </h2>

          <p
            className="
              mt-3 min-h-[42px]
              whitespace-pre-wrap
              text-[12px] leading-[150%]
              text-[#7E8794]
            "
          >
            {session.description || '등록된 세션 설명이 없습니다.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isJoining}
          className="
            mx-auto mt-8 flex h-[40px] w-[166px]
            items-center justify-center
            rounded-[14px] bg-[#2F73EE]
            text-[13px] font-medium text-white
            transition-colors
            hover:bg-[#2467DC]
            disabled:cursor-not-allowed
            disabled:bg-[#BCC8D8]
          "
        >
          {isJoining ? '참여 중...' : '참여하기'}
        </button>
      </section>
    </div>
  );
}

export default function JoinSessionPage() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const [pinCode, setPinCode] = useState(Array(6).fill(''));
  const [sessionToJoin, setSessionToJoin] = useState(null);

  const [isCheckingPin, setIsCheckingPin] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const isPinComplete = pinCode.every((number) => number !== '');

  const handlePinChange = (index, value) => {
    const number = value.replace(/\D/g, '').slice(-1);

    setPinCode((previousPinCode) => {
      const nextPinCode = [...previousPinCode];
      nextPinCode[index] = number;

      return nextPinCode;
    });

    if (number && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === 'Backspace' &&
      !pinCode[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedPin = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!pastedPin) {
      return;
    }

    const nextPinCode = Array(6).fill('');

    pastedPin.split('').forEach((number, index) => {
      nextPinCode[index] = number;
    });

    setPinCode(nextPinCode);

    const nextFocusIndex = Math.min(pastedPin.length, 5);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleCheckPinCode = async () => {
    if (!isPinComplete || isCheckingPin) {
      return;
    }

    const pin = pinCode.join('');

    try {
      setIsCheckingPin(true);

      /*
       * 백엔드 연결 시 아래 임시 데이터를 지우고 API를 호출한다.
       *
       * const response = await fetch(
       *   `${import.meta.env.VITE_API_BASE_URL}/sessions/pin/${pin}`,
       *   {
       *     method: 'GET',
       *     headers: {
       *       Authorization:
       *         `Bearer ${localStorage.getItem('accessToken')}`,
       *     },
       *   },
       * );
       *
       * if (!response.ok) {
       *   throw new Error('세션을 찾을 수 없습니다.');
       * }
       *
       * const result = await response.json();
       * const sessionData = result.data;
       */

      const sessionData = {
        sessionId: 'demo-session',
        title: '멋쟁이 사자처럼 애거톤',
        description:
          '물꼬대학교 멋쟁이 사자처럼 애거톤 파이팅~!',
        imageUrl: '',
        pinCode: pin,
      };

      setSessionToJoin(sessionData);
    } catch (error) {
      console.error('PIN Code 확인 실패:', error);

      window.alert(
        '세션을 찾을 수 없습니다. PIN Code를 다시 확인해 주세요.',
      );
    } finally {
      setIsCheckingPin(false);
    }
  };

  const handleConfirmJoin = async () => {
    if (!sessionToJoin || isJoining) {
      return;
    }

    try {
      setIsJoining(true);

      /*
       * 참여 처리 API가 따로 있다면 여기에서 호출한다.
       *
       * const response = await fetch(
       *   `${import.meta.env.VITE_API_BASE_URL}/sessions/${sessionToJoin.sessionId}/join`,
       *   {
       *     method: 'POST',
       *     headers: {
       *       'Content-Type': 'application/json',
       *       Authorization:
       *         `Bearer ${localStorage.getItem('accessToken')}`,
       *     },
       *     body: JSON.stringify({
       *       pinCode: pinCode.join(''),
       *     }),
       *   },
       * );
       *
       * if (!response.ok) {
       *   throw new Error('세션 참여에 실패했습니다.');
       * }
       */

      navigate(`/sessions/${sessionToJoin.sessionId}/audience`);
    } catch (error) {
      console.error('세션 참여 실패:', error);

      window.alert(
        '세션에 참여하지 못했습니다. 다시 시도해 주세요.',
      );
    } finally {
      setIsJoining(false);
    }
  };

  const handleCloseModal = () => {
    if (isJoining) {
      return;
    }

    setSessionToJoin(null);
  };

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFD] px-[29px] py-[29px]">
        <h1 className="pb-10 text-[24px] font-semibold text-[#0070F5]">
          세션 참여하기
        </h1>

        {/* PIN Code 입력 영역 */}
        <section className="flex flex-col items-center">
          <p className="text-[16px] text-[#727986]">
            Pin Code 입력
          </p>

          <div
            className="mt-4 flex items-center gap-3"
            onPaste={handlePaste}
          >
            {pinCode.map((number, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <input
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={
                    index === 0 ? 'one-time-code' : 'off'
                  }
                  aria-label={`PIN Code ${index + 1}번째 자리`}
                  value={number}
                  maxLength={1}
                  onChange={(event) =>
                    handlePinChange(index, event.target.value)
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(index, event)
                  }
                  className="
                    h-[64px] w-[48px]
                    rounded-[14px]
                    border border-[#B9DFFF]
                    bg-white text-center
                    text-[22px] font-medium text-[#171A1F]
                    outline-none transition
                    focus:border-[#0070F5]
                    focus:ring-2 focus:ring-[#0070F5]/10
                  "
                />

                {index === 2 && (
                  <span className="text-[20px] text-[#535B68]">
                    -
                  </span>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCheckPinCode}
            disabled={!isPinComplete || isCheckingPin}
            className="
              mt-8 flex h-[52px] min-w-[172px]
              items-center justify-center gap-[10px]
              rounded-[16px]
              bg-[#0070F5] px-8
              text-[15px] font-medium text-white
              transition-colors
              hover:bg-[#0063D9]
              disabled:cursor-not-allowed
              disabled:bg-[#DDE2EA]
              disabled:text-[#A3ABB8]
            "
          >
            <img
              src={sessionIcon}
              alt=""
              aria-hidden="true"
              className={[
                'h-5 w-5',
                !isPinComplete ? 'opacity-40' : '',
              ].join(' ')}
            />

            <span>
              {isCheckingPin
                ? '세션 확인 중...'
                : '물꼬 참여하기'}
            </span>
          </button>
        </section>

        {/* 내가 참여한 세션 */}
        <section className="mt-14">
          <h2
            className="
              pb-5 text-[20px] font-medium
              leading-[120%] text-[#171A1F]
            "
          >
            내가 참여한 세션
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-2">
            {joinedSessions.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        {/* 좋아요를 누른 질문 */}
        <section className="mt-12">
          <h2
            className="
              text-[20px] font-medium
              leading-[120%] text-[#171A1F]
            "
          >
            좋아요 누른 질문들
          </h2>

          <div className="mt-5 flex flex-col gap-3">
            {likedQuestions.map((question) => (
              <div
                key={question.id}
                className="
                  flex min-w-0 items-start
                  gap-2 text-[14px]
                "
              >
                <img
                  src={makeBlack}
                  alt=""
                  aria-hidden="true"
                  className="mt-[2px] h-4 w-4 shrink-0"
                />

                <span
                  className="
                    shrink-0 font-medium
                    text-[#303640]
                  "
                >
                  {question.session}
                </span>

                <span className="truncate text-[#7E8795]">
                  {question.text}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* PIN 확인 후 표시되는 세션 참여 모달 */}
      <SessionJoinModal
        session={sessionToJoin}
        isJoining={isJoining}
        onClose={handleCloseModal}
        onConfirm={handleConfirmJoin}
      />
    </>
  );
}
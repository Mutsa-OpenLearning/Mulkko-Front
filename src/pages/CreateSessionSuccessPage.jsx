import { useLocation, useNavigate, useParams } from 'react-router-dom';

import MulKkoBlue from '../assets/icons/MulKkoBlue.svg';

function PinCode({ value }) {
  const digits = String(value ?? '')
    .replace(/\D/g, '')
    .slice(0, 6)
    .padEnd(6, ' ')
    .split('');

  return (
    <div className="mt-4 flex items-center gap-2">
      {digits.map((digit, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="
              flex h-[58px] w-[46px]
              items-center justify-center
              rounded-[14px] border border-[#B8D9FF]
              bg-white
              text-[24px] font-medium text-[#181A20]
            "
          >
            {digit}
          </div>

          {index === 2 && (
            <span className="text-[20px] font-medium text-[#515866]">-</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function CreateSessionSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId } = useParams();

  const {
    pinCode = '',
    sessionName = '',
    description = '',
  } = location.state ?? {};

  const handleShare = async () => {
    const joinUrl = `${window.location.origin}/sessions/join?pin=${pinCode}`;

    const shareText = [
      `물꼬 세션에 참여해 주세요.`,
      `세션명: ${sessionName}`,
      `PIN Code: ${pinCode}`,
      joinUrl,
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${sessionName} | 물꼬`,
          text: shareText,
          url: joinUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(shareText);
      window.alert('세션 정보가 복사되었습니다.');
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.error('세션 공유 실패:', error);
      }
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F8FAFD] px-10 py-12">
      <div className="flex w-full max-w-[520px] flex-col items-center">
        <img
          src={MulKkoBlue}
          alt=""
          className="h-[68px] w-auto"
        />

        <h1 className="mt-7 text-center text-[28px] font-semibold leading-[120%] text-[#2F78F3]">
          물꼬를 틀 세션이 만들어졌어요!
        </h1>

        <p className="mt-3 text-center text-[14px] leading-[150%] text-[#7D8592]">
          세션번호를 공유해 간편하게 대화를 연결해보세요
        </p>

        <div className="mt-12 w-full max-w-[410px]">
          <div>
            <p className="text-[14px] text-[#8A929F]">세션명</p>

            <p className="mt-2 text-[16px] font-medium text-[#20242B]">
              {sessionName || '세션명이 없습니다.'}
            </p>
          </div>

          <div className="mt-7">
            <p className="text-[14px] text-[#8A929F]">세션 설명</p>

            <p className="mt-2 whitespace-pre-wrap text-[16px] font-medium leading-[150%] text-[#20242B]">
              {description || '등록된 세션 설명이 없습니다.'}
            </p>
          </div>

          <div className="mt-10">
            <p className="text-[15px] text-[#7A8290]">Pin Code</p>

            <PinCode value={pinCode} />
          </div>
        </div>

        <div className="mt-16 flex w-[200px] flex-col gap-3">
          <button
            type="button"
            onClick={handleShare}
            disabled={!pinCode}
            className="
              flex h-[48px] w-full items-center justify-center
              rounded-[14px] bg-[#3378F0]
              text-[15px] font-medium text-white
              transition-colors
              hover:bg-[#276AE0]
              disabled:cursor-not-allowed disabled:bg-[#B9C9DD]
            "
          >
            공유하기
          </button>

          <button
            type="button"
            onClick={() => navigate('/home')}
            className="
              flex h-[48px] w-full items-center justify-center
              rounded-[14px] border border-[#9DCBFF]
              bg-white
              text-[15px] font-medium text-[#3378F0]
              transition-colors
              hover:bg-[#F4F9FF]
            "
          >
            홈으로 돌아가기
          </button>
        </div>

        <span className="sr-only">생성된 세션 ID: {sessionId}</span>
      </div>
    </section>
  );
}
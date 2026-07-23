import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={[
        'relative h-[28px] w-[50px] rounded-full transition-colors',
        checked ? 'bg-[#3F94FB]' : 'bg-[#D8DEE8]',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-[3px] h-[22px] w-[22px]',
          'rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-[25px]' : 'translate-x-[3px]',
        ].join(' ')}
      />
    </button>
  );
}

function ConfirmModal({
  title,
  description,
  confirmText,
  danger = false,
  onClose,
  onConfirm,
}) {
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
      <div
        role="dialog"
        aria-modal="true"
        className="
          w-full max-w-[360px]
          rounded-[20px] bg-white
          px-7 py-7
          shadow-[0_20px_60px_rgba(28,39,55,0.18)]
        "
      >
        <h2 className="text-[18px] font-semibold text-[#20242B]">
          {title}
        </h2>

        <p className="mt-3 whitespace-pre-line text-[14px] leading-[150%] text-[#7C8593]">
          {description}
        </p>

        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              h-[44px] flex-1 rounded-[14px]
              border border-[#DCE2EA] bg-white
              text-[14px] font-medium text-[#687180]
              hover:bg-[#F7F9FC]
            "
          >
            취소
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={[
              'h-[44px] flex-1 rounded-[14px]',
              'text-[14px] font-medium text-white',
              danger
                ? 'bg-[#F04452] hover:bg-[#DF3442]'
                : 'bg-[#3F94FB] hover:bg-[#2D84E9]',
            ].join(' ')}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('물꼬기 332');
  const [savedNickname, setSavedNickname] = useState('물꼬기 332');

  const [sessionNotification, setSessionNotification] = useState(true);
  const [questionNotification, setQuestionNotification] = useState(true);

  const [modalType, setModalType] = useState(null);

  const isNicknameChanged =
    nickname.trim() && nickname.trim() !== savedNickname;

  const handleSaveNickname = () => {
    if (!nickname.trim()) {
      return;
    }

    setSavedNickname(nickname.trim());
    setNickname(nickname.trim());

    window.alert('프로필이 수정되었습니다.');
  };

  const handleLogout = () => {
    // 실제 토큰 저장 키에 맞게 수정한다.
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setModalType(null);
    navigate('/login', { replace: true });
  };

  const handleWithdraw = () => {
    /*
     * 백엔드 연동 시 회원 탈퇴 API를 호출한 뒤
     * 토큰을 제거하고 로그인 화면으로 이동한다.
     */

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setModalType(null);
    navigate('/login', { replace: true });
  };

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFD] px-[40px] py-[32px]">
        <div className="mx-auto w-full max-w-[760px]">
          <h1 className="text-[24px] font-semibold text-[#0070F5]">
            설정
          </h1>

          {/* 프로필 */}
          <section className="mt-10">
            <h2 className="text-[18px] font-medium text-[#20242B]">
              프로필
            </h2>

            <div
              className="
                mt-4 rounded-[20px] border border-[#EDF0F4]
                bg-white px-7 py-7
              "
            >
              <div className="flex items-center gap-5">
                <div
                  className="
                    flex h-[72px] w-[72px] shrink-0
                    items-center justify-center
                    rounded-full bg-[#E4F2FF]
                    text-[22px] font-semibold text-[#3F94FB]
                  "
                >
                  물
                </div>

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor="nickname"
                    className="text-[14px] font-medium text-[#555E6B]"
                  >
                    닉네임
                  </label>

                  <div className="mt-2 flex gap-3">
                    <input
                      id="nickname"
                      type="text"
                      value={nickname}
                      maxLength={12}
                      onChange={(event) =>
                        setNickname(event.target.value)
                      }
                      className="
                        h-[48px] min-w-0 flex-1
                        rounded-[14px] border border-transparent
                        bg-[#F1F4F8] px-4
                        text-[14px] text-[#20242B]
                        outline-none
                        focus:border-[#3F94FB]
                        focus:bg-white
                      "
                    />

                    <button
                      type="button"
                      disabled={!isNicknameChanged}
                      onClick={handleSaveNickname}
                      className="
                        h-[48px] shrink-0 rounded-[14px]
                        bg-[#3F94FB] px-6
                        text-[14px] font-medium text-white
                        hover:bg-[#2D84E9]
                        disabled:cursor-not-allowed
                        disabled:bg-[#CDD5E0]
                      "
                    >
                      저장
                    </button>
                  </div>

                  <p className="mt-2 text-[12px] text-[#98A1AE]">
                    최대 12자까지 입력할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 알림 */}
          <section className="mt-10">
            <h2 className="text-[18px] font-medium text-[#20242B]">
              알림 설정
            </h2>

            <div
              className="
                mt-4 overflow-hidden rounded-[20px]
                border border-[#EDF0F4] bg-white
              "
            >
              <div className="flex items-center justify-between px-7 py-6">
                <div>
                  <p className="text-[15px] font-medium text-[#262B33]">
                    세션 알림
                  </p>

                  <p className="mt-1 text-[13px] text-[#8A929F]">
                    참여 중인 세션의 시작과 종료 소식을 받습니다.
                  </p>
                </div>

                <Toggle
                  checked={sessionNotification}
                  onChange={setSessionNotification}
                  label="세션 알림"
                />
              </div>

              <div className="mx-7 h-px bg-[#EEF1F5]" />

              <div className="flex items-center justify-between px-7 py-6">
                <div>
                  <p className="text-[15px] font-medium text-[#262B33]">
                    질문 알림
                  </p>

                  <p className="mt-1 text-[13px] text-[#8A929F]">
                    내 질문에 답변이나 반응이 등록되면 알려줍니다.
                  </p>
                </div>

                <Toggle
                  checked={questionNotification}
                  onChange={setQuestionNotification}
                  label="질문 알림"
                />
              </div>
            </div>
          </section>

          {/* 계정 */}
          <section className="mt-10">
            <h2 className="text-[18px] font-medium text-[#20242B]">
              계정
            </h2>

            <div
              className="
                mt-4 overflow-hidden rounded-[20px]
                border border-[#EDF0F4] bg-white
              "
            >
              <div className="flex items-center justify-between px-7 py-6">
                <div>
                  <p className="text-[15px] font-medium text-[#262B33]">
                    로그인 계정
                  </p>

                  <p className="mt-1 text-[13px] text-[#8A929F]">
                    카카오 계정으로 로그인 중입니다.
                  </p>
                </div>

                <span
                  className="
                    rounded-full bg-[#FFF4B8]
                    px-3 py-1.5
                    text-[12px] font-medium text-[#6A5700]
                  "
                >
                  Kakao
                </span>
              </div>

              <div className="mx-7 h-px bg-[#EEF1F5]" />

              <button
                type="button"
                onClick={() => setModalType('logout')}
                className="
                  flex w-full items-center justify-between
                  px-7 py-6 text-left
                  hover:bg-[#FAFBFD]
                "
              >
                <div>
                  <p className="text-[15px] font-medium text-[#262B33]">
                    로그아웃
                  </p>

                  <p className="mt-1 text-[13px] text-[#8A929F]">
                    현재 계정에서 로그아웃합니다.
                  </p>
                </div>

                <span className="text-[#A5ADBA]">
                  <ChevronRightIcon />
                </span>
              </button>
            </div>
          </section>

          <button
            type="button"
            onClick={() => setModalType('withdraw')}
            className="
              mt-8 text-[13px] text-[#A1A9B5]
              underline underline-offset-4
              hover:text-[#F04452]
            "
          >
            회원 탈퇴
          </button>
        </div>
      </main>

      {modalType === 'logout' && (
        <ConfirmModal
          title="로그아웃할까요?"
          description="언제든지 카카오 계정으로 다시 로그인할 수 있습니다."
          confirmText="로그아웃"
          onClose={() => setModalType(null)}
          onConfirm={handleLogout}
        />
      )}

      {modalType === 'withdraw' && (
        <ConfirmModal
          title="정말 탈퇴할까요?"
          description={
            '탈퇴하면 참여하거나 만든 세션과 질문 기록을 다시 확인할 수 없습니다.\n삭제된 정보는 복구하기 어렵습니다.'
          }
          confirmText="회원 탈퇴"
          danger
          onClose={() => setModalType(null)}
          onConfirm={handleWithdraw}
        />
      )}
    </>
  );
}
import KakaoIcon from "../assets/icons/KakaoIcon.svg";

export const KakaoLoginButton = () => {
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

  const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize` +
    `?client_id=${REST_API_KEY}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="
        flex h-[50px] w-full max-w-[384px]
        items-center justify-center gap-2
        rounded-full bg-[#FEE500]
        text-[16px] font-medium leading-[120%] text-[#191919]
        transition-colors
        hover:bg-[#F5DC00]
        active:bg-[#EBD300]
      "
    >
      <img
        src={KakaoIcon}
        alt=""
        aria-hidden="true"
        className="h-5 w-5 object-contain"
      />

      <span>카카오톡으로 시작</span>
    </button>
  );
};
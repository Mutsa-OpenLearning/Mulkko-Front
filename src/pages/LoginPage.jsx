import MulKko from "../assets/icons/MulKko.svg";
import { KakaoLoginButton } from "../components/KakaoLoginButton";

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#3F94FB] to-[#E4F2FF] gap-[40px]">
      <img src={MulKko} alt="MulKko" className="w-[384px] h-auto" />
      <p className="text-white ">
        물꼬는 말하기 어려웠던 질문을 꺼내고, 교수와 학생의 대화를 이어줍니다.
      </p>
      <KakaoLoginButton />
    </div>
  );
}

export default LoginPage;

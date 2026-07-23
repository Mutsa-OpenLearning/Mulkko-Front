import MulKko from "../assets/icons/MulKko.svg";
import Union from "../assets/icons/Union.svg";

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#3F94FB] to-[#E4F2FF]">
      <img src={MulKko} alt="MulKko" className="w-[117px] h-auto" />
      <img src={Union} alt="Union" className="w-[242px] h-auto" />
      <p>
        물꼬는 말하기 어려웠던 질문을 꺼내고, 교수와 학생의 대화를 이어줍니다.
      </p>
    </div>
  );
}

export default LoginPage;

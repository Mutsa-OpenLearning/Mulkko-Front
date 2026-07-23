import { Link } from 'react-router-dom';

import mulkkoLogo from '../assets/icons/MulKko.svg';
import homeImage from '../assets/images/homeImg.svg';

export default function HomePage() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* 배경 이미지 */}
      <img
        src={homeImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* 파란색 오버레이 */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,75,145,0.42)_0%,rgba(47,113,235,0.82)_52%,#2F73EB_100%)]" />

      {/* 홈 콘텐츠 */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-10">
        <div className="flex -translate-y-2 flex-col items-center text-center">
          <img
            src={mulkkoLogo}
            alt="물꼬"
            className="w-[150px] brightness-0 invert"
          />

          <p className="mt-6 text-body-5 text-white">
            물꼬는 말하기 어려웠던 질문을 꺼내고,
            <br className="sm:hidden" />
            교수와 학생의 대화를 이어줍니다.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            <Link
              to="/sessions/create"
              className="flex h-11 w-[160px] items-center justify-center rounded-full bg-white text-body-5 font-medium text-primary-500 transition hover:bg-[#F5F8FF]"
            >
              만들기
            </Link>

            <Link
              to="/sessions/join"
              className="flex h-11 w-[160px] items-center justify-center rounded-full border border-white bg-transparent text-body-5 font-medium text-white transition hover:bg-white/10"
            >
              참여하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
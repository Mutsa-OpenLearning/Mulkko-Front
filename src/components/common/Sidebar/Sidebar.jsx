import { Link, useLocation } from 'react-router-dom';

import chatIcon from '../../../assets/icons/chat.svg';
import chatActiveIcon from '../../../assets/icons/chat1.svg';
import homeIcon from '../../../assets/icons/home.svg';
import homeActiveIcon from '../../../assets/icons/home1.svg';
import logo from '../../../assets/icons/MulKko.svg';
import makeIcon from '../../../assets/icons/make.svg';
import makeActiveIcon from '../../../assets/icons/make1.svg';
import myIcon from '../../../assets/icons/my.svg';
import myActiveIcon from '../../../assets/icons/my1.svg';
import profileIcon from '../../../assets/icons/Union.svg';

const mainMenus = [
  {
    label: '홈',
    path: '/home',
    icon: homeIcon,
    activeIcon: homeActiveIcon,
    isActive: (pathname) => pathname === '/home',
  },
  {
    label: '만들기',
    path: '/sessions/create',
    icon: makeIcon,
    activeIcon: makeActiveIcon,
    isActive: (pathname) =>
      pathname.startsWith('/sessions/create') ||
      pathname.startsWith('/sessions/created'),
  },
  {
    label: '참여하기',
    path: '/sessions/join',
    icon: chatIcon,
    activeIcon: chatActiveIcon,
    isActive: (pathname) =>
      pathname.startsWith('/sessions/join') ||
      pathname.includes('/audience'),
  },
  {
    label: '마이 물꼬',
    path: '/my',
    icon: myIcon,
    activeIcon: myActiveIcon,
    isActive: (pathname) => pathname.startsWith('/my'),
  },
];

function SettingsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20.3h-3v-.08a1.7 1.7 0 0 0-1.03-1.56A1.7 1.7 0 0 0 8.8 19l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.02 15a1.7 1.7 0 0 0-1.56-1.03H5.4v-3h.06A1.7 1.7 0 0 0 7.02 9.94a1.7 1.7 0 0 0-.34-1.88L6.62 8l2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.03-1.56V4.7h3v.02a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06L19.8 8l-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.04v3h-.04A1.7 1.7 0 0 0 19.4 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 12v4a2 2 0 0 0 2 2h1v-6H7a2 2 0 0 0-2 2Zm14 0v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SidebarMenuItem({ menu, pathname }) {
  const active = menu.isActive(pathname);

  return (
    <Link
      to={menu.path}
      className={[
        'flex h-12 w-full items-center gap-3 rounded-xl px-4',
        'text-body-5 transition-colors duration-150',
        active
          ? 'bg-primary-50 text-primary-500'
          : 'text-[#98A2B3] hover:bg-[#F5F7FA] hover:text-[#667085]',
      ].join(' ')}
    >
      <img
        src={active ? menu.activeIcon : menu.icon}
        alt=""
        className="h-5 w-5 shrink-0"
      />

      <span>{menu.label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-[296px] border-r border-[#F2F4F7] bg-white">
      <div className="mx-auto flex h-full w-[244px] flex-col py-6">
        <Link to="/home" className="inline-flex w-fit">
          <img src={logo} alt="물꼬" className="h-auto w-[92px]" />
        </Link>

        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#F2F4F7]">
              <img
                src={profileIcon}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            <span className="text-body-5 font-medium text-text-primary">
              가입한 회원명
            </span>
          </div>

          <button
            type="button"
            aria-label="프로필 수정"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#98A2B3] hover:bg-[#F5F7FA] hover:text-primary-500"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M13.5 6.5 17.5 10.5M4 20l4.2-.9L19 6.3a1.8 1.8 0 0 0 0-2.6l-.7-.7a1.8 1.8 0 0 0-2.6 0L4.9 15.8 4 20Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <nav aria-label="주요 메뉴" className="mt-12 flex flex-col gap-2">
          {mainMenus.map((menu) => (
            <SidebarMenuItem
              key={menu.path}
              menu={menu}
              pathname={pathname}
            />
          ))}
        </nav>

        <nav
          aria-label="기타 메뉴"
          className="mt-auto flex flex-col gap-2 pb-1"
        >
          <Link
            to="/settings"
            className="flex h-12 items-center gap-3 rounded-xl px-4 text-body-5 text-[#98A2B3] hover:bg-[#F5F7FA] hover:text-[#667085]"
          >
            <SettingsIcon />
            <span>설정</span>
          </Link>

          <Link
            to="/support"
            className="flex h-12 items-center gap-3 rounded-xl px-4 text-body-5 text-[#98A2B3] hover:bg-[#F5F7FA] hover:text-[#667085]"
          >
            <SupportIcon />
            <span>고객 문의</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
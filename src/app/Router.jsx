import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import CreateSessionFormPage from "../pages/CreateSessionFormPage";
import CreateSessionPage from "../pages/CreateSessionPage";

function TemporaryPage({ title }) {
  return (
    <section className="p-10">
      <h1 className="text-headline-2 text-text-primary">{title}</h1>
    </section>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 사이드바가 없는 화면 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<TemporaryPage title="회원가입" />} />

      {/* 사이드바가 있는 화면 */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomePage />} />

      {/* 물꼬 틀러 가기 */}
        <Route
          path="/sessions/create/new"
          element={<CreateSessionFormPage />}
        />

        <Route
          path="/sessions/join"
          element={<TemporaryPage title="세션 참여" />}
        />
        <Route
          path="/sessions/joined"
          element={<TemporaryPage title="이전에 참여한 세션" />}
        />

        <Route path="/sessions/create" element={<CreateSessionPage />} />

        <Route
          path="/sessions/create/new"
          element={<CreateSessionFormPage />}
        />
        <Route
          path="/sessions/created"
          element={<TemporaryPage title="이전에 만든 세션" />}
        />

        <Route
          path="/sessions/:sessionId/options"
          element={<TemporaryPage title="세션 옵션 설정" />}
        />
        
        <Route
          path="/sessions/:sessionId/audience"
          element={<TemporaryPage title="참여자 실시간 질문" />}
        />
        <Route
          path="/sessions/:sessionId/presenter"
          element={<TemporaryPage title="발표자 실시간 진행" />}
        />
        <Route
          path="/sessions/:sessionId/result"
          element={<TemporaryPage title="세션 결과" />}
        />

        <Route path="/my" element={<TemporaryPage title="마이 물꼬" />} />
        <Route path="/settings" element={<TemporaryPage title="설정" />} />
        <Route path="/support" element={<TemporaryPage title="고객 문의" />} />
      </Route>

      <Route
        path="*"
        element={<TemporaryPage title="페이지를 찾을 수 없습니다." />}
      />
    </Routes>
  );
}

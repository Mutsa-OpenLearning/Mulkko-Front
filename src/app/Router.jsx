import { Navigate, Route, Routes } from 'react-router';

function TemporaryPage({ title }) {
  return (
    <main>
      <h1>{title}</h1>
    </main>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/login" element={<TemporaryPage title="로그인" />} />
      <Route path="/signup" element={<TemporaryPage title="회원가입" />} />

      <Route path="/home" element={<TemporaryPage title="물꼬 홈" />} />

      <Route
        path="/sessions/join"
        element={<TemporaryPage title="세션 참여" />}
      />
      <Route
        path="/sessions/joined"
        element={<TemporaryPage title="이전에 참여한 세션" />}
      />

      <Route
        path="/sessions/create"
        element={<TemporaryPage title="세션 만들기" />}
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

      <Route
        path="*"
        element={<TemporaryPage title="페이지를 찾을 수 없습니다." />}
      />
    </Routes>
  );
}
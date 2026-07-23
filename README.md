# 물꼬 Frontend

질문과 답변이 맞닿으며 대화의 물꼬를 트는 실시간 발표 Q&A 서비스입니다.

발표자는 발표자료를 공유하고, 참여자는 발표를 들으며 익명으로 질문을 남길 수 있습니다. 다른 참여자는 궁금한 질문에 공감을 표시할 수 있으며, 발표자는 질문을 실시간으로 확인하고 음성으로 답변합니다.

발표자의 음성 답변은 STT를 통해 텍스트로 변환되며, 질문 말풍선과 답변 말풍선이 서로 맞닿는 형태로 하나의 대화가 완성됩니다. 세션 종료 후에는 질문과 답변 기록을 확인하고 다음 발표에 활용할 수 있습니다.

## 주요 기능

- 발표 세션 생성 및 참여 코드 공유
- 참여 코드를 통한 발표 세션 입장
- 익명 질문 등록
- 질문 공감 표시
- 발표자 질문 실시간 확인
- 발표자 음성 답변 녹음
- STT를 활용한 음성 답변 텍스트 변환
- 질문과 답변이 연결되는 말풍선 인터랙션
- 세션 종료 후 질문·답변 기록 확인

## 핵심 차별점

### 질문과 답변이 맞닿는 말풍선 UI

기존 Q&A 서비스처럼 질문과 답변을 단순한 카드나 채팅으로 나열하지 않습니다. 질문자가 질문을 등록하면 질문 말풍선이 생성되고, 발표자가 답변하면 반대 방향의 답변 말풍선이 나타납니다.

답변이 완료되면 두 말풍선이 서로 맞닿으며 하나의 대화로 완성됩니다. 이를 통해 익명으로 질문하더라도 발표자가 내 질문에 직접 답했다는 경험을 제공합니다.

### 음성 답변을 기록하는 STT

발표자는 질문에 대한 답변을 직접 입력하지 않고 음성으로 전달할 수 있습니다. 발표자의 음성 답변은 STT를 통해 텍스트로 변환되어 질문과 함께 저장됩니다.

현장에서 사라지기 쉬운 구두 답변을 다시 확인하고 활용할 수 있는 Q&A 기록으로 남깁니다.

## 기술 스택

### Frontend

- React
- Vite
- JavaScript
- React Router

### 예정 기술

- MediaRecorder API
- WebSocket
- STT API
- Spring Boot API 연동

## 프로젝트 구조

```text
src
├─ app
│  └─ Router.jsx              # 전체 페이지 라우팅
│
├─ assets
│  ├─ icons                   # 아이콘 파일
│  └─ images                  # 이미지 파일
│
├─ components
│  ├─ common                  # 여러 화면에서 공통으로 사용하는 컴포넌트
│  └─ layout                  # Header, Navigation 등 레이아웃 컴포넌트
│
├─ hooks                      # 공통 커스텀 훅
│
├─ pages                      # 라우터와 연결되는 페이지 컴포넌트
│
├─ styles                     # 전역 스타일 및 공통 스타일
│
├─ utils                      # 공통 함수 및 데이터 처리 로직
│
├─ App.jsx                    # 애플리케이션 최상위 컴포넌트
└─ main.jsx                   # React 애플리케이션 진입점
```

현재는 기본 폴더 구조와 라우팅만 구성합니다. 세부 페이지, 공통 컴포넌트, 디자인 시스템, API 관련 구조는 디자인과 API 명세 확정 후 추가합니다.

## 라우팅 구조

| 경로 | 설명 |
| --- | --- |
| `/` | 기본 진입 경로 |
| `/login` | 로그인 |
| `/signup` | 회원가입 |
| `/home` | 물꼬 홈 |
| `/sessions/join` | 세션 참여 |
| `/sessions/joined` | 이전에 참여한 세션 |
| `/sessions/create` | 세션 생성 |
| `/sessions/created` | 이전에 만든 세션 |
| `/sessions/:sessionId/options` | 세션 옵션 설정 |
| `/sessions/:sessionId/audience` | 참여자 실시간 질문 화면 |
| `/sessions/:sessionId/presenter` | 발표자 실시간 진행 화면 |
| `/sessions/:sessionId/result` | 세션 결과 화면 |

## 브랜치 운영 방식

| 브랜치 | 담당자 | 용도 |
| --- | --- | --- |
| `main` | 공통 | 최종 코드 통합 |
| `lnh` | 이남혁 | 이남혁 개인 작업 |
| `ljh` | 이주희 | 이주희 개인 작업 |

각자의 개인 브랜치에서 작업한 뒤 `main` 브랜치로 Pull Request를 생성합니다.

```text
lnh → main
ljh → main
```

개인 브랜치끼리 직접 병합하지 않으며, 모든 작업은 `main`을 기준으로 통합합니다.

## 작업 흐름

### 1. 작업 시작 전 최신 코드 반영

```bash
git switch main
git pull origin main

git switch 개인브랜치
git merge main
```

이남혁:

```bash
git switch lnh
```

이주희:

```bash
git switch ljh
```

### 2. 개인 브랜치에서 작업

```bash
git add .
git commit -m "커밋 메시지"
git push
```

### 3. 작업 완료 후 Pull Request 생성

GitHub에서 자신의 개인 브랜치에서 `main` 브랜치로 Pull Request를 생성합니다.

```text
개인 브랜치 → main
```

코드 확인 후 `main`에 병합합니다.

## 커밋 메시지 규칙

| 타입 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 오류 수정 |
| `design` | UI 및 스타일 수정 |
| `refactor` | 코드 구조 개선 |
| `chore` | 프로젝트 설정 및 기타 작업 |
| `docs` | 문서 수정 |

예시:

```bash
git commit -m "chore: React 프로젝트 기본 세팅"
git commit -m "feat: 세션 참여 라우팅 추가"
git commit -m "design: 홈 화면 UI 구현"
git commit -m "fix: 잘못된 페이지 이동 수정"
```

## 프로젝트 실행

### 패키지 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드 확인

```bash
npm run build
```

### 코드 검사

```bash
npm run lint
```

## 현재 진행 상태

- [x] React 프로젝트 생성
- [x] 기본 폴더 구조 구성
- [x] React Router 연결
- [x] 기본 페이지 경로 구성
- [ ] 디자인 시스템 적용
- [ ] 공통 컴포넌트 구현
- [ ] 페이지 UI 구현
- [ ] API 연동
- [ ] 실시간 질문·답변 연결
- [ ] 음성 녹음 및 STT 연동
- [ ] 말풍선 연결 인터랙션 구현

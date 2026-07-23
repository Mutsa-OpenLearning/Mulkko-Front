import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function BackIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 7V17M7 12H17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" fill="#A7ADB8" />
      <path
        d="M6 6L10 10M10 6L6 10"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CreateSessionFormPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    // 추후 세션 생성 API 응답에서 실제 세션 ID를 받아 사용한다.
    const temporarySessionId = 'new-session';

    navigate(`/sessions/${temporarySessionId}/options`);
  };

  return (
    <section className="relative min-h-screen bg-background px-10 py-8">
      {/* 이전 화면 이동 */}
      <Link
        to="/sessions/create"
        className="
          inline-flex items-center gap-1
          text-body-3 text-primary-500
          transition-opacity hover:opacity-70
        "
      >
        <BackIcon />
        <span>물꼬 틀러 가기</span>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="
          mx-auto flex w-full max-w-[576px]
          flex-col pt-[72px]
        "
      >
        {/* 세션 사진 */}
        <label className="mx-auto block cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <div
            className="
              flex h-[256px] w-[256px]
              items-center justify-center overflow-hidden
              rounded-[20px] bg-[#EEF1F6]
              transition-colors hover:bg-[#E7EBF2]
            "
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="선택한 세션 사진"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <span
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-full bg-white text-[#C2C9D5]
                  "
                >
                  <PlusIcon />
                </span>

                <span className="text-body-5 text-[#737B89]">
                  세션 사진 설정
                </span>
              </div>
            )}
          </div>
        </label>

        {/* 세션 제목 */}
        <div className="mt-9">
          <label
            htmlFor="session-title"
            className="text-body-5 text-[#4D5562]"
          >
            세션 제목
          </label>

          <div className="relative mt-3">
            <input
              id="session-title"
              type="text"
              value={title}
              maxLength={50}
              placeholder="제목을 입력해주세요"
              onChange={(event) => setTitle(event.target.value)}
              className="
                h-[50px] w-full rounded-[16px]
                border border-transparent bg-[#EEF1F6]
                px-5 pr-12
                text-body-5 text-text-primary
                outline-none
                placeholder:text-[#9EA6B4]
                focus:border-primary-500
                focus:bg-white
              "
            />

            <button
              type="button"
              onClick={() => setTitle('')}
              aria-label="세션 제목 지우기"
              className="
                absolute right-4 top-1/2
                flex -translate-y-1/2 items-center justify-center
                rounded-full
              "
            >
              <ClearIcon />
            </button>
          </div>
        </div>

        {/* 설명글 */}
        <div className="mt-7">
          <label
            htmlFor="session-description"
            className="text-body-5 text-[#4D5562]"
          >
            설명글
          </label>

          <div className="relative mt-3">
            <textarea
              id="session-description"
              value={description}
              maxLength={300}
              placeholder="세션에 대한 간단한 설명을 입력해주세요"
              onChange={(event) => setDescription(event.target.value)}
              className="
                h-[168px] w-full resize-none
                rounded-[16px]
                border border-transparent bg-[#EEF1F6]
                px-5 py-4 pr-12
                text-body-5 text-text-primary
                outline-none
                placeholder:text-[#9EA6B4]
                focus:border-primary-500
                focus:bg-white
              "
            />

            <button
              type="button"
              onClick={() => setDescription('')}
              aria-label="설명글 지우기"
              className="
                absolute right-4 top-4
                flex items-center justify-center
                rounded-full
              "
            >
              <ClearIcon />
            </button>
          </div>
        </div>

        {/* 생성 버튼 */}
        <button
          type="submit"
          disabled={!title.trim()}
          className="
            mx-auto mt-[72px]
            flex h-[48px] w-[200px]
            items-center justify-center
            rounded-[16px]
            bg-primary-500
            text-body-3 text-white
            transition-colors
            hover:bg-[#2F84E8]
            disabled:cursor-not-allowed
            disabled:bg-[#B8C8DA]
          "
        >
          세션 만들기
        </button>
      </form>
    </section>
  );
}
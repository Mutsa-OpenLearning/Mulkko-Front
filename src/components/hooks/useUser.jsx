import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext(null);

const NICKNAME_STORAGE_KEY = "mulkko-nickname";
const DEFAULT_NICKNAME = "물꼬기 332";

export function UserProvider({ children }) {
  const [nickname, setNickname] = useState(() => {
    const savedNickname = localStorage.getItem(NICKNAME_STORAGE_KEY);

    return savedNickname || DEFAULT_NICKNAME;
  });

  const updateNickname = (newNickname) => {
    const trimmedNickname = newNickname.trim().slice(0, 12);

    if (!trimmedNickname) {
      return false;
    }

    setNickname(trimmedNickname);
    localStorage.setItem(NICKNAME_STORAGE_KEY, trimmedNickname);

    return true;
  };

  const value = useMemo(
    () => ({
      nickname,
      updateNickname,
    }),
    [nickname],
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser는 UserProvider 안에서 사용해야 합니다.");
  }

  return context;
}
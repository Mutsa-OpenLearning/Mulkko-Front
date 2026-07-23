import AppRouter from "./app/Router";
import { UserProvider } from "./components/hooks/useUser";

export default function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}
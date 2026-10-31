import { createContext, useContext } from "react";

export const JoinClubContext = createContext<(() => void) | null>(null);

export function useJoinClub() {
  const openSignup = useContext(JoinClubContext);
  if (!openSignup)
    throw new Error("Join Club controls require JoinClubContext.");
  return openSignup;
}

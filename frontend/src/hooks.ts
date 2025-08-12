import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootStateToken } from "./types/state";

export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootStateToken> = useSelector;

export const selectAuthToken = (s: RootStateToken) => s.auth.token;
export const useAuthToken = () => useSelector(selectAuthToken);

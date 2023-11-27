import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"
import { appDispath } from "../store";
import { rootState } from "../store"

export const useAppDispatch = () => useDispatch<appDispath>();
export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector;
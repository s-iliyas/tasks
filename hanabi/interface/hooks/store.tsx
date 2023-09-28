import { AppDispatch, RootState } from '@/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Import the AppDispatch and RootState types from '@/store'

// Create a custom hook to use the AppDispatch throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch

// Create a custom hook to use the useSelector hook with RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// These custom hooks allow you to access the Redux dispatch and selector
// functions with the correct types inferred based on your store configuration.
// They are meant to replace plain `useDispatch` and `useSelector` calls
// in your React components, providing type safety and consistency.

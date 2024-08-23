import { useState } from "react";

/**
 * Boolean custom hook
 * 
 * @param {boolean} initial 
 */
export function useToggle(initial = false) {
    const [state, setState] = useState(initial)
    const toggle = () => setState(v => !v)
    return [state, toggle]
}
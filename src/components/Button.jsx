import { useContext } from "react"

/**
 * Button component
 * 
 * @param {} children 
 * @param {"primary" | "secondary" | "danger" | "warning"} variant 
 * @returns {JSX.Element}
 */
export function Button({ children, variant = 'info', ...props }) {
    let cssType = 'text-sky-50 bg-sky-700 hover:bg-sky-600 dark:bg-gray-800 dark:text-blue-400'
    if (variant === 'danger') {
        cssType = 'text-red-50 bg-red-700 hover:bg-red-500 dark:bg-gray-800 dark:text-red-400'
    } else if (variant === 'warning') {
        cssType = 'text-yellow-800 bg-yellow-200 hover:bg-yellow-300 dark:bg-gray-800 dark:text-yellow-300'
    } else if (variant === 'success') {
        cssType = 'text-green-800 bg-green-200 hover:bg-green-300 dark:bg-gray-800 dark:text-green-400'
    } else if (variant === 'secondary') {
        cssType = 'text-gray-800 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300'
    } else if (variant === 'none') {
        cssType = ''
    }

    if (props.href) {
        return <a
            className={`rounded px-2 py-1 ${cssType}`}
            {...props}>
            {children}
        </a>
    }

    return <button
        className={`rounded px-2 py-1 ${cssType}`}
        {...props}>
        {children}
    </button>
}
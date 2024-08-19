import { useToggle } from '../hooks/useToggle'

/**
 * 
 * @param {string} title 
 * @param {string} content 
 * @param {string} type
 * @returns {JSX.Element}
 */
export function Alert({ title, content, type = 'danger' }) {
    let cssType = 'text-red-900 bg-red-300 dark:bg-gray-800 dark:text-red-400'
    if (type === 'info') {
        cssType = 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400'
    } else if (type === 'warning') {
        cssType = 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300'
    } else if (type === 'success') {
        cssType = 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400'
    } else if (type === 'secondary') {
        cssType = 'text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
    }

    const [show, toggle] = useToggle(true)

    if (!show) {
        return null
    }

    return <div className={`p-2 my-2 text-sm rounded ${cssType}`} role="alert">
        <span className="font-medium">{title}</span> {content}
        <button onClick={toggle}>Close</button>
    </div>
}

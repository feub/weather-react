import { useEffect, useRef, useState } from "react";
import '../assets/css/parallax.css'

export const toPixels = n => `${Math.floor(n)}px`

export function Parallax() {
    const div1Ref = useRef(null)

    useEffect(() => {
        if (div1Ref.current) {
            const { top } = div1Ref.current?.getBoundingClientRect()
            const height = div1Ref.current?.clientHeight

            addEventListener('scroll', (e) => {
                if (div1Ref.current) {
                    const calculatedTop = top + height * 0.3
                    let bottom = calculatedTop - window.scrollY

                    if (window.scrollY > calculatedTop && window.scrollY < calculatedTop + height) {
                        div1Ref.current.style.bottom = toPixels(bottom)
                    } else if (window.scrollY < calculatedTop) {
                        div1Ref.current.style.bottom = '0'
                    }
                }
            })
        }
    })


    return (
        <>
            <div className="parallax1" ref={div1Ref}>
                <div>
                    <h1 className="font-bold text-2xl mb-3">Awesome React: The Story of A Sleek Parallax Effect</h1>
                    <p>How to make your website appear more artistic than usual with the help of some CSS and React.js</p>
                </div>
            </div>
            <div className="parallax2"></div>
        </>
    )
}
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export function CityViewSkel({ theme }) {
    const [bColor, setBColor] = useState('#def2fe');
    const [hColor, setHColor] = useState('#eff7fc');

    useEffect(() => {
        if (theme === 'light') {
            setBColor('#def2fe');
            setHColor('#eff7fc');
        } else {
            setBColor('#303133');
            setHColor('#1a1b1c');
        }
    }, [theme]);

    return <div className="max-w-screen-md w-full py-12 flex flex-col items-center justify-center">
        <SkeletonTheme baseColor={bColor} highlightColor={hColor}>
            <h1 className="font-thin text-4xl mb-2"><Skeleton width={300} height={75} /></h1>
            <p className="text-sm mb-12 flex justify-center items-center al">
                <span className="mr-2">
                    <Skeleton width={100} />
                </span>
                <span>
                    <Skeleton width={80} />
                </span>
            </p>
            <p className="text-8xl mb-8">
                <Skeleton width={200} height={90} />
            </p>
            <p>
                <Skeleton width={180} />
            </p>
            <p className="capitalize">
                <Skeleton width={180} />
            </p>
            <Skeleton circle width={150} height={150} />
        </SkeletonTheme>
    </div>;
}
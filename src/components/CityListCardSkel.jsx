import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export function CityListCardSkel({ cards, theme }) {
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

    return Array(cards)
        .fill(0)
        .map((item, index) => (
            <div key={index}>
                <SkeletonTheme baseColor={bColor} highlightColor={hColor}>
                    <div className="card-skeleton flex py-3 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer dark:bg-weather-secondary-dark">
                        <div className="flex flex-col flex-1">
                            <h2 className="text-3xl"><Skeleton width={200} /></h2>
                            <h3 className="text-white/50"><Skeleton width={120} /></h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-3xl self-end">
                                <Skeleton width={50} />
                            </p>
                            <div className="flex gap-2">
                                <Skeleton circle width={50} height={50} />
                            </div>
                        </div>
                    </div>
                </SkeletonTheme>
            </div>
        ));
}
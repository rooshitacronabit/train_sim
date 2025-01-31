import {useCallback, useRef} from 'react';
import {useAnimationFrame, useGlobalContext} from '../Hooks';

export function SpeedoMeter() {
    const {currentSpeed} = useGlobalContext();
    const ref = useRef<HTMLDivElement>()
    const callback = useCallback(() => {
        if (!ref.current) {
            return;
        }
        const current = Math.round(Math.abs(currentSpeed.current));
        ref.current.innerHTML = `<span>${current} km/h</span>`;
        ref.current.style.setProperty('--speed', `${current / 90 * 100}%`);
    }, [ref, currentSpeed]);

    useAnimationFrame(callback);

    return (
        <div className="speedometer" ref={ref}></div>
    );
}

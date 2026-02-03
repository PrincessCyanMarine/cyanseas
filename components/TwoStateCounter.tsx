import { useEffect, useId, useState } from "react";
import styles from "../styles/components/TwoStateCounter.module.scss";

const TwoStateCounter = ({ filledString, emptyString, defaultMax, defaultValue, maxMax, storageKey }: {
    filledString: string,
    emptyString: string,
    defaultMax: number,
    defaultValue: number,
    storageKey: string,

    maxMax?: number,
}) => {
    const [selected, setSelected] = useState(-1);

    const [max_value, _setMaxValue] = useState(defaultMax);
    const [current_value, _setCurrentValue] = useState(defaultValue);

    const inputId = useId();

    const setCurrentValue = (_value = 0) => {
        if (_value < 0) _value = 0;
        else if (_value > max_value) _value = max_value;
        _setCurrentValue(_value);
        setSelected(-1);
        return _value;
    }
    const setMaxValue = (_max = 1) => {
        if (_max < 1) _max = 1;
        else if (maxMax && _max > maxMax) _max = maxMax;
        _setMaxValue(_max);
        if (_max < current_value) setCurrentValue(_max);
        (document.getElementById(inputId) as HTMLInputElement).value = _max.toString();
        return _max;
    }
    
    const increaseValue = () => setCurrentValue(current_value + 1)
    const decreaseValue = () => setCurrentValue(current_value - 1)
    const increaseMaxValue = () => setMaxValue(max_value + 1)
    const decreaseMaxValue = () => setMaxValue(max_value - 1)

    const [hearts, setHearts] = useState<string[]>([]);
    useEffect(() => {
        const current = Math.min(current_value, max_value);
        const empty = Math.max(0, max_value) - current;
        setHearts(Array.from({ length: current }).fill(filledString)
            .concat(Array.from({ length: empty }).fill(emptyString)) as string[]);
    },
        [current_value, max_value, filledString, emptyString]
    );

    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        if (hasLoaded) return;
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const data = JSON.parse(saved); 
            _setMaxValue(data.max_value);
            _setCurrentValue(data.current_value);
        }
        setHasLoaded(true);
    }, []);
    useEffect(() => {
        console.debug('hasLoaded', hasLoaded);
        if (!hasLoaded) return;
        localStorage.setItem(storageKey, JSON.stringify({ current_value, max_value }));
        console.debug(storageKey, JSON.stringify({ current_value, max_value }));
    }, [current_value, max_value, hasLoaded]);


    return (
        <div style={{ minWidth: '100%'}}>
            <div style={{marginBottom: '16px'}}>
                <button onClick={() => decreaseMaxValue() }>-</button>
                <input
                    id={inputId}
                    type="number"
                    defaultValue={max_value} 
                    onBlur={(ev) => { setMaxValue(parseInt(ev.currentTarget.value || '1')); }}
                    onKeyDown={(ev) => { if (ev.key === 'Enter') setMaxValue(parseInt(ev.currentTarget.value || '1')); }}
                />
                <button onClick={() => increaseMaxValue() }>+</button>
            </div>
            <div style={{
                width: '100%',
                height: '50%',
                fontSize: '64px',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <button style={{ height: '100px' }} onClick={() => decreaseValue() }>-</button>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-around',
                    height: '100px',
                }}>
                    {hasLoaded ? hearts.map((h, i) => {
                        return <div
                            style={{
                                cursor: 'pointer',
                                minWidth: '80px',
                                minHeight: '100px',
                            }}
                            key={i}
                            onPointerEnter={(ev) => { setSelected(i); }}
                            onPointerLeave={(ev) => { setSelected(-1); }}
                            onPointerDown={(ev) => {
                                ev.preventDefault();
                                ev.stopPropagation();
                                setCurrentValue(i + 1);
                            }}
                        >{h}</div>;
                    }) : ''}
                </div>
                <button style={{ height: '100px' }} onClick={() => increaseValue() }>+</button>
            </div>
        </div>
    );
}

export default TwoStateCounter;
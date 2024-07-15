import './styles.css';
import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextAreaInout({ type = 'text', rows="100%", cols='50',className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
            <textarea
                {...props}
                type={type}
                rows={rows}
                cols={cols}
                className={
                    className +' customborder '
                }
                ref={input}
            >
            {!props.value === null ? props.value : "Enter text here"}
            </textarea>
    );
});

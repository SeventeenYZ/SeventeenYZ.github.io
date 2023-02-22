## 数字输入框

需求描述：金额输入框限制2位小数，使用`Input`并设置`type = 'number'`在PC端存在鼠标在输入框内，滚动滚轮会加减数字的情况，存在风险

解决办法：组件库有`Stepper`组件，基于`Input`封装而成并可支持2位小数的格式，缺点是不支持`placeholder`，因此把`Stepper`源码中需要的部分提取出来做成公共组件金额输入框

```tsx
import React, {ReactElement, useEffect, useState} from 'docs/Framework/React';
import {Input} from 'antd-mobile';
import {usePropsValue} from './usePropsValue'; // 源码中utils里的文件

type IProps = {
    onBlur?: (value: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (value: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (value: any) => void;
    placeholder?: string;
    readOnly?: boolean;
    style?: React.CSSProperties;
}

// 支持两位数的金额输入
const CPInputAmount = (props: IProps): ReactElement => {
    // usePropsValue能获取form传下来的值
    const [value, setValue] = usePropsValue<number | null>(props as any);
    const [inputValue, setInputValue] = useState(() =>
        convertValueToText(value, 2),
    );

    function setValueWithCheck(v: number) {
        if (isNaN(v)) return null;
        const value = parseFloat(v.toFixed(2));
        setValue(value);
        return value;
    }

    const [hasFocus, setHasFocus] = useState(false);

    useEffect(() => {
        if (!hasFocus) {
            setInputValue(convertValueToText(value, 2));
        }
    }, [hasFocus]);

    useEffect(() => {
        if (!hasFocus) {
            setInputValue(convertValueToText(value, 2));
        }
    }, [value]);

    const handleInputChange = (v: string) => {
        setInputValue(v);
        let outValue;
        const value = convertTextToValue(v);
        if (value === null) {
            setValue(null);
            outValue = null;
        } else {
            outValue = setValueWithCheck(value);
        }
        props.onChange?.(outValue);
    };

    return (
        <Input
            onFocus={(e) => {
                setHasFocus(true);
                props.onFocus?.(e);
            }}
            value={inputValue}
            onChange={(val) => handleInputChange(val)}
            onBlur={(e) => {
                setHasFocus(false);
                props.onBlur?.(e);
            }}
            role='spinbutton'
            aria-valuenow={Number(inputValue)}
            inputMode='decimal'
            readOnly={props.readOnly}
            placeholder={props.placeholder}
            style={props.style}
        />
    );
};

export default CPInputAmount;

function convertValueToText(value: number | null, digits?: number) {
    if (value === null || value === undefined) return '';
    if (digits !== undefined) {
        return Number(value).toFixed(digits);
    } else {
        return value.toString();
    }
}

function convertTextToValue(text: string) {
    if (text === '') return null;
    return parseFloat(text);
}

```

## ios手机上z-index无效问题

背景：使用的ant design mobile的popup组件，在ios16版本手机上底下部分被自定义的tabbar组件覆盖原因：因为设置了getContainer={null}，挂载到了父元素上，去掉后默认挂载到body上，z-index层级显示恢复正常

import React from 'react';
import styles from '../../stylesheets/calculator/calculator.module.scss';
import cx from 'classnames';

interface ButtonProps {
    value: string | number;
    stylesClass?: string;
    onClick?: (value: string | number) => void
}

const CalculatorButton = (props: ButtonProps) => {
    const { value, stylesClass, onClick } = props;

    return (
        <>
            <button
                type={'button'}
                className={cx(styles.button, stylesClass)}
                onClick={() => onClick(value)}>
                {value}
            </button>
        </>
    )
}

export default CalculatorButton

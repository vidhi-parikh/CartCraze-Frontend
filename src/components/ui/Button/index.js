import React from 'react';

import styles from './index.module.css'


const Button = ({ children, onClick, className, style, ...rest }) => {

    return (
        <button
            className={`${styles.btn} ${className}`}
            style={style}
            onClick={onClick}
            {...rest}
            
        >
            {children}
        </button>
    );
};

export default Button
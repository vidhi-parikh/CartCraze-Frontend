import React from 'react';

import styles from './index.module.css'


const Textarea = ({ label, placeholder, value, onChange, className, style, suffix, type='text', ...rest }) => {

  const inputStyle = {
    ...style
  }
  return (
    <div className={styles.input_container} style={inputStyle}>
      {label && <label className={styles.input_label}>{label}</label>}
      <textarea
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        {...rest}
      />
      
    </div>
  );
};

export default Textarea
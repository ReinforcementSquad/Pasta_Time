import React, { Components } from 'react';

function TextField(props) {
  return (
    <div className="text-field">
      <span className="input-text">{ props.inputText }</span>
      <input className="field" type="text" />
    </div>
  );
}

export default TextField;

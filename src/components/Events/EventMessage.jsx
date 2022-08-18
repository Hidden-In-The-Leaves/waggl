import React from 'react';

export default function EventMessage(props) {
  return (
    <div style={{ margin: '10px 20px' }}>
      <span style={{ marginRight: '20px' }}>Username</span>
      <span>Time posted</span>
      <p>Some message text</p>
    </div>
  );
}

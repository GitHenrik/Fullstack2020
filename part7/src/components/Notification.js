import React from 'react';

const Notification = ({ content }) => {
  let style = { display: '' }
  if (!content)
    style = { display: "none" }
  return <div style={style}>New anecdote created: {content}</div>
}

export default Notification
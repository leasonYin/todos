import React, { useState, useEffect } from 'react'

export default function About() {

  const [ count ,setCount ] = useState(0);

  useEffect(() => {
    document.title=`You clicked ${count} times`;
  });

  return (
    <div className="row">
      <div className="col-12">
        <span className="mr-auto">You clicked ${count} times</span>
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
        <button type="button" onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
        <button type="button" onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );

}

import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeCtx } from '../../App';

export default function About() {

  const theme = useContext(ThemeCtx)

  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const catChase = (x, y) => {
    return (
      <p>{x}, {y}</p>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <span className="mr-auto">You clicked ${count} times</span>
        </div>
        <div className="col-6">
          <button type="button" onClick={() => setCount(count + 1)}>+</button>
          <button type="button" onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
          <button type="button" onClick={() => setCount(0)}>Reset</button>
        </div>
      </div>
      <div className="row">
        <div className={`col-12 mt-2`} >
          <pre className={`text-${theme.text} bg-${theme.bg}`}>{JSON.stringify(theme, null, 2)}</pre>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Mouse chase={catChase} />
        </div>
      </div>
    </div>
  );


}

function Mouse(props) {

  const theme = useContext(ThemeCtx)

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (e) => {
    setX(e.clientX);
    setY(e.clientY);
  }

  Mouse.propTypes = {
    chase: PropTypes.func.isRequired
  }

  return (
    <div className={`bg-${theme.bg} text-${theme.text}`} style={{ height: '300px' }} onMouseMove={handleMouseMove}>
      {props.chase(x, y)}
    </div>
  );

}
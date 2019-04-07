import React, { useState, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeCtx } from '../../App';

export default function About() {

  const theme = useContext(ThemeCtx)

  const [counter, dispatch] = useReducer(
    (counter, action) => {
      switch (action.type) {
        case "increment":
          return { count: counter.count + 1 };
        case "decrement":
          return { count: counter.count - 1 };
        case 'reset':
          return { count: 0};
        default:
          throw new Error('unrecognized type: ' + action.type);
      }
    }, { count: 0 });

  const catChase = (x, y) => {
    return (
      <p>{x}, {y}</p>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <span className="mr-auto">You clicked ${counter.count} times</span>
        </div>
        <div className="col-6">
          <button type="button" onClick={() => dispatch({type: 'increment'})}>+</button>
          <button type="button" onClick={() => dispatch({type: 'decrement'})}>-</button>
          <button type="button" onClick={() => dispatch({type: 'reset'})}>Reset</button>
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
      <div className="row">
        <div className="col-12">
        <CustomTextInput />
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

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
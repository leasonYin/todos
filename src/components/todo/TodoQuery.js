import React from 'react'

export default function TodoQuery(props) {
    return (
        <form>
            <div className="row">
                <div className="col-sm-6">
                    <input id="criteria"
                        className="form-control form-control-sm"
                        name="criteria"
                        value={props.criteria}
                        placeholder="input text to filter"
                        onChange={props.handleQueryInput} />
                </div>
                <div className="col-sm-6 align-self-center">
                    <div className="form-check">
                        <input type="checkbox"
                            className="form-check-input"
                            id="uncompleteOnly"
                            name="uncompleteOnly"
                            checked={props.uncompleteOnly}
                            onChange={props.handleQueryInput} />
                        <label htmlFor="uncompleteOnly" className="form-check-label text-muted">only uncompleted</label>
                    </div>
                </div>
            </div>
        </form>
    )
}

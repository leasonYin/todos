import React, { Component } from 'react'
import { Form, Input, Button, InputGroup } from 'reactstrap';

export class AddTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            errmsg: null
        }
        this.changeTitle = this.changeTitle.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    changeTitle(e) {
        e.persist();
        this.setState((prevState, props) => {
            const value = e.target.value;
            let errmsg = null;
            if (value.length === 0) {
                errmsg = 'you must input something ...';
            }

            return {
                ...prevState,
                title: e.target.value,
                errmsg: errmsg
            }
        })
    }

    handleBlur() {
        this.setState({
            errmsg: null
        })
    }

    submit(e) {
        e.preventDefault();

        if (this.state.title.length === 0) {
            this.setState({
                errmsg: 'you must input something ...'
            })
        } else {
            this.props.addTodo(this.state.title);
            this.setState({
                title: '',
                errmsg: null
            })
        }
    }

    render() {

        return (
            <Form onBlur={this.handleBlur}>
                <div className="form-row">
                    <InputGroup className="col-12 form-input-inline">
                        <Input name="title"
                            value={this.state.title}
                            placeholder={this.state.errmsg === null ? "Add Todo ..." : this.state.errmsg}
                            onChange={this.changeTitle}
                            className="rounded-0"
                            valid={this.state.errmsg === null}
                            invalid={this.state.errmsg !== null} />
                        <Button type="submit"
                            color="secondary"
                            className="rounded-0"
                            onClick={this.submit.bind(this)}>
                            Add...
                        </Button>
                    </InputGroup>
                </div>

            </Form>
        )
    }
}

export default AddTodo

import React, { Component } from 'react'
import { Form, Input, FormGroup, Button, InputGroup } from 'reactstrap';

export class AddTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '' 
        }
        this.changeTitle = this.changeTitle.bind(this);
    }

    changeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({
            title: ''            
        })
    }

    render() {
        return (
                <Form>
                    <div className="form-row">
                    <InputGroup className="col-12 form-input-inline">
                        <Input name="title" 
                               value={this.state.title} 
                               placeholder="Add Todo ..."
                               onChange={this.changeTitle} 
                               className="rounded-0"/>
                        <Button type="submit" color="dark" className="rounded-0" onClick={this.submit.bind(this)}>Add...</Button>
                    </InputGroup>
                    </div>
                </Form>
        )
    }
}

export default AddTodo

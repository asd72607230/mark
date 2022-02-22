import React, { Component } from 'react';
import Axios from 'axios';

class TodoEdit extends Component {
    state = {
        todoItem: { todoTableId: 3, title: "Job C", isComplete: true }
    }

    async componentDidMount() {
        var url = `http://localhost:8000/todo/item/${this.props.match.params.id}`;
        var result = await Axios.get(url);
        this.state.todoItem = result.data;
        this.state.todoItem.isComplete = (this.state.todoItem.isComplete) ? "true" : "false";
        this.setState({});
    }

    okButtonClick = async () => {
        // console.log(this.state.todoItem);
        await Axios.put("http://localhost:8000/todo/item", this.state.todoItem);
        window.location = "/todo/index";
        // console.log(result);
    }

    todoItemTitleChange = (e) => {
        var newState = { ...this.state };
        newState.todoItem.title = e.target.value;
        this.setState(newState);
        // this.state.todoItem.title = e.target.value;
        // this.setState({});
    }

    selectOnChange = (e) => {
        var newState = { ...this.state };
        newState.todoItem.isComplete = (e.target.value === "true") ? true : false;
        this.setState(newState);
    }

    render() {
        return (


            <div className="container">


                <h1>待辦事項清單 - 修改 </h1>
                <hr />
                <div className="row">
                    <div className="col-md-4">
                        <form action="/Todo/Edit" method="post">

                            <input type="hidden" id="TodoItemId"
                                name="TodoItemId" value="1" />
                            <div className="form-group">
                                <label className="control-label" htmlFor="Name">項目名稱</label>
                                <input className="form-control" type="text"
                                    onChange={this.todoItemTitleChange}
                                    id="Name" name="Name" value={this.state.todoItem.title} />
                            </div>


                            <div className="form-group row">
                                <label className="col-4 col-form-label" htmlFor="isComplete">已完工?</label>
                                <div className="col-8">
                                    <select id="isComplete" onChange={this.selectOnChange} value={this.state.todoItem.isComplete} name="isComplete" className="custom-select">
                                        <option value="false">not yet</option>
                                        <option value="true">done</option>
                                    </select>
                                </div>
                            </div>


                            <div className="form-group">
                                <input type="button" onClick={this.okButtonClick} value="確定" className="btn btn-outline-primary" /> |
                                <a href="/Todo/Index" className="btn btn-outline-info">取消</a>
                            </div>
                        </form>
                    </div>
                </div>


            </div>





        );
    }
}

export default TodoEdit;
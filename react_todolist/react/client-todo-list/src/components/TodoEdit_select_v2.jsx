import React, { Component } from 'react';
import Axios from 'axios';

class TodoEdit extends Component {
    state = {
        yesNo: "0",
        todoItem: { todoTableId: 3, title: "Job C", isComplete: true }
    }

    async componentDidMount() {
        var url = `http://localhost:8000/todo/item/${this.props.match.params.id}`;
        var result = await Axios.get(url);
        this.state.todoItem = result.data;
        this.state.yesNo = this.state.todoItem.isComplete ? "1" : "0";
        this.setState({});
    }

    okButtonClick = async () => {
        // console.log(this.state.todoItem);
        this.state.todoItem.isComplete = (this.state.yesNo === "1") ? true : false;
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

    yesNoChange = (e) => {
        this.setState({ yesNo: e.target.value });
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
                                    <select value={this.state.yesNo}
                                        onChange={this.yesNoChange}
                                        id="isComplete" name="isComplete" className="custom-select">
                                        <option value="0">not yet</option>
                                        <option value="1">done</option>
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
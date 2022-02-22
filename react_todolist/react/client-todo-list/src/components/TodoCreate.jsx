import React, { Component } from 'react';
import Axios from 'axios';

class TodoCreate extends Component {
    state = {
        todoItem: { todoTableId: 999, title: "", isComplete: false }
    }

    titleChange = (e) => {
        var newState = { ...this.state };
        newState.todoItem.title = e.target.value;
        this.setState(newState);
    }

    isCompleteChange = (e) => {
        var newState = { ...this.state };
        newState.todoItem.isComplete = e.target.checked;
        this.setState(newState);
    }

    okButtonClick = async () => {
        await Axios.post("http://localhost:8000/todo/create", this.state.todoItem);
        window.location = "/Todo/Index";
    }

    render() {
        return (


            <div className="container">

                <h1>待辦事項清單 - 新增</h1>
                <hr />
                <div className="row">
                    <div className="col-md-4">
                        <form action="/Todo/Create" method="post">

                            <div className="form-group">
                                <label className="control-label" htmlFor="Name">項目名稱</label>
                                <input className="form-control" type="text" id="Name"
                                    name="Name"
                                    onChange={this.titleChange}
                                    value={this.state.todoItem.title} />
                            </div>
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" id="IsComplete"
                                        checked={this.state.todoItem.isComplete}
                                        onChange={this.isCompleteChange}
                                        name="IsComplete" value="1" /> 是否已完工
                                </label>
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

export default TodoCreate;
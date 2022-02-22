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
                            <div className="form-group form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox"
                                        id="IsComplete" name="IsComplete"
                                        checked={this.state.todoItem.isComplete}
                                        onChange=
                                        {
                                            (e) => {
                                                var newState = { ...this.state };
                                                newState.todoItem.isComplete = e.target.checked;
                                                this.setState(newState);
                                                // this.state.todoItem.isComplete = e.target.checked; 
                                                // this.setState({}) 
                                            }
                                        }
                                        value="true" /> 是否已完工
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

export default TodoEdit;
import React, { Component } from 'react';
import Axios from 'axios';

class TodoIndex extends Component {
    state = {
        todoList: [
            { todoTableId: 1, title: "Job A", isComplete: true },
            { todoTableId: 2, title: "Job B", isComplete: false },
            { todoTableId: 3, title: "Job C", isComplete: true }
        ]
    }

    async componentDidMount() {
        var result = await Axios.get("http://localhost:8000/todo/list");
        // this.state.todoList = result.data;
        // this.setState({});
        this.setState({
            todoList: result.data
        })
    }

    render() {
        return (
            <div className="container">

                <h1>
                    待辦事項清單 {this.state.todoList.length}
                    <a href="/Todo/Create" className="btn btn-outline-success btn-md float-right">
                        新增
                    </a>
                </h1>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>
                                項目名稱
                            </th>
                            <th>
                                是否已完工
                            </th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            this.state.todoList.map((item, index) =>

                                <tr key={index}>
                                    <td>
                                        {item.title}
                                    </td>
                                    <td>
                                        <input className="check-box" disabled="disabled"
                                            type="checkbox" checked={item.isComplete} />
                                    </td>
                                    <td>
                                        <span className="float-right">
                                            <a href={`/Todo/Edit/${item.todoTableId}`} className="btn btn-outline-primary btn-sm">編輯</a> |
                                            <a href={`/Todo/Delete/${item.todoTableId}`} className="btn btn-outline-danger btn-sm">刪除</a>
                                        </span>
                                    </td>
                                </tr>

                            )
                        }

                    </tbody>
                </table>



            </div>
        );
    }
}

export default TodoIndex;


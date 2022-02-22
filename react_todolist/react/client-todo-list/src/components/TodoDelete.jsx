import React, { Component } from 'react';
import Axios from 'axios';

class TodoDelete extends Component {
    state = {
        todoItem: { todoTableId: 4, title: 'Job A4', isComplete: 0 }
    }

    async componentDidMount() {
        var result = await Axios.get("http://localhost:8000/todo/item/" + this.props.match.params.id);
        this.state.todoItem = result.data;
        this.setState({});
    }

    okButtonClick = async () => {
        var url = "http://localhost:8000/todo/delete/" + this.state.todoItem.todoTableId;
        await Axios.delete(url)
        window.location = "/Todo/Index";
    }

    render() {
        return (

            <div className="container">


                <h1>待辦事項清單 - 刪除</h1>

                <hr />
                <div>
                    <dl className="row">
                        <dt className="col-sm-2">
                            項目名稱
                        </dt>
                        <dd className="col-sm-10">
                            {this.state.todoItem.title}
                        </dd>
                        <dt className="col-sm-2">
                            是否已完工
                        </dt>
                        <dd className="col-sm-10">
                            <input className="check-box" disabled="disabled"
                                checked={this.state.todoItem.isComplete}
                                type="checkbox" />
                        </dd>
                    </dl>

                    <hr />
                    <h3>確定要刪除這筆資料嗎?</h3>

                    <form action="/Todo/Delete" method="post">
                        <input type="hidden" id="TodoItemId" name="TodoItemId"
                            value="1"
                        />
                        <input type="button" onClick={this.okButtonClick} value="確定" className="btn btn-outline-danger" /> |
                        <a href="/Todo/Index" className="btn btn-outline-info">取消</a>
                    </form>
                </div>



            </div>


        );
    }
}

export default TodoDelete;
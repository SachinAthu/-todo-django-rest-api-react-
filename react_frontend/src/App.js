import React, { Component } from 'react'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: '',
        completed: false,
      },
      editing: false
    }
    // give this keywork access to fetchTasks method
    // no need for arrow functions
    //this.fetchTasks = this.fetchTasks.bind(this)
  }

  componentDidMount() {
    this.fetchTasks()
  }

  fetchTasks = () => {
    console.log('fetching...')

    const url = 'http://127.0.0.1:8000/api/task-list/'
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          todoList: data
        })
      })
  }

  submitForm = e => {
    e.preventDefault()

    const title = this.state

    let url = 'http://127.0.0.1:8000/api/task-create/'
    let method = 'POST'

    if (this.state.editing) {
      // update
      url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}/`
      method = 'PUT'
    }


    fetch(url, {
      method: method,
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ 'title': title })
    })
      .then(function (res) {
        console.log(res)
        buildList()
        form.reset()
      })
      .catch(err => console.log(err))
  }

  onChange = e => {
    const title = e.target.value
    if (title == '') return

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: title
      }
    })
  }

  edit = () => {
    this.setState({
      editing: true,
      activeItem: {
        title: ''
      }
    })
  }

  delete = () => {

  }

  render() {
    const tasks = this.state.todoList
    const {title, completed} = this.state.activeItem

    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form id="form" onSubmit={this.submitForm}>
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input id="title" className="form-control" name="title" type="text" value={title} placeholder="Add task" onChange={this.onChange} />
                </div>

                <div style={{ flex: 1 }}>
                  <input id="submit" className="btn" type="submit" />
                </div>
              </div>
            </form>
          </div>

          <div id="list-wrapper">
            {tasks.map((task, index) => {
              return (
                <div key={index} className="task-wrapper flex-wrapper">
                  <div style={{ flex: 7 }}>
                    {task.title}
                  </div>

                  <div style={{ flex: 1 }}>
                    <button class="btn btn-outline-info btn-sm edit" onClick={this.edit}>Edit</button>
                  </div>

                  <div style={{ flex: 1 }}>
                    <button class="btn btn-outline-dark btn-sm delete" onClick={this.delete}>-</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    )
  }
}

export default App;

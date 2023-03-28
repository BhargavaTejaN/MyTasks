import {Component} from 'react'
import {v4 as uniqueId} from 'uuid'
import './index.css'
import ButtonsComponent from '../ButtonsComponent'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    activeTag: tagsList[0].optionId,
    tasksList: [],
    taskInput: '',
    activeButtonId: '',
  }

  onChangeInput = event => {
    this.setState({taskInput: event.target.value})
  }

  handleOptionChange = event => {
    this.setState({activeTag: event.target.value})
  }

  clickButton = optionId => {
    this.setState({activeButtonId: optionId})
  }

  submitForm = event => {
    event.preventDefault()
    const {activeTag, taskInput} = this.state
    const Id = uniqueId()
    if (taskInput === '') {
      alert('Enter The Task!')
    } else {
      const newTask = {Id, activeTag, taskInput}
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        activeTag: '',
        taskInput: '',
      }))
    }
  }

  getFilteredList = () => {
    const {activeButtonId, tasksList} = this.state
    const filteredList = tasksList.filter(
      each => each.activeTag === activeButtonId,
    )
    return filteredList
  }

  render() {
    const {taskInput, activeTag, activeButtonId, tasksList} = this.state

    const filteredList = this.getFilteredList()

    return (
      <div className="bg-container">
        <div className="create-task">
          <h1 className="heading">Create a task</h1>
          <form onSubmit={this.submitForm} className="form-container">
            <div className="each-label">
              <label className="label" htmlFor="task">
                Task
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter the task here"
                id="task"
                value={taskInput}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="each-label">
              <label htmlFor="tagsDropdown" className="label">
                Tags
              </label>
              <select
                onChange={this.handleOptionChange}
                className="input"
                id="tagsDropdown"
                value={activeTag}
              >
                {tagsList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div className="button-container">
              <button type="submit" className="button">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="task-list">
          <h1 className="tag-heading">Tags</h1>
          <div className="buttons-list">
            {tagsList.map(each => (
              <ButtonsComponent
                clickButton={this.clickButton}
                details={each}
                key={each.optionId}
                isActive={activeButtonId === each.optionId}
              />
            ))}
          </div>
          <div className="tasks">
            <h1 className="tasks-heading">Tasks</h1>
            <div className="tasks-container">
              {tasksList.length > 0 ? (
                <div className="each-task">
                  {activeButtonId === '' ? (
                    <div>
                      {tasksList.map(each => (
                        <li key={each.Id} className="each-lits-item">
                          <p className="each-list-task">{each.taskInput}</p>
                          <p className="each-list-tag">{each.activeTag}</p>
                        </li>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {filteredList.length > 0 ? (
                        <div>
                          {filteredList.map(each => (
                            <li key={each.Id} className="each-lits-item">
                              <p className="each-list-task">{each.taskInput}</p>
                              <p className="each-list-tag">{each.activeTag}</p>
                            </li>
                          ))}
                        </div>
                      ) : (
                        <p className="no-tasks">No Tasks Added Yet</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="no-tasks">No Tasks Added Yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyTasks

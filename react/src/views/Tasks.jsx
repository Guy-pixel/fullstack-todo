import TaskCard from "../components/tasks/TaskCard.jsx";
import React from 'react';

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [[{
                id: 1, name: "task1", description: "task1description", completed: "completed"
            }, {
                id: 2, name: "task2", description: "task2description", completed: "completed"
            }, {
                id: 3, name: "task3", description: "task3description", completed: "completed"
            },]]
        }
    }

    render() {
        return (<div>
            {this.state.history[this.state.history.length - 1]
                .map((task) => {
                    return <TaskCard key={task.id} task={task}/>
                })}

        </div>)
    }
}

export default Tasks;

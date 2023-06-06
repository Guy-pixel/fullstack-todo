import React from "react";


class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [

            ]
        }
    }
    componentDidMount() {

    }

    render(props) {
        const { tasks } = this.state
        return (
            <div className="taskList">

            </div>
        )
    }
}

export default TaskCard;

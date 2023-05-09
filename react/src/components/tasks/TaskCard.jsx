import React from "react";


class TaskCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render(props) {
        return (
            <div className="taskCard">
                <div className="taskCardTitle">{this.props.task.name}</div><br/>
                {this.props.task.description}<br/>
                {this.props.task.completed}
            </div>
        )
    }
}

export default TaskCard;

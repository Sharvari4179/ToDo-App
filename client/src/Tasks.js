import { Component } from "react";
import React from "react";
import { addTask, getTasks, updateTask, deleteTask } from "./services/taskServices";

class Tasks extends Component{
    state={tasks:[], currentTask: ""}
    async componentDidMount(){
        try{
            const data = await getTasks()
            this.setState({tasks: data});
        }catch(error){
            console.log(error)
        }
    }

    handleChange = ({currentTarget: input}) =>{
        this.setState({currentTask:input.value});
    }

    handleSubmit = async(e)=>{
        e.preventDefault();
        const originalTasks = this.state.tasks
        try{
            const data = await addTask({task: this.state.currentTask})
            const tasks = originalTasks;
            tasks.push(data)
            this.setState({tasks, currentTask:""})
        }catch(error){
            console.log(error)
        }
    };

    handleUpdate = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed;
            this.setState({ tasks });
            await updateTask(currentTask, {
                completed: tasks[index].completed,
            });
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };
//     Certainly! Let's walk through an example to understand how this code works.

// Let's say we have an array of tasks in our component's state:

// ```javascript
// state = {
//   tasks: [
//     { _id: 1, title: "Complete homework", completed: false },
//     { _id: 2, title: "Go grocery shopping", completed: true },
//     { _id: 3, title: "Exercise", completed: false },
//   ],
// };
// ```

// And we want to toggle the `completed` property of a specific task, let's say the task with `_id` 2.

// We would call the `handleUpdate` function and pass in the `_id` of the task we want to update:

// ```javascript
// handleUpdate(2);
// ```

// Here's what the code would do step by step:

// 1. Create a copy of the original tasks array:
// ```javascript
// const originalTasks = [...this.state.tasks];
// ```

// 2. Create a new array called `tasks` by spreading the `originalTasks` array:
// ```javascript
// const tasks = [...originalTasks];
// ```

// 3. Find the index of the task that matches the `_id` passed in (`2` in this example):
// ```javascript
// const index = tasks.findIndex((task) => task._id === currentTask);
// ```
// In this case, the index would be `1`.

// 4. Create a shallow copy of the task at the found index:
// ```javascript
// tasks[index] = { ...tasks[index] };
// ```
// This creates a new object with the same properties as the task at index `1`.

// 5. Toggle the `completed` property of the copied task:
// ```javascript
// tasks[index].completed = !tasks[index].completed;
// ```
// If the `completed` property was `true`, it will be set to `false`, and vice versa.

// 6. Update the component's state with the modified `tasks` array:
// ```javascript
// this.setState({ tasks });
// ```
// This will trigger a re-render of the component with the updated tasks array.

// 7. Call the `updateTask` function (assuming it's an external function or API call) with the `currentTask` (in this case, `2`) and an object containing the updated `completed` property:
// ```javascript
// await updateTask(currentTask, { completed: tasks[index].completed });
// ```

// 8. If there's an error during the update process, revert the component's state back to the original tasks array:
// ```javascript
// this.setState
    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter(
                (task) => task._id !== currentTask
            );
            this.setState({ tasks });
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };
//     Suppose we have an array of tasks in our component's state:

// ```javascript
// state = {
//   tasks: [
//     { _id: 1, title: "Complete homework" },
//     { _id: 2, title: "Go grocery shopping" },
//     { _id: 3, title: "Exercise" },
//   ],
// };
// ```

// And we want to delete a specific task, let's say the task with `_id` 2.

// We would call the `handleDelete` function and pass in the `_id` of the task we want to delete:

// ```javascript
// handleDelete(2);
// ```

// Here's what the code would do step by step:

// 1. Create a reference to the original tasks array:
// ```javascript
// const originalTasks = this.state.tasks;
// ```

// 2. Use the `filter` method to create a new array called `tasks` that excludes the task with the matching `_id`:
// ```javascript
// const tasks = originalTasks.filter((task) => task._id !== currentTask);
// ```
// In this case, the task with `_id` 2 would be filtered out.

// 3. Update the component's state with the modified `tasks` array:
// ```javascript
// this.setState({ tasks });
// ```
// This will trigger a re-render of the component with the updated tasks array, where the task with `_id` 2 is removed.

// 4. Call the `deleteTask` function (assuming it's an external function or API call) with the `currentTask` (in this case, `2`):
// ```javascript
// await deleteTask(currentTask);
// ```
// This function will handle the deletion of the task from the backend or any other necessary actions.

// 5. If there's an error during the deletion process, revert the component's state back to the original tasks array:
// ```javascript
// this.setState({ tasks: originalTasks });
// ```
// This ensures that the original tasks array is restored in case of an error.

// That's how the `handleDelete` function works! It removes the specified task from the tasks array and updates the component's state accordingly.


}

export default Tasks;
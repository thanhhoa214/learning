# Todo List

Implement a todo list inspired by Apple's Notes app. You may choose any frontend framework of choice or use HTML. The todo list should closely resemble the image provided by the spec, and you are expected to style it.

## UI Spec

The todo list should follow the following UI and specs:

![image info](https://gist.githubusercontent.com/snggeng/aa3e36bfded909e31cb560bc6b6f09a9/raw/f1a7c31546b2f9c3fdff3cda3c45064155dd16ae/todolist.png)

### Title

- Has a title that can be edited on focus

### Creating new tasks

- Todo list starts with one unchecked task with empty text by default
- Add task by typing 'enter' when focused on a task. This should add a task directly below the current task
- When new tasks are created, they are always created with the default state of unchecked and empty text

### Updating tasks

- Update a task by clicking on the text of the task and updating it

### Deleting tasks

- Delete a task by typing 'back' when the task text is empty
- This removes the task from the task list
- Task list should have at least 1 task

### Checking off tasks

- Check off tasks by clicking the circle at the left of each task.
- A checked off task should display a yellow tick
- If a task is empty, it cannot be checked off
- When a task is checked off, it should automatically move to the bottom of the task list

### Searching for tasks

- Add a search bar at the top that allows you to filter the tasks as you type

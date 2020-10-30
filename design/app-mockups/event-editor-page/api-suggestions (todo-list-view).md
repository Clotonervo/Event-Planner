# Todo List View API Suggestions

## 1. `getTasks - GET`

Gets the tasks associated with an event.

```
request: {
    eventID: string,
}

response: {
    unclaimedTasks: [
        {
            taskID: string,
            title: string,
            description: string,
            assignee: undefined
        },
    ],
    inProgressTasks: [
        {
            taskID: string,
            title: string,
            description: string,
            assignee: {
                username: string,
                avatarPhotoURL: string,
                userID: string,
            }
        },
    ],
    doneTasks: [
        {
            taskID: string,
            title: string,
            description: string,
            assignee: {
                username: string,
                avatarPhotoURL: string,
                userID: string,
            }
        },
    ],
}
```

## 2. `addTask - POST`

Adds a task to an event.

```
request: {
    eventID: string,
    title: string,
    description: string,
}

response: {
    success: boolean,
    taskID: string,
}
```

## 3. `updateTask - POST`

Updates a task for an event.

```
request: {
    eventID: string,
    taskID: string,
    title: string | undefined,          // If specified, update the title of this task
    description: string | undefined,    // If specified, update the description of this task
    assigneeID: string | undefined,     // If specified, update the user who has claimed this task
    isComplete: bool | undefined,       // If specified, update whether task is complete
}

response: {
    success: boolean,
}
```

## 4. `deleteTask - POST`

Deletes a task for an event.

```
request: {
    eventID: string,
    taskID: string,
}

response: {
    success: boolean,
}
```
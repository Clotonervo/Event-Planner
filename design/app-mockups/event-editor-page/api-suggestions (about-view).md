# About View API Suggestions

## 1. `getEventDetails - GET`

Gets all details associated with an event.

```
request: {
    eventID: string,
}

response: {
    title: string,
    eventDate: string,
    description: string,
    location: {
        address: string, // E.g. 252, Peach drive blvd, Sandy Uah
    },
    invitees: [
        {
            username: string,
            avatarPhotoURL: string
        },
        {
            username: string,
            avatarPhotoURL: string
        },
        {
            username: string,
            avatarPhotoURL: string
        },
    ],
}
```

## 2. `updateEventDetails - POST`

Updates details associated with an event.

```
request: {
    title: string | undefined,          // If specified, update the title of this event
    description: string | undefined,    // If specified, update the description of this event
    location: string | undefined,       // If specified, update the location of this event
    inviteesToAdd: [                    // Users to add to the event
        inviteeID: string,
        inviteeID: string,
        inviteeID: string,
    ],
    inviteesToRemove: [                 // Users to remove from the event
        inviteeID: string,
        inviteeID: string,
    ],
}

response: {
    description: string,
    location: {
        address: string,                // E.g. 252, Peach drive blvd, Sandy Uah
    },
    invitees: [
        {
            username: string,
            avatarPhotoURL: string,
            status: "pending" | "coming" | "notGoing",
        },
        {
            username: string,
            avatarPhotoURL: string,
            status: "pending" | "coming" | "notGoing",
        },
        {
            username: string,
            avatarPhotoURL: string,
            status: "pending" | "coming" | "notGoing",
        },
    ],
}
```

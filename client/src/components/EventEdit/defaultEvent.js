export const createDefaultEvent = () => {
  let event = {
    eventID: "",
    eventName: "",
    location: "",
    collaborators: [],
    viewers: [],
    date: "",
    displayDate: "",
    description: "",
    past: false,
    color: "#8be4d2"
  };
  return event;
};

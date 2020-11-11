export const createDefaultEvent = () => {
  let event = {
    eventID: "",
    title: "",
    location: {
      address: ""
    },
    collaborators: [],
    viewers: [],
    date: {
      startDate: new Date(),
      displayDate: ""
    },
    description: "",
    past: false,
    color: "#8be4d2"
  };
  return event;
};

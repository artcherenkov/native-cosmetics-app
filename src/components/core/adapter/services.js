export const adaptServicesToClient = (data) => {
  const {
    full_cost: fullCost,
    number_of_clients: numberOfClients,
    event_list: eventList,
  } = data;

  const adaptedEventList = eventList.reduce((acc, item) => {
    const { client, seance_length: seanceLength, cost, time, services } = item;
    acc = [...acc, {
      clientName: client.name,
      duration: seanceLength / 60,
      cost: cost,
      begin: time,
      services: services.map(service => service.title),
    }];
    return acc;
  }, []);

  return { fullCost, numberOfClients, events: adaptedEventList };
};

export function transitionTo(route) {
  return {
    type: 'RECEIVE_RECENT_ROUTE',
    route,
  };
}

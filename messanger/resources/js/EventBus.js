const eventBus = {
  events: {},

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  },

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(data));
    }
  },

  removeAllListeners(event) {
    if (this.events[event]) {
      delete this.events[event];
    }
  }
};

export default eventBus;

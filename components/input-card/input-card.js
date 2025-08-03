Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    value: {
      type: String,
      value: ''
    },
    progress: {
      type: String,
      value: ''
    }
  },

  data: {
    inputValue: ''
  },

  lifetimes: {
    attached() {
      this.setData({
        inputValue: this.properties.value
      });
    }
  },

  methods: {
    onInput(e) {
      const value = e.detail.value;
      this.setData({
        inputValue: value
      });
      this.triggerEvent('input', { value });
    },

    onConfirm(e) {
      const value = e.detail.value;
      this.triggerEvent('confirm', { value });
    }
  }
}); 
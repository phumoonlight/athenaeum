export default {
  beforeUpdate(event) {
    console.log('Before create lifecycle event triggered');
  },
  afterUpdate(event) {
    console.log('After create lifecycle event triggered');
  },
};
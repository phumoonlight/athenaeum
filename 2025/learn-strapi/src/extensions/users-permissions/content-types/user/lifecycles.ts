console.log('huhxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');



export default {
  afterCreate(event) {
    console.log('afterCreate');
  },
  beforeUpdate(event) {
    console.log('Before create lifecycle event triggered');
  },
  afterUpdate(event) {
    console.log('After create lifecycle event triggered');
  },
};
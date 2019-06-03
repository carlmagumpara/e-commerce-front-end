const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'CART':
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
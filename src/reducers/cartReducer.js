const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'CART':
      return action.payload;
    case 'ADD_TO_CART':
      const newState = state.slice();
      
      let payload = action.payload;


      let result = newState.filter(el => el.product_id === payload.product_id);

      
      if (result.length !== 0) {
        newState[newState.indexOf(result[0])].total += 1;
      } else {
        payload.total = 1;
        newState.push(payload);
      }

      return newState;
    case 'INCREMENT':
      return state;
    default:
      return state;
  }
};

export default cartReducer;
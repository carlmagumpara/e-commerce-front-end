const cartReducer = (state = [], action) => {
  let newState = [...state];
  switch (action.type) {
    case 'ADD_TO_CART':
      let payload = action.payload;
      let productArray = newState.filter(el => el.product_id === payload.product_id);
      if (productArray.length !== 0) {
        newState[newState.indexOf(productArray[0])].total += 1;
      } else {
        payload.total = 1;
        newState.push(payload);
      }
      return newState;
    case 'REMOVE':
      newState.splice(newState.indexOf(action.payload), 1);
      return newState;
    case 'INCREMENT':
      let product = newState.filter(el => el.product_id === action.payload.product.product_id);
      newState[state.indexOf(product[0])].total = action.payload.count;
      return newState;
    default:
      return state;
  }
};

export default cartReducer;
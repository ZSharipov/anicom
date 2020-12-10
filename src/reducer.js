
const reducer = (state, action) => {
  switch (action.type) {
    case "setProducts":
      return { ...state, products: action.payload }
    case "setTabs":
      return { ...state, tabs: action.payload }
    case "hiddenAddProduct":
      return { ...state, hiddenAddProduct: action.payload }
    case "activeTab":
      return { ...state, activeTab: action.payload }
    default:
      return state;
  }
};
export default reducer;

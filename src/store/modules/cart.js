export default {
  namespaced: true,
  state() {
    return {
      items:[],
      total:0,
      qty:0
    };
  },
  mutations: {
    ADD_TO_CART(state,payload) {
      const produtcData = payload
      const productIndex = state.items.findIndex(res => res.id === produtcData.id)
      if(productIndex >= 0) {
        state.items[productIndex].qty++
      }
      else {
        const cartData = {
          id:produtcData.id,
          image:produtcData.image,
          title:produtcData.title,
          price:produtcData.price,
          description:produtcData.description,
          qty:1,
        }
        state.items.push(cartData)
        state.qty++;
      }
      state.total += produtcData.price;
    },
    CART_ITEM_REMOVE(state, payload) {
      const prodId = payload.id;
      const productInCartIndex = state.items.findIndex(
        (cartItem) => cartItem.id === prodId
      );
      const prodData = state.items[productInCartIndex];
      state.items.splice(productInCartIndex, 1);
      state.qty--;
      state.total -= prodData.price * prodData.qty;
    },
 
  
  },
  actions: {
    addToCart(context,payload) {
      const productId = payload.id
      const products = context.rootGetters['prods/products']
      const product = products.find(res => res.id == productId)
      context.commit('ADD_TO_CART',product)
    },
    cartItemRemove(context,payload) {
      context.commit('CART_ITEM_REMOVE',payload)
    }
  },
  getters: {
    cartItems(state) {
      return state.items
    },
    cartQty(state) {
      return state.qty
    },
    cartTotal(state) {
      return state.total
    },

  }
};

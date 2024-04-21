import {
  createStore
} from 'vuex';
// 导入购物车的 vuex 模块
import moduleCart from './cart.js';
// 导入用户的 vuex 模块
import moduleUser from './user.js'

// 1. 创建 Store 的实例对象
const store = createStore({
  // TODO：挂载 store 模块
  modules: {
    // 2. 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为 m_cart，例如：
    //    购物车模块中 cart 数组的访问路径是 m_cart/cart
    m_cart: moduleCart,
    // 挂载用户的 vuex 模块，访问路径为 m_user
    m_user: moduleUser,
  },
});

// 2. 导出 Store 的实例对象
export default store;
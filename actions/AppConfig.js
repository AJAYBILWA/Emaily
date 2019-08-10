export const APP_CONFIG_SET = "APP_CONFIG_SET";
export const appConfigSet = data => ({
  type: APP_CONFIG_SET,
  data,
});

// export const INIT = 'APP_INIT'
// export const init = () => dispatch =>
//         dispatch(User.me())
//             .then(userRes => Promise.all([
//                 ]).then(data => Promise.resolve([...data])), err => {
//                     return Promise.reject(err)
//                 })
//
// export const reload = () => dispatch => {
//   return Promise.all([
//   ]).then(() => dispatch(
//     loaded()
//   )).catch(err => Promise.reject(err))
// }

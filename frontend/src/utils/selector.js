import { createSelector } from "reselect";

export const getUser = (state) => state.user;
export const getLoginUserData = createSelector([getUser], (user) => {
  return user.value;
});

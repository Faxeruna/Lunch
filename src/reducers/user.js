const initialState = [
  localStorage.setItem("user1@mail.ru", "test"),
  localStorage.setItem("user2@bk.ru", "test"),
  localStorage.setItem("user3@inbox.ru", "test"),
  localStorage.setItem("user4@gmail.com", "test"),
  localStorage.setItem("admin@list.ru", "secretKey")
];

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, auth: action.payload };
    default:
      return state;
  }
}

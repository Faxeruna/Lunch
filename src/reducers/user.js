const initialState = [
  { email: "user1@mail.ru", password: "test" },
  { email: "user2@bk.ru", password: "test" },
  { email: "user3@inbox.ru", password: "test" },
  { email: "user4@gmail.com", password: "test" },
  { email: "admin@list.ru", password: "secretKey" }
];

export function userReducer(state = initialState) {
  return state;
}

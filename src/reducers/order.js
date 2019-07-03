const initialState = [
  {
    id: "0",
    date: "10.10.2019",
    state: "new",
    city: "Москва",
    number: "201",
    ordercontent: [
      { name: "Кофе", kol: "25" },
      { name: "Чай", kol: "21" },
      { name: "Печенье", kol: "4" },
      { name: "Зефир", kol: "3" },
      { name: "Сахар", kol: "2" }
    ]
  },
  {
    id: "1",
    date: "04.10.2019",
    state: "new",
    city: "Ульяновск",
    number: "534",
    ordercontent: [
      { name: "Кофе", kol: "19" },
      { name: "Чай", kol: "21" },
      { name: "Печенье", kol: "4" },
      { name: "Зефир", kol: "3" },
      { name: "Сахар", kol: "2" }
    ]
  },
  {
    id: "2",
    date: "03.10.2019",
    state: "processing",
    city: "Москва",
    number: "101",
    ordercontent: [
      { name: "Кофе", kol: "5" },
      { name: "Чай", kol: "21" },
      { name: "Печенье", kol: "4" },
      { name: "Зефир", kol: "3" },
      { name: "Сахар", kol: "2" }
    ]
  },
  {
    id: "3",
    date: "22.10.2019",
    state: "done",
    city: "Вашингтон",
    number: "323",
    ordercontent: [
      { name: "Кофе", kol: "7" },
      { name: "Чай", kol: "21" },
      { name: "Печенье", kol: "4" },
      { name: "Зефир", kol: "3" },
      { name: "Сахар", kol: "2" }
    ]
  },
  {
    id: "4",
    date: "21.10.2019",
    state: "processing",
    city: "Москва",
    number: "323",
    ordercontent: [
      { name: "Кофе", kol: "5" },
      { name: "Чай", kol: "21" },
      { name: "Печенье", kol: "4" },
      { name: "Зефир", kol: "3" },
      { name: "Сахар", kol: "2" }
    ]
  },
  {
    id: "5",
    date: "31.10.2019",
    state: "done",
    city: "Вашингтон",
    number: "231",
    ordercontent: [
      { name: "Кофе", kol: "9" },
      { name: "Чай", kol: "21" },
      { name: "Печенье", kol: "4" },
      { name: "Зефир", kol: "3" },
      { name: "Сахар", kol: "2" }
    ]
  },
  {
    id: "6",
    date: "23.10.2019",
    state: "cancelled",
    city: "Ульяновск",
    number: "354",
    ordercontent: [
      { name: "Кофе", kol: "2" },
      { name: "Чай", kol: "21" },
      { name: "Печенье", kol: "4" },
      { name: "Зефир", kol: "3" },
      { name: "Сахар", kol: "2" }
    ]
  },
  {
    id: "7",
    date: "17.10.2019",
    state: "done",
    city: "Москва",
    number: "402",
    ordercontent: [
      { name: "Кофе", kol: "1" },
      { name: "Чай", kol: "21" },
      { name: "Печенье", kol: "4" },
      { name: "Зефир", kol: "3" },
      { name: "Сахар", kol: "2" }
    ]
  }
];

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ORDER":
      return { ...state, order: action.payload };
    default:
      return state;
  }
}

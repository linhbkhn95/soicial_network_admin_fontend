import { models } from "data-generator";

const initialState = {
  fleets: {
    [models.fleet.type]: [
      {
        label: "Cá nhân",
        value: 1,
      },
      {
        label: "Doanh nghiệp",
        value: 2,
      },
    ],
  },
};

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {
    default:
      return state;
  }
};

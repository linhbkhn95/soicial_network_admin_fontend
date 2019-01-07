import {
  // ACTION_SAVE_LOGGED_USER,
  ACTION_REMOVE_IDENTITY,
  ACTION_SAVE_REFRESH_TOKEN,
  ACTION_UPDATE_TOKENS,
  ACTION_UPDATE_IDENTITY,
  ACTION_SAVE_PERMISSION,
} from '../constants';

/*
 * The reducer takes care of state changes in our app through actions
 */

// The initial application state, we need to store it in localStorage for later reload
// this is called static, later all state will be re-hydrate, but first time we need to know
// if this user is logged before
export const initialState = {
  tokens: {
    refresh_token: null,
    access_token: null,
  },
  identity: null, // user information
};

// Takes care of changing the application state
// state is previous state,
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_UPDATE_TOKENS:
      return {
        ...state,
        tokens: {
          ...state.tokens,
          refresh_token: payload.refresh_token
            ? payload.refresh_token
            : state.tokens.refresh_token,
          access_token: payload.access_token,
        },
      };
    case ACTION_UPDATE_IDENTITY:
      return {
        ...state,
        identity: payload,
      };

    case ACTION_REMOVE_IDENTITY:
      return {
        ...state,
        tokens: {
          refresh_token: null,
          access_token: null,
        },
        identity: null,
      };

    // case ACTION_SAVE_LOGGED_USER:
    //   return {
    // ...state,
    // ...payload
    // // token_expires_at: payload.token_expires_in * 60000 + Date.now()
    //   }; // {user,token}

    // case ACTION_REMOVE_IDENTITY:
    //   // remove only customer and remain language for saving spaces?
    //   return {
    // ...state,
    // customer: { language: state.customer.language }
    //   };

    case ACTION_SAVE_REFRESH_TOKEN:
      // payload is access token
      return {
        ...state,
        // ...payload
        tokens: {
          refresh_token: state.tokens.refresh_token,
          access_token: payload.access_token,
        },
        // token_expires_at: payload.token_expires_in * 60000 + Date.now()
      };

    case ACTION_SAVE_PERMISSION:
      return {
        ...state,
        permissions: payload.permissions,
      };

    // optimizing ...

    case 'app/setLanguage':
      return {
        ...state,
        customer: { ...state.customer, language: payload },
      };
    case 'app/updateConfig':
      return {
        ...state,
        config: { ...state.config, [payload.key]: payload.value },
      };
    case 'app/updateFilters':
      return { ...state, filters: { ...state.config, ...payload } };
    default:
      return state;
  }
};

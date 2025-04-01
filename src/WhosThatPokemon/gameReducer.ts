// Define the state interface
export interface GameState {
  score: number;
  health: number;
  streak: number;
  lastScoreIncrease: number; // Track the last score increase amount
}

// Define action types
export enum GameActionType {
  INCREASE_SCORE = "INCREASE_SCORE",
  DECREASE_SCORE = "DECREASE_SCORE",
  INCREASE_HEALTH = "INCREASE_HEALTH",
  DECREASE_HEALTH = "DECREASE_HEALTH",
  INCREASE_STREAK = "INCREASE_STREAK",
  RESET_STREAK = "RESET_STREAK",
  RESET_GAME = "RESET_GAME",
  RESET_SCORE_INCREASE = "RESET_SCORE_INCREASE",
}

// Define action interfaces
interface IncreaseScoreAction {
  type: GameActionType.INCREASE_SCORE;
  payload: number; // Amount to increase
}

interface DecreaseScoreAction {
  type: GameActionType.DECREASE_SCORE;
  payload: number; // Amount to decrease
}

interface IncreaseHealthAction {
  type: GameActionType.INCREASE_HEALTH;
  payload: number; // Amount to increase
}

interface DecreaseHealthAction {
  type: GameActionType.DECREASE_HEALTH;
  payload: number; // Amount to decrease
}

interface IncreaseStreakAction {
  type: GameActionType.INCREASE_STREAK;
  payload: number; // Amount to increase
}

interface ResetStreakAction {
  type: GameActionType.RESET_STREAK;
}

interface ResetGameAction {
  type: GameActionType.RESET_GAME;
  payload?: Partial<GameState>; // Optional initial values
}

interface ResetScoreIncreaseAction {
  type: GameActionType.RESET_SCORE_INCREASE;
}

// Union type for all possible actions
export type GameAction =
  | IncreaseScoreAction
  | DecreaseScoreAction
  | IncreaseHealthAction
  | DecreaseHealthAction
  | IncreaseStreakAction
  | ResetStreakAction
  | ResetGameAction
  | ResetScoreIncreaseAction;

// Initial state
export const initialGameState: GameState = {
  score: 0,
  health: 5,
  streak: 0,
  lastScoreIncrease: 0,
};

// Reducer function
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GameActionType.INCREASE_SCORE:
      return {
        ...state,
        score: state.score + action.payload,
        lastScoreIncrease: action.payload,
      };

    case GameActionType.DECREASE_SCORE:
      return {
        ...state,
        score: Math.max(0, state.score - action.payload), // Prevent negative score
        lastScoreIncrease: 0, // Reset last score increase
      };

    case GameActionType.INCREASE_HEALTH:
      return {
        ...state,
        health: state.health + action.payload,
      };

    case GameActionType.DECREASE_HEALTH:
      return {
        ...state,
        health: Math.max(0, state.health - action.payload), // Prevent negative health
      };

    case GameActionType.INCREASE_STREAK:
      return {
        ...state,
        streak: state.streak + action.payload,
      };

    case GameActionType.RESET_STREAK:
      return {
        ...state,
        streak: 0,
      };

    case GameActionType.RESET_GAME:
      return {
        ...initialGameState,
        ...action.payload, // Allow overriding initial values
        lastScoreIncrease: 0, // Reset last score increase
      };

    case GameActionType.RESET_SCORE_INCREASE:
      return {
        ...state,
        lastScoreIncrease: 0,
      };

    default:
      return state;
  }
}

// Action creators
export const increaseScore = (amount: number = 1): IncreaseScoreAction => ({
  type: GameActionType.INCREASE_SCORE,
  payload: amount,
});

export const decreaseScore = (amount: number = 1): DecreaseScoreAction => ({
  type: GameActionType.DECREASE_SCORE,
  payload: amount,
});

export const increaseHealth = (amount: number = 1): IncreaseHealthAction => ({
  type: GameActionType.INCREASE_HEALTH,
  payload: amount,
});

export const decreaseHealth = (amount: number = 1): DecreaseHealthAction => ({
  type: GameActionType.DECREASE_HEALTH,
  payload: amount,
});

export const increaseStreak = (amount: number = 1): IncreaseStreakAction => ({
  type: GameActionType.INCREASE_STREAK,
  payload: amount,
});

export const resetStreak = (): ResetStreakAction => ({
  type: GameActionType.RESET_STREAK,
});

export const resetGame = (initialValues?: Partial<GameState>): ResetGameAction => ({
  type: GameActionType.RESET_GAME,
  payload: initialValues,
});

export const resetScoreIncrease = (): ResetScoreIncreaseAction => ({
  type: GameActionType.RESET_SCORE_INCREASE,
});

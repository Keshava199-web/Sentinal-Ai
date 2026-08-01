/**
 * Generic synchronous action handler.
 */
export type ActionHandler<T> = (
  item: T,
) => void;

/**
 * Generic asynchronous action handler.
 */
export type AsyncActionHandler<T> = (
  item: T,
) => Promise<void>;
/**
 * Generic callback for entity actions.
 */
export type ActionHandler<T> = (
  item: T,
) => void;
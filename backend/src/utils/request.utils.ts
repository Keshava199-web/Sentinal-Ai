export const requireRouteParam = (
  value: string | string[] | undefined,
  name: string,
): string => {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing or invalid route parameter: ${name}`);
  }

  return value;
};
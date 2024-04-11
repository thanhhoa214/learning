export function stringifyItem<T extends { description?: string }>(item: T): T {
  const { description = '' } = item;

  return {
    ...item,
    description: JSON.stringify(description),
  };
}
export function parseItem<T extends { description?: string }>(item: T): T {
  const { description = '' } = item;

  try {
    return {
      ...item,
      description: JSON.parse(description),
    };
  } catch {
    console.log('Parse Error here!');
    return {
      ...item,
    };
  }
}

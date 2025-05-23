export function getItem(key, storage = localStorage) {
  const localData = storage.getItem(key);
  try {
    return JSON.parse(localData ?? "");
  } catch {
    return undefined;
  }
}

export function setItem(key, data, storage = localStorage) {
  return storage.setItem(key, JSON.stringify(data ?? ""));
}

export function removeItem(key, storage = localStorage) {
  storage.removeItem(key);
}

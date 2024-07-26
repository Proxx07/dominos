function stringIsArray(str: string) {
  try {
    return new Function(`return Array.isArray(${str})`)();
  } catch {
    return false;
  }
}

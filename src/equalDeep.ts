const isObjectLike = (value: any) => typeof value === 'object' && value !== null && !Array.isArray(value);

const equalDeep = (
  valueA: any,
  valueB: any
): boolean => {
  if (valueA === valueB) return true;

  if (Number.isNaN(valueA) && Number.isNaN(valueB)) return true;

  if (
    (typeof valueA !== typeof valueB) &&
    !(isObjectLike(valueA) && isObjectLike(valueB))
  ) return false;

  if (
    Array.isArray(valueA) &&
    Array.isArray(valueB) &&
    valueA.length === valueB.length
  ) return valueA.every((item: any, index: number) => equalDeep(item, valueB[index]));

  if (isObjectLike(valueA)) {
    const valueA_ = { ...valueA };
    const valueB_ = { ...valueB };

    return Object.keys(valueA_).every(key => equalDeep(valueA_[key], valueB_[key]));
  }

  return false;
};

export default equalDeep;

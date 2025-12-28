export const is5k = (distanceMiles: number): boolean => {
  return distanceMiles >= 3.0 && distanceMiles < 3.2;
};

export const is10k = (distanceMiles: number): boolean => {
  return distanceMiles >= 6.0 && distanceMiles < 6.4;
};

export const is10miler = (distanceMiles: number): boolean => {
  return distanceMiles >= 9.8 && distanceMiles < 10.2;
};

export const isHalfMarathon = (distanceMiles: number): boolean => {
  return distanceMiles >= 12.9 && distanceMiles < 13.5;
};

export const is25k = (distanceMiles: number): boolean => {
  return distanceMiles >= 3 * 5 && distanceMiles < 3.2 * 5;
};

export const isMarathon = (distanceMiles: number): boolean => {
  return distanceMiles >= 25.9 && distanceMiles < 27;
};

export const is50k = (distanceMiles: number): boolean => {
  return distanceMiles >= 30 && distanceMiles < 35;
};

export const is50miler = (distanceMiles: number): boolean => {
  return distanceMiles >= 49 && distanceMiles < 55;
};

export const is100miler = (distanceMiles: number): boolean => {
  return distanceMiles >= 99 && distanceMiles < 110;
};

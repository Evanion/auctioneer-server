import { Request } from 'express';
import { countries } from '../values/countries';

const INT_CODE = 'int';
export const marketResolver = (req: Request, code: string) => {
  const header = countries.find(
    (country) => country.code === req.headers['auc-market'],
  );
  if (header) return header.active ? header.code : header.fallback;

  const found = countries.find((country) => country.code === code);
  if (!found) return INT_CODE;

  return found.active ? found.code : found.fallback || INT_CODE;
};

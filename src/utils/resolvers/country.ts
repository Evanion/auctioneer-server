import { Request } from 'express';
import { countries } from '../values/countries';

const INT_CODE = 'int';

export const countryResolver = (req: Request) => {
  const header = req.headers['cf-ipcountry'] || '';
  if (!header) return INT_CODE;

  const found = countries.find((country) => country.code === header);
  if (!found) return INT_CODE;

  return found.code;
};

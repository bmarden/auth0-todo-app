import type { NextApiRequest, NextApiResponse } from 'next';
import type { TodosRecord, ApiError } from '@/types/airtable';
import { table, minifyRecords } from '@/api/utils/Airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodosRecord[] | ApiError>
) {
  try {
    const records = await table.select({}).firstPage();
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
}

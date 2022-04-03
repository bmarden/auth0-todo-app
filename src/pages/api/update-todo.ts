import type { NextApiRequest, NextApiResponse } from 'next';
import type { TodosRecord, ApiError } from '@/types/airtable';
import { getMinifiedRecord, table } from '@/api/utils/Airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodosRecord | ApiError>
) {
  const { id, fields } = req.body;

  try {
    const updatedRecord = await table.update([{ id, fields }]);

    res.statusCode = 200;
    res.json(getMinifiedRecord(updatedRecord[0]));
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
}

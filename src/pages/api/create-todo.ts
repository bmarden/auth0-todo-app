import type { NextApiRequest, NextApiResponse } from 'next';
import type { TodosRecord, ApiError } from '@/types/airtable';
import { table } from '@/api/utils/Airtable';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodosRecord | ApiError>
) {
  const { description } = req.body;

  try {
    const createdRecords = await table.create([{ fields: { description } }]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields
    }

    res.statusCode = 200;
    res.json(createdRecord);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
}

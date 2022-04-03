import Airtable, { Records, Record } from 'airtable';
import type { Fields, TodosRecord } from '@/types/airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base<Fields>(process.env.AIRTABLE_TABLE_NAME);

const minifyRecords = (records: Records<Fields>) => {
  return records.map((record) => getMinifiedRecord(record));
};

const getMinifiedRecord = (record: Record<Fields>): TodosRecord => {
  if (!record.fields.completed) {
    record.fields.completed = false;
  }

  return {
    id: record.id,
    fields: record.fields,
  };
};

export { table, getMinifiedRecord, minifyRecords };

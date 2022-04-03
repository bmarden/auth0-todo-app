import { FieldSet } from "airtable";

export interface Fields extends FieldSet {
  description: string;
  completed: boolean;
}

export interface TodosRecord {
  id: string;
  fields: Fields
}

export interface ApiError {
  msg: string;
}
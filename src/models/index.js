// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Report, Users } = initSchema(schema);

export {
  Report,
  Users
};
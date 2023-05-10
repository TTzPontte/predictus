// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ReportStatus = {
  "PROCESSING": "PROCESSING",
  "SUCCESS": "SUCCESS",
  "ERROR_SERASA": "ERROR_SERASA",
  "ERROR_PIPEFY": "ERROR_PIPEFY"
};

const ClientType = {
  "PF": "PF",
  "PJ": "PJ"
};

const { Report } = initSchema(schema);

export {
  Report,
  ReportStatus,
  ClientType
};
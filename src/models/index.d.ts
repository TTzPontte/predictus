import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum ReportStatus {
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS",
  ERROR_SERASA = "ERROR_SERASA",
  ERROR_PIPEFY = "ERROR_PIPEFY"
}

export enum ClientType {
  PF = "PF",
  PJ = "PJ"
}



type EagerReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Report, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly documentNumber?: string | null;
  readonly pipefyId?: string | null;
  readonly type?: ClientType | keyof typeof ClientType | null;
  readonly status?: ReportStatus | keyof typeof ReportStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Report, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly documentNumber?: string | null;
  readonly pipefyId?: string | null;
  readonly type?: ClientType | keyof typeof ClientType | null;
  readonly status?: ReportStatus | keyof typeof ReportStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Report = LazyLoading extends LazyLoadingDisabled ? EagerReport : LazyReport

export declare const Report: (new (init: ModelInit<Report>) => Report) & {
  copyOf(source: Report, mutator: (draft: MutableModel<Report>) => MutableModel<Report> | void): Report;
}
import { registerEnumType } from '@nestjs/graphql';

export enum CardReader {
  class1 = 'class1',
  class2 = 'class2',
}

registerEnumType(CardReader, {
  name: 'CardReader',
});

export enum CollectStatus {
  pending = 'pending',
  failed = 'failed',
  complete = 'complete',
}

registerEnumType(CollectStatus, {
  name: 'CollectStatus',
});

type Requirement = {
  cardReader?: CardReader;
  certificatePolicies?: string[];
  issuerCn?: string;
  autoStartTokenRequired?: boolean;
  allowFingerprint?: boolean;
};

export interface BankIDAuthPayload {
  personalNumber?: string;
  endUserIp?: string;
  requirement?: Requirement;
}

export interface BankIDSignPayload extends BankIDAuthPayload {
  userVisibleData: string;
  userNonVisibleData?: string;
}

export interface BankIDAuthResponse {
  autoStartToken: string;
  orderRef: string;
}

export interface BankIDRawCompletionData {
  user: {
    personalNumber: string;
    name: string;
    givenName: string;
    surname: string;
  };
  device: {
    ipAddress: string;
  };
  cert: {
    notBefore: Date;
    notAfter: Date;
  };
  signature: string;
  ocspResponse: string;
}

export interface BankIDCollectResponse {
  orderRef: string;
  status: CollectStatus;
  hintCode?: string;
  completionData?: BankIDRawCompletionData;
}

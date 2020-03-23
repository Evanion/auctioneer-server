import { Inject, Injectable, HttpService } from '@nestjs/common';
import {
  BankIDAuthPayload,
  BankIDAuthResponse,
  BankIDSignPayload,
  BankIDCollectResponse,
} from './interfaces/bankid.interfaces';

const bankidurl = 'https://appapi2.test.bankid.com/rp/v5';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

@Injectable()
export class BankIDService {
  @Inject() private readonly httpService: HttpService;

  public async auth(payload: BankIDAuthPayload) {
    return this.httpService
      .post<BankIDAuthResponse>(`${bankidurl}/auth`, payload, config)
      .toPromise();
  }
  public async sign(payload: BankIDSignPayload) {
    return this.httpService
      .post<BankIDAuthResponse>(`${bankidurl}/sign`, payload, config)
      .toPromise();
  }
  public collect(orderRef: string) {
    console.log('test OrderRef', orderRef);
    return this.httpService.post<BankIDCollectResponse>(
      `${bankidurl}/collect`,
      { orderRef },
      config,
    );
  }
  public async cancel(orderRef: string) {
    return this.httpService
      .post(`${bankidurl}/collect`, { orderRef }, config)
      .toPromise();
  }
}

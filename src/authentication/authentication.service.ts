import { Injectable } from '@nestjs/common';
import { BankIDService } from '../bankid/bankid.service';
import { Inject } from '@nestjs/common';
import { BankIDAuthInput } from './dto/bankidAuth.input';
import { BankIDAuthResponse } from '../bankid/interfaces/bankid.interfaces';
import { luhn } from '../utils/validation/luhn';

@Injectable()
export class AuthenticationService {
  @Inject() private readonly bankidService: BankIDService;

  async bankidAuth(
    payload: BankIDAuthInput,
    endUserIp: string,
  ): Promise<BankIDAuthResponse> {
    try {
      const { personalNumber } = payload;
      console.log('personalNumber', personalNumber);
      const { data } = await this.bankidService.auth({
        personalNumber: personalNumber ? personalNumber : undefined,
        endUserIp,
      });

      return data;
    } catch (e) {
      console.log('Auth Service Error', e);
    }
  }
}

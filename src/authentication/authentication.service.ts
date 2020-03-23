import { Injectable } from '@nestjs/common';
import { BankIDService } from '../bankid/bankid.service';
import { Inject } from '@nestjs/common';
import { BankIDAuthInput } from './dto/bankidAuth.input';
import { BankIDAuthResponse } from 'src/bankid/interfaces/bankid.interfaces';
import { luhn } from 'src/utils/validation/luhn';

@Injectable()
export class AuthenticationService {
  @Inject() private readonly bankidService: BankIDService;

  async bankidAuth(
    payload: BankIDAuthInput,
    endUserIp: string,
  ): Promise<BankIDAuthResponse> {
    try {
      const { personalNumber } = payload;
      const { data } = await this.bankidService.auth({
        personalNumber:
          personalNumber && luhn(personalNumber) ? personalNumber : undefined,
        endUserIp,
      });

      return data;
    } catch (e) {
      console.log('Auth Service Error', e);
    }
  }
}

import { Module, HttpModule } from '@nestjs/common';
import { Agent } from 'https';
import { readFileSync } from 'fs';
import { BankIDService } from './bankid.service';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new Agent({
        ca: readFileSync('./bankid.cer'),
        pfx: readFileSync('./FPTestcert2_20150818_102329.pfx'),
        passphrase: 'qwerty123',
      }),
    }),
  ],
  providers: [BankIDService],
  exports: [BankIDService],
})
export class BankIDModule {}

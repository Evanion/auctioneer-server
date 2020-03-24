import { Module } from '@nestjs/common';
import { TestResolver } from './test.resolver';
import { TestService } from './test.service';
import { CommonModule } from '../common/common.module';

@Module({
  providers: [TestResolver, TestService],
  imports: [CommonModule],
})
export class TestModule {}

/*
 * ZeaZChain API Server
 * Author: ZeaZDev Meta-Intelligence
 * World ID ZKP Verification Service.
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';

import { VerifyWorldIdDto } from './dto/verify-world-id.dto';
import { EnvVars } from '../../config';

export interface WorldIdVerificationResult {
  success: boolean;
  signal: string;
  nullifier_hash: string;
  credential_type: string;
  proof: unknown;
}

@Injectable()
export class WorldIDService {
  private worldIdAppId: string;
  private worldIdAction: string;
  private worldIdApiKey: string;
  private worldIdSignalNamespace: string;

  constructor(
    private readonly configService: ConfigService<EnvVars>,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(WorldIDService.name);
    this.worldIdAppId = this.configService.getOrThrow<string>('WORLD_ID_APP_ID');
    this.worldIdAction = this.configService.getOrThrow<string>('WORLD_ID_ACTION');
    this.worldIdApiKey = this.configService.getOrThrow<string>('WORLD_ID_API_KEY');
    this.worldIdSignalNamespace =
      this.configService.get<string>('WORLD_ID_SIGNAL_NAMESPACE', { infer: true }) ?? 'zeazchain';
  }

  async verify(payload: VerifyWorldIdDto): Promise<WorldIdVerificationResult> {
    const signal = payload.signal ?? `${this.worldIdSignalNamespace}:${payload.nullifier_hash}`;

    this.logger.info({ signal }, 'Verifying World ID proof');

    try {
      const response = await fetch('https://developer.worldcoin.org/api/v1/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.worldIdApiKey}`,
        },
        body: JSON.stringify({
          app_id: this.worldIdAppId,
          action: this.worldIdAction,
          signal,
          merkle_root: payload.merkle_root,
          nullifier_hash: payload.nullifier_hash,
          proof: payload.proof,
          credential_type: payload.credential_type,
        }),
      });

      const body = await response.json();

      if (!response.ok || !body?.success) {
        this.logger.warn({ body, status: response.status }, 'World ID verification failed');
        throw new BadRequestException('World ID verification failed');
      }

      return {
        success: true,
        signal,
        nullifier_hash: payload.nullifier_hash,
        credential_type: payload.credential_type,
        proof: body,
      };
    } catch (error) {
      this.logger.error({ err: error }, 'World ID verification error');
      throw new BadRequestException('World ID verification failed');
    }
  }
}

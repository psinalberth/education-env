import { Logger } from '@nestjs/common';
import { RetryOptions } from './retry.options';

export default async function retry<T>(
  block: () => Promise<T>,
  options: RetryOptions,
) {
  try {
    return await block();
  } catch (e: any) {
    let attempts = options.attempts | 0;
    if (attempts < options.maxAttempts) {
      attempts += 1;
      Logger.error(
        `Operation failed due to ${e}. Preparing retry attempt #${attempts}`,
      );
      return retry(block, {
        maxAttempts: options.maxAttempts,
        attempts: attempts,
      });
    }
    Logger.log('Max retries exhausted. Aborting operation...');
    throw e;
  }
}

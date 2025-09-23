import { cloudflare, CloudflareInstance } from '@monorepo/core/src/cloud-flare.js';

class CloudFlareService {
  constructor(private cloudflare: CloudflareInstance) {}

  public async purgeCache(url: string): Promise<void> {
    // Logic to purge cache using Cloudflare API
  }
}
export const cloudFlareService = new CloudFlareService(cloudflare);

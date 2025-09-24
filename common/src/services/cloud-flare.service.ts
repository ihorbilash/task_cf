import env, { required } from '@monorepo/core/src/server/env.js';

import {
  cloudflare,
  CloudflareInstance,
  RecordEditParams,
  Zone,
  RecordCreateParams,
} from '@monorepo/core/src/cloud-flare.js';

const CLOUDFLARE_ACCOUNT_ID = required(env.CLOUDFLARE_ACCOUNT_ID);

export class CloudFlareService {
  constructor(private cloudflare: CloudflareInstance) {}

  async registerDomain(urlName: string): Promise<Zone> {
    const zone = await this.cloudflare.zones.create({
      name: urlName,
      account: { id: CLOUDFLARE_ACCOUNT_ID },
    });
    return zone;
  }

  async getZonesNsRecords(zoneId: string): Promise<string[]> {
    const zone = await this.cloudflare.zones.get({
      zone_id: zoneId,
    });
    return zone.name_servers || [];
  }

  async getListOfRecords(zoneId: string): Promise<any[]> {
    const records = await this.cloudflare.dns.records.list({ zone_id: zoneId });
    console.log('🚀 ~ CloudFlareService ~ getListOfRecords ~ records:', records);
    return records.result;
  }

  async getZonesByDomainName(name: string): Promise<any> {
    const zone = await this.cloudflare.zones.list(); //({ name }); //.then((zones) => zones.result.find((zone) => zone.name === name));
    console.log('🚀 ~ CloudFlareService ~ getZonesByDomainName ~ zone:', zone);
    return zone;
  }

  async addRecord(params: RecordCreateParams): Promise<void> {
    await this.cloudflare.dns.records.create({ ...params, ttl: 1 });
  }

  async editDomain(zoneId: string, recordEditParams: RecordEditParams): Promise<void> {
    await this.cloudflare.dns.records.edit(zoneId, recordEditParams);
  }

  async deleteRecordById(recordId: string, zoneId: string): Promise<void> {
    await this.cloudflare.dns.records.delete(recordId, { zone_id: zoneId });
  }
}

export const cloudFlareService = new CloudFlareService(cloudflare);

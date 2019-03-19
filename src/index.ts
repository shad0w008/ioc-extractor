import { clean } from "./aux/auxiliary";
import {
  extractASN,
  extractBTC,
  extractCVE,
  extractDomain,
  extractEmail,
  extractGAPubID,
  extractGATrackID,
  extractIPv4,
  extractIPv6,
  extractMD5,
  extractSHA1,
  extractSHA256,
  extractSHA512,
  extractSSDEEP,
  extractURL,
  extractXMR,
} from "./aux/extractor";

export declare interface Hashes {
  md5s: string[];
  sha1s: string[];
  sha256s: string[];
  sha512s: string[];
  ssdeeps: string[];
}

export declare interface Networks {
  asns: string[];
  domains: string[];
  emails: string[];
  ipv4s: string[];
  ipv6s: string[];
  urls: string[];
}

export declare interface Utilities {
  cves: string[];
}

export declare interface Cryptocurrencies {
  btcs: string[];
  xmrs: string[];
}

export declare interface Trackers {
  gaTrackIDs: string[];
  gaPubIDs: string[];
}

export declare interface IOC {
  cryptocurrencies: Cryptocurrencies;
  hashes: Hashes;
  networks: Networks;
  trackers: Trackers;
  utilities: Utilities;
}

export class IOCExtractor {
  public static getIOC(data: string): IOC {
    const extractor = new IOCExtractor(data);
    return extractor.getIOC();
  }

  private data: string;

  public constructor(data: string) {
    this.data = clean(data);
  }

  public getHashes(): Hashes {
    const hashes: Hashes = {
      md5s: extractMD5(this.data),
      sha1s: extractSHA1(this.data),
      sha256s: extractSHA256(this.data),
      sha512s: extractSHA512(this.data),
      ssdeeps: extractSSDEEP(this.data),
    };
    return hashes;
  }

  public getNetworks(): Networks {
    const networks: Networks = {
      asns: extractASN(this.data),
      domains: extractDomain(this.data),
      emails: extractEmail(this.data),
      ipv4s: extractIPv4(this.data),
      ipv6s: extractIPv6(this.data),
      urls: extractURL(this.data),
    };
    return networks;
  }

  public getUtilities(): Utilities {
    const utilities: Utilities = {
      cves: extractCVE(this.data),
    };
    return utilities;
  }

  public getCryptocurrencies(): Cryptocurrencies {
    const cryptocurrencies: Cryptocurrencies = {
      btcs: extractBTC(this.data),
      xmrs: extractXMR(this.data),
    };
    return cryptocurrencies;
  }

  public getTrackers(): Trackers {
    const trackers: Trackers = {
      gaPubIDs: extractGAPubID(this.data),
      gaTrackIDs: extractGATrackID(this.data),
    };
    return trackers;
  }

  public getIOC(): IOC {
    const ioc: IOC = {
      cryptocurrencies: this.getCryptocurrencies(),
      hashes: this.getHashes(),
      networks: this.getNetworks(),
      trackers: this.getTrackers(),
      utilities: this.getUtilities(),
    };
    return ioc;
  }
}

export function getIOC(data: string): IOC {
  return IOCExtractor.getIOC(data);
}

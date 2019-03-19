import { tldRegexString } from "./tlds";

function check(s: string, regexs: object): boolean {
  for (const key of Object.keys(regexs)) {
    const regex = regexs[key];
    if (s.match(regex)) {
      return true;
    }
  }
  return false;
}

export const hashRegexs = {
  md5: /\b[A-Fa-f0-9]{32}\b/gi,
  sha1: /\b[A-Fa-f0-9]{40}\b/gi,
  sha256: /\b[A-Fa-f0-9]{64}\b/gi,
  sha512: /\b[A-Fa-f0-9]{128}\b/gi,
  ssdeep: /\b\d{1,}:[A-Za-z0-9\/+]{3,}:[A-Za-z0-9\/+]{3,}/gi,
};

export function isHash(s: string): boolean {
  return check(s, hashRegexs);
}

export const networkRegexs = {
  asn: /(AS|ASN)\d+/gi,
  domain: new RegExp(
    `([A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.(${tldRegexString})\\b)`,
    "ig"
  ),
  email: new RegExp(
    `[A-Za-z0-9_.]+@([A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*\\.(${tldRegexString})\\b)`,
    "ig"
  ),
  ipv4: /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\[?\.\]?){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/gi,
  ipv6: /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi,
  url: /(?:(?:https?):\/\/)(?:\S+(?::\S*)?@)??(?:localhost|(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[\/?#][^\s"]*)?/gi,
};

export function isNetwork(s: string): boolean {
  return check(s, networkRegexs);
}

export const utilityRegexs = {
  cve: /(CVE-(19|20)\d{2}-\d{4,7})/gi,
};

export function isUtilityItem(s: string): boolean {
  return check(s, utilityRegexs);
}

export const cryptocurrencyRegexs = {
  btc: /\b[13][a-km-zA-HJ-NP-Z0-9]{26,33}\b/gi,
  xmr: /\b4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}\b/gi,
};

export function isCryptocurrency(s: string): boolean {
  return check(s, cryptocurrencyRegexs);
}

export const trackerRegexs = {
  gaPubID: /pub-\d{16}/gi,
  gaTrackID: /UA-\d{4,9}(-\d{1,2})?/gi,
};

export function isTracker(s: string): boolean {
  return check(s, trackerRegexs);
}

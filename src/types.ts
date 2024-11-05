import type { Option } from "@pexip/components";

/**
 * The department configuration
 * @param carts - The carts in the department
 * @param id - The department id
 * @param label - The department label
 */
export interface Department extends Option {
  carts?: Option[];
}

/**
 * The SIP configuration
 * @param host - The SIP host
 * @param role - The SIP role
 */
export interface SipConfig {
  host: string;
  role: 'HOST' | 'GUEST';
}

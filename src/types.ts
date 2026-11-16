/**
 * A selectable option
 * @param id - The option id
 * @param label - The option label
 */
export interface Option {
  id: string;
  label: string;
}

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

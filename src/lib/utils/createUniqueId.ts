import { v4 as uuidv4 } from 'uuid';

export function createUniqueId(): string {
  return uuidv4();
}

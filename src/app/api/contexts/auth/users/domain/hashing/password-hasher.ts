export abstract class PasswordHasher {
  abstract hash(value: string): Promise<string>;
  abstract verify(value: string, hashedValue: string): Promise<boolean>;
}

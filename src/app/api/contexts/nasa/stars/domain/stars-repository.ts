import { Star } from "./star";

export abstract class StarsRepository {
  abstract create(star: Star): Promise<void>;

  abstract searchAll(): Promise<Star[]>;
}

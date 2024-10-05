import { StarId } from "./value-objects/star-id";
import { StarName } from "./value-objects/star-name";
import { StarNumber } from "./value-objects/star-number";
import { StarTexture } from "./value-objects/star-texture";

interface StarPrimitives {
  id: number;
  name: string;
  actualRadius: number;
  scaledRadius: number;
  circumference: number;
  rotationPeriod: number;
  rotationSpeed: number;
  texture: string;
  actualDistance?: number;
  scaledDistance?: number;
}

export class Star {
  readonly id: StarId;
  readonly name: StarName;
  readonly actualRadius: StarNumber;
  readonly scaledRadius: StarNumber;
  readonly circumference: StarNumber;
  readonly rotationPeriod: StarNumber;
  readonly rotationSpeed: StarNumber;
  readonly texture: StarTexture;
  readonly actualDistance?: StarNumber;
  readonly scaledDistance?: StarNumber;

  constructor(
    id: StarId,
    name: StarName,
    actualRadius: StarNumber,
    scaledRadius: StarNumber,
    circumference: StarNumber,
    rotationPeriod: StarNumber,
    rotationSpeed: StarNumber,
    texture: StarTexture,
    actualDistance?: StarNumber,
    scaledDistance?: StarNumber
  ) {
    this.id = id;
    this.name = name;
    this.actualRadius = actualRadius;
    this.scaledRadius = scaledRadius;
    this.circumference = circumference;
    this.rotationPeriod = rotationPeriod;
    this.rotationSpeed = rotationSpeed;
    this.texture = texture;
    this.actualDistance = actualDistance;
    this.scaledDistance = scaledDistance;
  }

  static create(
    id: StarId,
    name: StarName,
    actualRadius: StarNumber,
    scaledRadius: StarNumber,
    circumference: StarNumber,
    rotationPeriod: StarNumber,
    rotationSpeed: StarNumber,
    texture: StarTexture,
    actualDistance?: StarNumber,
    scaledDistance?: StarNumber
  ): Star {
    const starAggregate = new Star(
      id,
      name,
      actualRadius,
      scaledRadius,
      circumference,
      rotationPeriod,
      rotationSpeed,
      texture,
      actualDistance,
      scaledDistance
    );

    return starAggregate;
  }

  static fromPrimitives(plainData: StarPrimitives): Star {
    return new Star(
      new StarId(plainData.id),
      new StarName(plainData.name),
      new StarNumber(plainData.actualRadius),
      new StarNumber(plainData.scaledRadius),
      new StarNumber(plainData.circumference),
      new StarNumber(plainData.rotationPeriod),
      new StarNumber(plainData.rotationSpeed),
      new StarTexture(plainData.texture),
      plainData.actualDistance
        ? new StarNumber(plainData.actualDistance)
        : undefined,
      plainData.scaledDistance
        ? new StarNumber(plainData.scaledDistance)
        : undefined
    );
  }

  toPrimitives(): StarPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      actualRadius: this.actualRadius.value,
      scaledRadius: this.scaledRadius.value,
      circumference: this.circumference.value,
      rotationPeriod: this.rotationPeriod.value,
      rotationSpeed: this.rotationSpeed.value,
      texture: this.texture.value,
      actualDistance: this.actualDistance?.value,
      scaledDistance: this.scaledDistance?.value,
    };
  }
}

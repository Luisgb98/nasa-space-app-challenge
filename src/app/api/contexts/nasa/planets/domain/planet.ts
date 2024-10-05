import { PlanetId } from "./value-objects/planet-id";
import { PlanetName } from "./value-objects/planet-name";
import { PlanetDwarf } from "./value-objects/planet-dwarf";
import { PlanetNumber } from "./value-objects/planet-number";

interface PlanetPrimitives {
  id: number;
  name: string;
  actualRadius: number;
  scaledRadius: number;
  actualDistanceFromSun: number;
  scaledDistance: number;
  circumference: number;
  rotationPeriod: number;
  rotationSpeed: number;
  mayorAxis: number;
  eccentricity: number;
  dwarf: boolean;
}

export class Planet {
  readonly id: PlanetId;
  readonly name: PlanetName;
  readonly actualRadius: PlanetNumber;
  readonly scaledRadius: PlanetNumber;
  readonly actualDistanceFromSun: PlanetNumber;
  readonly scaledDistance: PlanetNumber;
  readonly circumference: PlanetNumber;
  readonly rotationPeriod: PlanetNumber;
  readonly rotationSpeed: PlanetNumber;
  readonly mayorAxis: PlanetNumber;
  readonly eccentricity: PlanetNumber;
  readonly dwarf: PlanetDwarf;

  constructor(
    id: PlanetId,
    name: PlanetName,
    actualRadius: PlanetNumber,
    scaledRadius: PlanetNumber,
    actualDistanceFromSun: PlanetNumber,
    scaledDistance: PlanetNumber,
    circumference: PlanetNumber,
    rotationPeriod: PlanetNumber,
    rotationSpeed: PlanetNumber,
    mayorAxis: PlanetNumber,
    eccentricity: PlanetNumber,
    dwarf: PlanetDwarf
  ) {
    this.id = id;
    this.name = name;
    this.actualRadius = actualRadius;
    this.scaledRadius = scaledRadius;
    this.actualDistanceFromSun = actualDistanceFromSun;
    this.scaledDistance = scaledDistance;
    this.circumference = circumference;
    this.rotationPeriod = rotationPeriod;
    this.rotationSpeed = rotationSpeed;
    this.mayorAxis = mayorAxis;
    this.eccentricity = eccentricity;
    this.dwarf = dwarf;
  }

  static create(
    id: PlanetId,
    name: PlanetName,
    actualRadius: PlanetNumber,
    scaledRadius: PlanetNumber,
    actualDistanceFromSun: PlanetNumber,
    scaledDistance: PlanetNumber,
    circumference: PlanetNumber,
    rotationPeriod: PlanetNumber,
    rotationSpeed: PlanetNumber,
    mayorAxis: PlanetNumber,
    eccentricity: PlanetNumber,
    dwarf: PlanetDwarf
  ): Planet {
    const planetAggregate = new Planet(
      id,
      name,
      actualRadius,
      scaledRadius,
      actualDistanceFromSun,
      scaledDistance,
      circumference,
      rotationPeriod,
      rotationSpeed,
      mayorAxis,
      eccentricity,
      dwarf
    );

    return planetAggregate;
  }

  static fromPrimitives(plainData: PlanetPrimitives): Planet {
    return new Planet(
      new PlanetId(plainData.id),
      new PlanetName(plainData.name),
      new PlanetNumber(plainData.actualRadius),
      new PlanetNumber(plainData.scaledRadius),
      new PlanetNumber(plainData.actualDistanceFromSun),
      new PlanetNumber(plainData.scaledDistance),
      new PlanetNumber(plainData.circumference),
      new PlanetNumber(plainData.rotationPeriod),
      new PlanetNumber(plainData.rotationSpeed),
      new PlanetNumber(plainData.mayorAxis),
      new PlanetNumber(plainData.eccentricity),
      new PlanetDwarf(plainData.dwarf)
    );
  }

  toPrimitives(): PlanetPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      actualRadius: this.actualRadius.value,
      scaledRadius: this.scaledRadius.value,
      actualDistanceFromSun: this.actualDistanceFromSun.value,
      scaledDistance: this.scaledDistance.value,
      circumference: this.circumference.value,
      rotationPeriod: this.rotationPeriod.value,
      rotationSpeed: this.rotationSpeed.value,
      mayorAxis: this.mayorAxis.value,
      eccentricity: this.eccentricity.value,
      dwarf: this.dwarf.value,
    };
  }
}

import { PlanetName } from "../../planets/domain/value-objects/planet-name";
import { SatelliteId } from "./value-objects/satellite-id";
import { SatelliteName } from "./value-objects/satellite-name";
import { SatelliteNumber } from "./value-objects/satellite-number";

interface SatellitePrimitives {
  id: number;
  name: string;
  actualRadius: number;
  scaledRadius: number;
  actualDistanceFromPlanet: number;
  scaledDistance: number;
  circumference: number;
  rotationPeriod: number;
  rotationSpeed: number;
  planet_name: string;
}

export class Satellite {
  readonly id: SatelliteId;
  readonly name: SatelliteName;
  readonly actualRadius: SatelliteNumber;
  readonly scaledRadius: SatelliteNumber;
  readonly actualDistanceFromPlanet: SatelliteNumber;
  readonly scaledDistance: SatelliteNumber;
  readonly circumference: SatelliteNumber;
  readonly rotationPeriod: SatelliteNumber;
  readonly rotationSpeed: SatelliteNumber;
  readonly planet_name: PlanetName;

  constructor(
    id: SatelliteId,
    name: SatelliteName,
    actualRadius: SatelliteNumber,
    scaledRadius: SatelliteNumber,
    actualDistanceFromPlanet: SatelliteNumber,
    scaledDistance: SatelliteNumber,
    circumference: SatelliteNumber,
    rotationPeriod: SatelliteNumber,
    rotationSpeed: SatelliteNumber,
    planet_name: PlanetName
  ) {
    this.id = id;
    this.name = name;
    this.actualRadius = actualRadius;
    this.scaledRadius = scaledRadius;
    this.actualDistanceFromPlanet = actualDistanceFromPlanet;
    this.scaledDistance = scaledDistance;
    this.circumference = circumference;
    this.rotationPeriod = rotationPeriod;
    this.rotationSpeed = rotationSpeed;
    this.planet_name = planet_name;
  }

  static create(
    id: SatelliteId,
    name: SatelliteName,
    actualRadius: SatelliteNumber,
    scaledRadius: SatelliteNumber,
    actualDistanceFromPlanet: SatelliteNumber,
    scaledDistance: SatelliteNumber,
    circumference: SatelliteNumber,
    rotationPeriod: SatelliteNumber,
    rotationSpeed: SatelliteNumber,
    planet_name: PlanetName
  ): Satellite {
    return new Satellite(
      id,
      name,
      actualRadius,
      scaledRadius,
      actualDistanceFromPlanet,
      scaledDistance,
      circumference,
      rotationPeriod,
      rotationSpeed,
      planet_name
    );
  }

  static fromPrimitives(plainData: SatellitePrimitives): Satellite {
    return new Satellite(
      new SatelliteId(plainData.id),
      new SatelliteName(plainData.name),
      new SatelliteNumber(plainData.actualRadius),
      new SatelliteNumber(plainData.scaledRadius),
      new SatelliteNumber(plainData.actualDistanceFromPlanet),
      new SatelliteNumber(plainData.scaledDistance),
      new SatelliteNumber(plainData.circumference),
      new SatelliteNumber(plainData.rotationPeriod),
      new SatelliteNumber(plainData.rotationSpeed),
      new PlanetName(plainData.planet_name)
    );
  }

  toPrimitives(): SatellitePrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      actualRadius: this.actualRadius.value,
      scaledRadius: this.scaledRadius.value,
      actualDistanceFromPlanet: this.actualDistanceFromPlanet.value,
      scaledDistance: this.scaledDistance.value,
      circumference: this.circumference.value,
      rotationPeriod: this.rotationPeriod.value,
      rotationSpeed: this.rotationSpeed.value,
      planet_name: this.planet_name.value,
    };
  }
}

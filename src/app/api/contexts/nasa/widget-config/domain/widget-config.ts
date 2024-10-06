import { UserId } from "../../../kernel/domain/user-id";
import { WidgetConfigId } from "./value-objects/widget-config-id";
import { WidgetConfigBool } from "./value-objects/widget-config-bool";
import { WidgetConfigNumber } from "./value-objects/widget-config-number";

interface WidgetConfigPrimitives {
  id: number;
  velocity: number;
  planets: boolean;
  orbits: boolean;
  satellites: boolean;
  dwarfs: boolean;
  user_id: string;
}

export class WidgetConfig {
  readonly id: WidgetConfigId;
  readonly velocity: WidgetConfigNumber;
  readonly planets: WidgetConfigBool;
  readonly orbits: WidgetConfigBool;
  readonly satellites: WidgetConfigBool;
  readonly dwarfs: WidgetConfigBool;
  readonly user_id: UserId;

  constructor(
    id: WidgetConfigId,
    velocity: WidgetConfigNumber,
    planets: WidgetConfigBool,
    orbits: WidgetConfigBool,
    satellites: WidgetConfigBool,
    dwarfs: WidgetConfigBool,
    user_id: UserId
  ) {
    this.id = id;
    this.velocity = velocity;
    this.planets = planets;
    this.orbits = orbits;
    this.satellites = satellites;
    this.dwarfs = dwarfs;
    this.user_id = user_id;
  }

  static create(
    id: WidgetConfigId,
    velocity: WidgetConfigNumber,
    planets: WidgetConfigBool,
    orbits: WidgetConfigBool,
    satellites: WidgetConfigBool,
    dwarfs: WidgetConfigBool,
    user_id: UserId
  ): WidgetConfig {
    const widgetConfigAggregate = new WidgetConfig(
      id,
      velocity,
      planets,
      orbits,
      satellites,
      dwarfs,
      user_id
    );

    return widgetConfigAggregate;
  }

  static fromPrimitives(plainData: WidgetConfigPrimitives): WidgetConfig {
    return new WidgetConfig(
      new WidgetConfigId(plainData.id),
      new WidgetConfigNumber(plainData.velocity),
      new WidgetConfigBool(plainData.planets),
      new WidgetConfigBool(plainData.orbits),
      new WidgetConfigBool(plainData.satellites),
      new WidgetConfigBool(plainData.dwarfs),
      new UserId(plainData.user_id)
    );
  }

  toPrimitives(): WidgetConfigPrimitives {
    return {
      id: this.id.value,
      velocity: this.velocity.value,
      planets: this.planets.value,
      orbits: this.orbits.value,
      satellites: this.satellites.value,
      dwarfs: this.dwarfs.value,
      user_id: this.user_id.value,
    };
  }
}

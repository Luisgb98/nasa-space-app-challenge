/**
 * An array of planet objects.
 * Each planet object should contain properties such as name, size, distance from the sun, and any other relevant information.
 * 
 * @type {Array<Object>}
 * @property {string} name - The name of the planet.
 * @property {number} size - The size of the planet.
 * @property {number} distance - The distance of the planet from the sun.
 */

type celestialBody = {
  name: string;
  radius: number;
  distance: number;
  rotationSpeed: number;
  texture: string;
};

export const sun: celestialBody = {
  name: "Sun",
  radius: 69.634,
  distance: 0,
  rotationSpeed: 10.83,
  texture: "./sun.jpg",
};

export const planets: celestialBody[] = [
  {
    name: "Mercury",
    radius: 0.2439,
    distance: 2.8955,
    rotationSpeed: 10.83,
    texture: "./mercury.jpg",
  },
  {
    name: "Venus",
    radius: 0.6052,
    distance: 5.408,
    rotationSpeed: 6.52,
    texture: "./venus.jpg",
  },
  {
    name: "Earth",
    radius: 0.6371,
    distance: 7.48,
    rotationSpeed: 1.574,
    texture: "./earth.jpg",
  },
  {
    name: "Mars",
    radius: 0.339,
    distance: 11.397,
    rotationSpeed: 0.866,
    texture: "./mars.jpg",
  },
  {
    name: "Jupiter",
    radius: 6.9911,
    distance: 38.9165,
    rotationSpeed: 45.583,
    texture: "./jupiter.jpg",
  },
  {
    name: "Saturn",
    radius: 5.8232,
    distance: 71.47,
    rotationSpeed: 36.84,
    texture: "./saturn.jpg",
  },
  {
    name: "Uranus",
    radius: 2.5362,
    distance: 143.5495,
    rotationSpeed: 14.794,
    texture: "./uranus.jpg",
  },
  {
    name: "Neptune",
    radius: 2.4622,
    distance: 225.2,
    rotationSpeed: 9.719,
    texture: "./neptune.jpg",
  },
];

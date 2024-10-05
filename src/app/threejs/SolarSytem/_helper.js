/**
 * An array of planet objects.
 * Each planet object should contain properties such as name, size, distance from the sun, and any other relevant information.
 * 
 * @type {Array<Object>}
 * @property {string} name - The name of the planet.
 * @property {number} size - The size of the planet.
 * @property {number} distance - The distance of the planet from the sun.
 */
export const planets = [
    {
        name: "Mercury",
        radius: 2.440,
        distance: 58,
        rotationSpeed: 10.83,
        texture: "./mercury.jpg"
    },
    {
        name: "Venus",
        radius: 6.057,
        distance: 108,
        rotationSpeed: 6.52,
        texture: "./venus.jpg"
    },
    {
        name: "Earth",
        radius: 6.371,
        distance: 149.7,
        rotationSpeed: 1.574,
        texture: "./earth.jpg",
        satelites: [
            {
                name: "Moon",
                radius: 3.474,
                distance: 384.4,
                rotationSpeed: 27.3,
                texture: "./moon.jpg"
            }
        ]
    },
    {
        name: "Mars",
        radius: 3.389,
        distance: 227.9,
        rotationSpeed: 0.866,
        texture: "./mars.jpg"
    },
    {
        name: "Ceres",
        radius: 0.5,
        distance: 10000,
        rotationSpeed: 0.29,
        texture: "./ceres.jpg"
    },
    {
        name: "Jupiter",
        radius: 69.911,
        distance: 778,
        rotationSpeed: 45.583,
        texture: "./jupiter.jpg"
    },
    {
        name: "Saturn",
        radius: 58.232,
        distance: 1434,
        rotationSpeed: 36.840,
        texture: "./saturn.jpg"
    },
    {
        name: "Uranus",
        radius: 25.362,
        distance: 2871,
        rotationSpeed: 14.794,
        texture: "./uranus.jpg"
    },
    {
        name: "Neptune",
        radius: 24.622,
        distance: 4495,
        rotationSpeed: 9.719,
        texture: "./neptune.jpg"
    },
    {
        name: "Pluto",
        radius: 1.151,
        distance: 5900,
        rotationSpeed: 0.047,
        texture: "./pluto.jpg"
    },
    {
        name: "Haumea",
        radius: 0.890,
        distance: 6500,
        rotationSpeed: 3.9,
        texture: "./haumea.jpg"
    },
    {
        name: "Makemake",
        radius: 0.780,
        distance: 6900,
        rotationSpeed: 0.047,
        texture: "./makemake.jpg"
    },
    {
        name: "Eris",
        radius: 1.183,
        distance: 4495,
        rotationSpeed: 0.025,
        texture: "./eris.jpg"
    }
];

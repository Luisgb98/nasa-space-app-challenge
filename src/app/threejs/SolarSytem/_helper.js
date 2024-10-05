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
/*     {
        name: "Mercury",
        radius: 2439.7,
        distance: 57.91,
        rotationSpeed: 10.83,
        texture: "./mercury.jpg"
    }, */
    {
        name: "Venus",
        radius: 6051.8,
        distance: 108.2,
        rotationSpeed: -6.52,
        texture: "./venus.jpg"
    },
    {
        name: "Earth",
        radius: 6371,
        distance: 149.6,
        rotationSpeed: 1674.4,
        texture: "./earth.jpg",
        satelites: [
            {
                name: "Moon",
                radius: 1737.1,
                distance: 384.4,
                rotationSpeed: 27.3,
                texture: "./moon.jpg"
            }
        ]
    },
    {
        name: "Mars",
        radius: 3389.5,
        distance: 227.9,
        rotationSpeed: 866.6,
        texture: "./mars.jpg"
    },
    {
        name: "Jupiter",
        radius: 69911,
        distance: 778.5,
        rotationSpeed: 45430,
        texture: "./jupiter.jpg"
    },
    {
        name: "Saturn",
        radius: 58232,
        distance: 1434,
        rotationSpeed: 36840,
        texture: "./saturn.jpg"
    },
/*     {
        name: "Uranus",
        radius: 25362,
        distance: 2871,
        rotationSpeed: -14794,
        texture: "./uranus.jpg"
    }, */
/*     {
        name: "Neptune",
        radius: 24622,
        distance: 4495,
        rotationSpeed: 9719,
        texture: "./neptune.jpg"
    } */
];

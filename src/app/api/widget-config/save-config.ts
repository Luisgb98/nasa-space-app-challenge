async function saveConfig(formData: FormData): Promise<void> {
  const velocity = formData.get("velocity");
  const orbits = formData.get("orbits");
  const planets = formData.get("planets");
  const satellites = formData.get("satellites");
  const dwarfs = formData.get("dwarfs");

  console.log("Saving config...");

  const body = JSON.stringify({
    velocity: velocity,
    orbits: orbits === "on" ? true : false,
    planets: planets === "on" ? true : false,
    satellites: satellites === "on" ? true : false,
    dwarfs: dwarfs === "on" ? true : false,
  });

  console.log(body);

  await fetch("/api/widget-config", {
    method: "POST",
    body: body,
  });
}

export default saveConfig;

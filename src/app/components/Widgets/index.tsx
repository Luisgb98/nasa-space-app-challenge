import { Checkbox, Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

interface WidgetsProps {
    velocity: number;
    setVelocity: (velocity: number) => void;
    togOrbits: boolean;
    setOrbits: (togOrbits: boolean) => void;
    togPlanets: boolean;
    setPlanets: (togPlanets: boolean) => void;
    togSatellites: boolean;
    setSatellites: (togSatellites: boolean) => void;
    togDwarfs: boolean;
    setDwarfs: (togDwarfs: boolean) => void;
}

const Widgets = ({ velocity, setVelocity, 
  togPlanets, setPlanets,
  togOrbits, setOrbits,
  togSatellites, setSatellites,
  togDwarfs, setDwarfs}: WidgetsProps) => {

  return (
    <Flex color="white" width="100%" flexDir={{ base: "column", md: "row" }}>
      <Flex flexGrow={1} pt={4} px={4} flexDir="column">
        <Text mb={3} fontWeight={900}>
          Bodies velocity
        </Text>
        <Slider
          min={1}
          max={20}
          step={1}
          defaultValue={velocity}
          onChange={(v) => setVelocity(v)}
          maxWidth={{ base: "100%", md: "300px" }}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </Flex>
      <Flex flexGrow={1} pt={4} px={4} flexDir="column">
        <Text mb={3} fontWeight={900}>
          Show:
        </Text>
        <Flex pl={6} mt={1}>
          <Box width="200px">
            <Checkbox
              defaultChecked
              onChange={(e) => setOrbits(e.target.checked)}
            >
              Toggle Orbits
            </Checkbox>
            <Checkbox
              defaultChecked
              onChange={(e) => setPlanets(e.target.checked)}
            >
              Toggle Planets
            </Checkbox>
          </Box>
          <Box width="200px">
            <Checkbox
              defaultChecked
              onChange={(e) => setSatellites(e.target.checked)}
            >
              Toggle Satellites
            </Checkbox>
            <Checkbox
              defaultChecked
              onChange={(e) => setDwarfs(e.target.checked)}
            >
              Toggle Dwarfs
            </Checkbox>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Widgets
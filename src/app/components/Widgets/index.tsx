import { Checkbox, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

interface WidgetsProps {
    velocity: number;
    setVelocity: (velocity: number) => void;
    togPlanets: boolean;
    setPlanets: (togPlanets: boolean) => void;
}

const Widgets = ({ velocity, setVelocity, 
  togPlanets, setPlanets,
   }: WidgetsProps) => {

  return (
    <Flex color="white" width="100%">
      <Flex flexGrow={1} p={4} flexDir="column">
        <Text mb={3} fontWeight={900}>
          Bodies velocity
        </Text>
        <Slider
          min={1}
          max={20}
          step={1}
          defaultValue={velocity}
          onChange={(v) => setVelocity(v)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </Flex>
      <Flex flexGrow={1} p={4} flexDir="column">
        <Text mb={3} fontWeight={900}>
          Show:
        </Text>
        <Stack pl={6} mt={1} spacing={1}>
          <Checkbox
            defaultChecked
            /* onChange={(e) =>
              setCheckedItems(check)
            } */
          >
            Toggle Orbits
          </Checkbox>
          <Checkbox
            defaultChecked
            onChange={(e) =>
              setPlanets(e.target.checked)
            }
          >
            Toggle Planets
          </Checkbox>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Widgets
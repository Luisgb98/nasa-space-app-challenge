import {
  Button,
  Checkbox,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from "@chakra-ui/react";

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

const Widgets = ({
  velocity,
  setVelocity,
  togPlanets,
  setPlanets,
  togOrbits,
  setOrbits,
  togSatellites,
  setSatellites,
  togDwarfs,
  setDwarfs,
}: WidgetsProps) => {
  return (
    <form>
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
            name="velocity"
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
              onChange={(e) => setOrbits(e.target.checked)}
              name="orbits"
            >
              Toggle Orbits
            </Checkbox>
            <Checkbox
              defaultChecked
              onChange={(e) => setPlanets(e.target.checked)}
              name="planets"
            >
              Toggle Planets
            </Checkbox>
            <Checkbox
              defaultChecked
              onChange={(e) => setSatellites(e.target.checked)}
              name="satellites"
            >
              Toggle Satellites
            </Checkbox>
            <Checkbox
              defaultChecked
              onChange={(e) => setDwarfs(e.target.checked)}
              name="dwarfs"
            >
              Toggle Dwarfs
            </Checkbox>
          </Stack>
        </Flex>
        <Flex grow={1}>
          <Button type="submit" colorScheme="blue" alignSelf="flex-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-device-floppy"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
              <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M14 4l0 4l-6 0l0 -4" />
            </svg>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default Widgets;

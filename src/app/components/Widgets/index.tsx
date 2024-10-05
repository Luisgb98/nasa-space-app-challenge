import { Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";

interface WidgetsProps {
    velocity: number;
    setVelocity: (velocity: number) => void;
}

const Widgets = ({ velocity, setVelocity }: WidgetsProps) => {
  return (
    <Flex color="white" width="100%">
      <Flex flexGrow={1} p={4} flexDir="column">
        <Text mb={3} fontWeight={900}>
          Bodies velocity
        </Text>
        <Slider
            min={1}
            max={10}
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
      <Flex flexGrow={3}>Filter</Flex>
    </Flex>
  );
};

export default Widgets
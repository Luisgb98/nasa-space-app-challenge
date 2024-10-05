import { Checkbox, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

interface WidgetsProps {
    velocity: number;
    setVelocity: (velocity: number) => void;
}



const Widgets = ({ velocity, setVelocity }: WidgetsProps) => {

  const [checkedItems, setCheckedItems] = useState([]);
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
      <Flex flexGrow={1} p={4} flexDir="column">
        <Text mb={3} fontWeight={900}>
          Show:
        </Text>
        <Stack pl={6} mt={1} spacing={1}>
          <Checkbox
            isChecked={true}
            onChange={(e) =>
              setCheckedItems(check)
            }
          >
            Child Checkbox 1
          </Checkbox>
          <Checkbox
            isChecked={true}
            onChange={(e) =>
              setCheckedItems([checkedItems[0], e.target.checked])
            }
          >
            Child Checkbox 2
          </Checkbox>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Widgets
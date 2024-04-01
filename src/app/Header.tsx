import { Flex, Text } from "@chakra-ui/react";

export const Header = () => {
	return (
		<Flex w="full" borderBottom="1px solid #C4C4C4">
			<Text fontSize="xl" as="b" color="#121212" py="12px">
				Top Contributors
			</Text>
		</Flex>
	);
};

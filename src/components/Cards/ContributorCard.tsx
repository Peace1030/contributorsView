import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AddIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	Flex,
	Grid,
	Heading,
	IconButton,
	Image,
	Skeleton,
	Text,
	Wrap,
	WrapItem,
	extendTheme,
	useBreakpointValue,
} from "@chakra-ui/react";

import type { Contributor } from "@/utils/githubApi";

type ContributorCardProps = {
	contributor: Contributor;
};

export const ContributorCard = (props: ContributorCardProps) => {
	const formatDate = (date: string) => {
		const dateObj = new Date(date);

		const formattedDate = dateObj.toLocaleString();

		return formattedDate;
	};

	return (
		<Card maxW="md" variant="elevated">
			<CardBody>
				<Flex>
					<Flex flex="1" alignItems="flex-end" flexWrap="wrap">
						<Avatar
							borderRadius="0%"
							name={props.contributor.login}
							src={props.contributor.avatar_url}
							size="md"
							border="5px solid #ECF2FF"
						/>
						<Text fontSize="small" letterSpacing={0.5} pl="3px">
							@github
						</Text>
					</Flex>
					<Button variant="unstyled">
						<AddIcon />
					</Button>
				</Flex>
				<Box pt="5px">
					<Heading size="sm">{props.contributor.login}</Heading>
					<Text fontSize="xs" pt="5px">
						{props.contributor.contributions} commits
					</Text>
				</Box>
			</CardBody>
			<CardFooter
				justify="center"
				flexWrap="wrap"
				sx={{
					"& > button": {
						minW: "136px",
					},
				}}>
				<Link href={`/${props.contributor.login}/repos`}>
					<Button
						flex="0.7"
						variant="outline"
						color={"blue"}
						borderColor={"blue"}>
						<Text fontSize="sm" px="5px">
							VIEW REPOSITORIES
						</Text>
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};

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

import { Repository } from "@/utils/githubApi";

type RepoCardProps = {
	repo: Repository;
};

export const RepoCard = (props: RepoCardProps) => {
	const formatDate = (date: string) => {
		const dateObj = new Date(date);

		const formattedDate = dateObj.toLocaleString();

		return formattedDate;
	};

	return (
		<Card maxW="md" variant="elevated">
			<CardBody>
				<Box pt="5px">
					<Heading size="sm" pb="10px">
						{props.repo.full_name.split("/")[1]}
					</Heading>
					<Text fontSize="xs">description: {props.repo.description}</Text>
					<Text fontSize="xs" pt="5px">
						Last Updated: {formatDate(props.repo.updated_at)}
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
				<Link href={props.repo.html_url}>
					<Button
						flex="0.7"
						variant="outline"
						color={"blue"}
						borderColor={"blue"}>
						<Text fontSize="sm" px="5px">
							VIEW REPOSITORY
						</Text>
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};

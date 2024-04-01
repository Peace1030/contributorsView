"use client";
import { useState, useEffect } from "react";
import { Grid, Skeleton, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ContributorCard } from "@/components/Cards";

import { Header } from "./Header";

import { getContributors, type Contributor } from "@/utils/githubApi";

const Home: React.FC = () => {
	const [contributors, setContributors] = useState<Contributor[]>([]);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [desc, setDesc] = useState<string>("");

	const [page, setPage] = useState<number>(1);

	const fetchMoreContributors = async () => {
		const newContributors = await getContributors(page);
		setContributors([...contributors, ...newContributors]);
		setPage(page + 1);
		if (newContributors.length === 0) {
			setHasMore(false);
			if (contributors.length === 0)
				setDesc("There is no contributors for the repository.");
		}
	};

	useEffect(() => {
		fetchMoreContributors();
	}, []);

	return (
		<>
			<Header />
			<InfiniteScroll
				dataLength={contributors.length}
				next={fetchMoreContributors}
				hasMore={true}
				loader={<Skeleton height="50px" />}
				style={{ overflow: "hidden", paddingTop: "30px" }}>
				<Grid
					templateColumns={{
						base: "repeat(1, 1fr)",
						sm: "repeat(2, 1fr)",
						md: "repeat(3, 1fr)",
						lg: "repeat(4, 1fr)",
					}}
					gap={{ base: "10px", lg: "15px" }}>
					{contributors.map((contributor, i) => (
						<ContributorCard contributor={contributor} key={i} />
					))}
				</Grid>
				<Text>{desc}</Text>
			</InfiniteScroll>
		</>
	);
};

export default Home;

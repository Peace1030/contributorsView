"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Grid, Skeleton, Text } from "@chakra-ui/react";

import InfiniteScroll from "react-infinite-scroll-component";
import { RepoCard } from "@/components/Cards";
import { Repository, getRepos } from "@/utils/githubApi";

export default function Home() {
	const username = usePathname().split("/")[1];
	const [repos, setRepos] = useState<Repository[]>([]);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [desc, setDesc] = useState<string>("");

	const [page, setPage] = useState<number>(1);

	const fetchMoreRepos = async () => {
		const newRepos = await getRepos(username, page);
		setRepos([...repos, ...newRepos]);
		setPage(page + 1);
		if (newRepos.length === 0) {
			setHasMore(false);
			if (repos.length === 0) setDesc("There is no repositories for the user.");
		}
	};

	useEffect(() => {
		fetchMoreRepos();
	}, []);

	return (
		<InfiniteScroll
			dataLength={repos.length}
			next={fetchMoreRepos}
			hasMore={hasMore}
			loader={hasMore && <Skeleton height="50px" />}
			style={{ overflow: "hidden", paddingTop: "20px" }}>
			<Grid
				templateColumns={{
					base: "repeat(1, 1fr)",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
					lg: "repeat(4, 1fr)",
				}}
				gap={{ base: "10px", lg: "15px" }}
				py="10px">
				{repos.map((repo, i) => (
					<RepoCard repo={repo} key={i} />
				))}
			</Grid>
			<Text>{desc}</Text>
		</InfiniteScroll>
	);
}

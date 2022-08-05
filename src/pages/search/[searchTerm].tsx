import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { apiKey } from "../index";
import Link from "next/link";
import Footer from "../../components/Footer";
import Head from "next/head";

interface Gif {
	title: string;
	id: string;
	url: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const searchTerm = context.query.searchTerm as string;
	const Gifs = await fetch(
		`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=9`
	);
	const GifsJson = await Gifs.json();
	const GifsData = GifsJson.data.map((e: any) => {
		return {
			title: e.title,
			id: e.id,
			url: e.images.original.url,
		};
	}) as Gif[];
	return {
		props: {
			GifsData,
		},
	};
};

interface SearchProps {
	GifsData: Gif[];
}

const Search: NextPage<SearchProps> = ({ GifsData }) => {
	const router = useRouter();
	return (
		<div className="flex flex-col items-center p-10 font-sans bg-slate-200 h-screen">
			<Head>
				<title>Search results for: {router.query.searchTerm}</title>
				<meta
					name="description"
					content={GifsData.map((each, index) => each.title).join(", ")}
				></meta>
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="/styles.css" />
			</Head>
			<div className="text-3xl text-slate-800">
				Search Results For: {router.query.searchTerm}
			</div>
			<Link href="/">
				<a className="rounded-md bg-slate-400 text-slate-700 p-4">Home</a>
			</Link>
			<div className="">This page is server side rendered</div>
			<div className="grid grid-cols-3 p-10">
				{GifsData &&
					GifsData.map((e: Gif) => {
						return (
							<div key={e.id}>
								<div className="text-3xl font-semibold">{e.title}</div>
								<img src={e.url} alt={e.title} />
							</div>
						);
					})}
			</div>
			<Footer link="https://tailwindcss.com/docs/flex-shrink" />
		</div>
	);
};

export default Search;

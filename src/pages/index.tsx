import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

export const apiKey = "Yvb97o7LIJdKrseZ5U6HuF2bg2vNo89c";

const searchAtom = atom<string>("cats");
const searchResultsAtom = atom<Gif[]>([]);

interface Gif {
	title: string;
	id: string;
	url: string;
}

export const getStaticProps: GetStaticProps = async () => {
	const Gifs = await fetch(
		`https://api.giphy.com/v1/gifs/search?q=cats&api_key=${apiKey}&limit=9`
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

interface HomeProps {
	GifsData: Gif[];
}

interface HomeFormElements extends HTMLFormControlsCollection {
	searchInput: HTMLInputElement;
}

interface HomeForm extends HTMLFormElement {
	readonly elements: HomeFormElements;
}

const Home: NextPage<HomeProps> = ({ GifsData }) => {
	const [searchTerm, setSearchTerm] = useAtom(searchAtom);
	const [searchResults, setSearchResults] = useAtom(searchResultsAtom);

	const handleSearch = async (event: React.FormEvent<HomeForm>) => {
		event.preventDefault();
		setSearchTerm(event.currentTarget.elements.searchInput.value);
		const Gifs = await fetch(
			`https://api.giphy.com/v1/gifs/search?q=${event.currentTarget.elements.searchInput.value}&api_key=${apiKey}&limit=9`
		);
		const GifsJson = await Gifs.json();
		setSearchResults(
			GifsJson.data.map((e: any) => {
				return {
					title: e.title,
					id: e.id,
					url: e.images.original.url,
				};
			}) as Gif[]
		);
	};

	useEffect(() => {
		setSearchResults(GifsData);
	}, [GifsData]);

	return (
		<div className="flex flex-col items-center p-10 font-sans bg-slate-200 h-screen">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="text-6xl font-bold text-slate-800 pb-10">Giphy Search App</div>
			<div className="pb-4">
				This page is initially statically rendered for &quot;cats&quot; then client side
				rendered after that
			</div>

			<form className="flex flex-row items-center space-x-4" onSubmit={handleSearch}>
				<input
					id="searchInput"
					type="text"
					className="w-96 p-3 border-2 border-slate-300 rounded-lg"
					placeholder="Search for gifs"
				/>
				<button type="submit" className="w-32 p-3 border-2 border-slate-300 rounded-lg">
					Search
				</button>
			</form>

			<div className="flex items-center justify-center pt-4">
				Share this search with others:&nbsp;
				<Link href="/search/[pid]" as={`/search/${searchTerm}`}>
					<a className="text-slate-800">{`http://localhost:3000/search/${searchTerm}`}</a>
				</Link>
			</div>

			<div className="pt-10">Displaying results for: {searchTerm}</div>

			<div className="grid grid-cols-3 p-10">
				{searchResults &&
					searchResults.map((e: Gif) => {
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

export default Home;

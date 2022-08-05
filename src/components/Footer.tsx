import Link from "next/link";

interface FooterProps {
	link: string;
}

const Footer = ({ link }: FooterProps) => {
	return (
		<>
			<div className="flex bg-slate-900 text-slate-100 w-full p-4">
				<div className="flex-auto w-8 bg-slate-700">My App</div>
				<div className="flex-auto w-16 justify-end bg-slate-500">
					Visit&nbsp;
					<Link href="https://giphy.com/">
						<a className="text-green-500">Giphy</a>
					</Link>
				</div>
				<div className="flex-auto w-96 bg-slate-300">
					<Link href={link}>
						<a className="text-red-500">Other Link</a>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Footer;

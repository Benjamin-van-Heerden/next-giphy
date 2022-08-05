import Footer from "../components/Footer";

const About = () => {
	return (
		<div className="flex flex-col p-10 text-center space-y-3">
			<div className="text-5xl pb-2">About</div>
			<div>This is the about page</div>
			<div>
				Love giphys? So do we. use our app <b>giphy search</b> to find the perfect giphy for
				any occasion.
			</div>

			<div className="text-3xl">Why do people love giphys?</div>

			<div>
				Some people may work better with words, others with numbers, but everyone gets
				pictures. 90% of information transmitted to the human brain is visual.
			</div>

			<div>
				The old saying &quot;a picture is worth a thousand words&quot; is quite cliche. But
				that doesn&apos;t make it any less true, especially in marketing and particularly in
				the instant-gratification, short attention span world we live in today. Getting
				folks to retain (or even register) your messages and content or take action is
				harder than ever, especially if all you are giving them is words.
			</div>

			<div>
				Images are stronger than words. However, the fast-moving nature of GIFs make them
				stronger than images and their shorter length make them more digestible than video.
				That&apos;s the short answer.
			</div>
			<Footer link="https://tailwindcss.com/docs/flex-shrink" />
		</div>
	);
};

export default About;

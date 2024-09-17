import Link from "next/link";

import { Button } from "@/components/ui/button";
import LayoutContainer from "@/components/LayoutContainer";

const HomePage = () => {
	return (
		<LayoutContainer>
			<article>
				<section className="pb-36 pt-36">
					<h1 className="text-4xl font-bold tracking-wide text-sky-800">
						Your settings are well configured
					</h1>

					<p className="my-5">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, cum
						reprehenderit. Doloremque corrupti aliquid nihil magnam impedit, quisquam
						soluta? Expedita et dolorum quo laudantium odio esse, distinctio nulla hic ea.
					</p>

					<Button asChild>
						<Link href="/admin">Admin Area</Link>
					</Button>
				</section>
			</article>
		</LayoutContainer>
	);
};

export default HomePage;

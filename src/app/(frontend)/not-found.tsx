import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

const NotFound = () => {
	return (
		<Container>
			<div className="py-64">
				<div className="prose max-w-none">
					<h1 className="text-primary" style={{ marginBottom: 0 }}>
						404
					</h1>
					<p className="mb-4 text-foreground">The page you are looking for could not be found.</p>
				</div>

				<Button className="rounded-lg font-semibold uppercase" variant="default" asChild>
					<Link href="/">Go To Homepage</Link>
				</Button>
			</div>
		</Container>
	);
};

export default NotFound;

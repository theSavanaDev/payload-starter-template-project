import { draftMode } from "next/headers";

export async function GET(): Promise<Response> {
	const draftModeValue = await draftMode();

	draftModeValue.disable();

	return new Response("Draft mode is disabled.");
}

import { Plugin } from "payload";

import { uploadthingStorage } from "@payloadcms/storage-uploadthing";

import { Media } from "@/payload/collections/media/schema";

const uploadthingToken = process.env.UPLOADTHING_TOKEN!;

export const plugins: Plugin[] = [
	uploadthingStorage({
		collections: {
			[Media.slug]: true,
		},
		options: {
			token: uploadthingToken,
			acl: "public-read",
		},
	}),
];

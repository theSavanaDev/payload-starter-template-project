import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import { BoldFeature, ItalicFeature, LinkFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { UnderlineFeature } from "@payloadcms/richtext-lexical";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { buildConfig } from "payload";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media } from "@/payload/collections/media/schema";
import { Users } from "@/payload/collections/users/schema";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const databaseURI = process.env.NODE_ENV === "development" ? process.env.DATABASE_URI_DEV! : process.env.DATABASE_URI_PRD!;
const payloadSecret = process.env.PAYLOAD_SECRET!;
const resendAPIKey = process.env.RESEND_API_KEY!;
const uploadthingToken = process.env.UPLOADTHING_TOKEN!;

export default buildConfig({
	admin: {
		importMap: {
			baseDir: path.resolve(dirname),
		},
		user: Users.slug,
	},
	collections: [Media, Users],
	db: mongooseAdapter({ url: databaseURI }),
	editor: lexicalEditor({
		features: () => {
			return [
				UnderlineFeature(),
				BoldFeature(),
				ItalicFeature(),
				LinkFeature({
					enabledCollections: [],
					fields: ({ defaultFields }) => {
						const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
							if ("name" in field && field.name === "url") return false;
							return true;
						});

						return [
							...defaultFieldsWithoutUrl,
							{
								name: "url",
								label: ({ t }) => t("fields:enterURL"),
								type: "text",
								required: true,
								admin: {
									condition: ({ linkType }) => linkType !== "internal",
								},
							},
						];
					},
				}),
			];
		},
	}),
	email: resendAdapter({
		defaultFromAddress: "mailer@s3interdev.com",
		defaultFromName: "Mailer @ S3",
		apiKey: resendAPIKey,
	}),
	globals: [],
	plugins: [
		uploadthingStorage({
			collections: {
				[Media.slug]: true,
			},
			options: {
				token: uploadthingToken,
				acl: "public-read",
			},
		}),
	],
	secret: payloadSecret,
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});

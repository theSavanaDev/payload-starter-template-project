import { mongooseAdapter } from "@payloadcms/db-mongodb";

import { buildConfig } from "payload";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media } from "@/payload/collections/media/schema";
import { Users } from "@/payload/collections/users/schema";

import { lexical } from "@/payload/fields/lexical/schema";
import { resend } from "@/payload/fields/resend/schema";

import { plugins } from "@/payload/plugins/schema";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const databaseURI = process.env.NODE_ENV === "development" ? process.env.DATABASE_URI_DEV! : process.env.DATABASE_URI_PRD!;
const payloadSecret = process.env.PAYLOAD_SECRET!;

export default buildConfig({
	admin: {
		importMap: {
			baseDir: path.resolve(dirname),
		},
		user: Users.slug,
	},
	collections: [Media, Users],
	db: mongooseAdapter({ url: databaseURI }),
	editor: lexical,
	email: resend,
	globals: [],
	plugins: [...plugins],
	secret: payloadSecret,
	sharp,
	typescript: {
		autoGenerate: true,
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});

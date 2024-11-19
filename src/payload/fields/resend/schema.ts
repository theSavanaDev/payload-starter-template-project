import { resendAdapter } from "@payloadcms/email-resend";

import { Config } from "payload";

const resendAPIKey = process.env.RESEND_API_KEY!;

export const resend: Config["email"] = resendAdapter({
	defaultFromAddress: "hello@s3interdev.com",
	defaultFromName: "Mailer @ S3",
	apiKey: resendAPIKey,
});

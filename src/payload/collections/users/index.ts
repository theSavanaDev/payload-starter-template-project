import { authenticated } from "@/payload/access/authenticated";

import populateFullName from "@/payload/collections/users/hooks/populate-full-name";

import type { CollectionConfig } from "payload";

const Users: CollectionConfig = {
	slug: "users",
	labels: {
		singular: "User",
		plural: "Users",
	},
	admin: {
		defaultColumns: ["firstName", "lastName", "email", "createdAt"],
		useAsTitle: "fullName",
	},
	access: {
		admin: authenticated,
		create: authenticated,
		delete: authenticated,
		read: authenticated,
		update: authenticated,
	},
	auth: true,
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "firstName",
					label: "First Name",
					type: "text",
					required: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "lastName",
					label: "Last Name",
					type: "text",
					required: true,
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			name: "fullName",
			label: "Full Name",
			type: "text",
			admin: {
				position: "sidebar",
				readOnly: true,
			},
			hooks: {
				beforeValidate: [populateFullName],
			},
		},
	],
};

export default Users;

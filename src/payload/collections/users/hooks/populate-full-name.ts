import type { FieldHook } from "payload";

const populateFullName: FieldHook = async ({ data }) => {
	return `${data?.lastName}, ${data?.firstName}`;
};

export default populateFullName;

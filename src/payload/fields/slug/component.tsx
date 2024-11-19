"use client";

import { MouseEvent, useCallback, useEffect } from "react";

import { TextFieldClientProps } from "payload";

import { useField, Button, TextInput, FieldLabel, useFormFields, useForm } from "@payloadcms/ui";

import { formatSlug } from "@/payload/fields/slug/hooks/format-slug";

import "@/payload/fields/slug/schema.scss";

type SlugComponentProps = {
	fieldToUse: string;
	checkboxFieldPath: string;
} & TextFieldClientProps;

export const SlugComponent = ({
	field,
	fieldToUse,
	checkboxFieldPath: checkboxFieldPathFromProps,
	path,
	readOnly: readOnlyFromProps,
}: SlugComponentProps) => {
	const { label } = field;

	const checkboxFieldPath = path?.includes(".") ? `${path}.${checkboxFieldPathFromProps}` : checkboxFieldPathFromProps;

	const { value, setValue } = useField<string>({ path: path || field.name });

	const { dispatchFields } = useForm();

	// the value of the checkbox
	// we're using separate useFormFields to minimise re-renders
	const checkboxValue = useFormFields(([fields]) => {
		return fields[checkboxFieldPath]?.value as string;
	});

	// the value of the field we're listening to for the slug
	const targetFieldValue = useFormFields(([fields]) => {
		return fields[fieldToUse]?.value as string;
	});

	useEffect(() => {
		if (checkboxValue) {
			if (targetFieldValue) {
				const formattedSlug = formatSlug(targetFieldValue);

				if (value !== formattedSlug) setValue(formattedSlug);
			} else {
				if (value !== "") setValue("");
			}
		}
	}, [targetFieldValue, checkboxValue, setValue, value]);

	const handleLock = useCallback(
		(e: MouseEvent<Element>) => {
			e.preventDefault();

			dispatchFields({
				type: "UPDATE",
				path: checkboxFieldPath,
				value: !checkboxValue,
			});
		},
		[checkboxValue, checkboxFieldPath, dispatchFields],
	);

	const readOnly = readOnlyFromProps || checkboxValue;

	return (
		<div className="field-type slug-field-component">
			<div className="label-wrapper">
				<FieldLabel htmlFor={`field-${path}`} label={label} />

				<Button className="lock-button" buttonStyle="none" onClick={handleLock}>
					{checkboxValue ? "Unlock" : "Lock"}
				</Button>
			</div>

			<TextInput value={value} onChange={setValue} path={path || field.name} readOnly={Boolean(readOnly)} />
		</div>
	);
};

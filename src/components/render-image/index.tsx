/**
 *
 * use the `object-contain` utility to resize an element’s content to stay contained within its container.
 *
 * <RenderImage className="object-contain" src={src} alt={alt} />
 *
 * use the `object-cover` utility to resize an element’s content to cover its container.
 *
 * <RenderImage className="object-cover" src={src} alt={alt} />
 *
 */

import Image from "next/image";

import { cn } from "@/lib/utils";

type RenderImageProps = { src: string; alt: string; className?: string };

export const RenderImage = ({ src, alt, className }: RenderImageProps) => {
	return (
		<Image
			src={src}
			alt={alt}
			fill
			priority
			quality={89}
			sizes="(max-width: 640px) 100vw, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, 1280px"
			className={cn("absolute max-h-full max-w-full", className)}
		/>
	);
};

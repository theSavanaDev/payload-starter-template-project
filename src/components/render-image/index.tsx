import Image from "next/image";

type RenderImageProps = { src: string; alt: string };

export const RenderImage = ({ src, alt }: RenderImageProps) => {
	return (
		<Image
			src={src}
			alt={alt}
			fill
			priority
			quality={89}
			sizes="(max-width: 640px) 100vw, (max-width: 768px) 640px, (max-width: 1024px) 768px, (max-width: 1280px) 1024px, 1280px"
			className="absolute max-h-full max-w-full object-contain"
		/>
	);
};

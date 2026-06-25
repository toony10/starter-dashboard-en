import Image from "next/image";

import { cn } from "@/lib/utils";
import Link from "next/link";

type LogoProps = {
    width?: number;
    height?: number;
    className?: string;
    alt?: string;
};

export function Logo({
    width = 140,
    height = 40,
    className,
    alt = "Starter Dash",
}: LogoProps) {
    return (
        <Link href="/"
            className={ cn("relative shrink-0", className) }
            style={ { width, height } }
        >
            <Image
                src="/assets/images/logo-light.webp"
                alt={ alt }
                width={ width }
                height={ height }
                className="object-contain dark:hidden"
                priority
            />
            <Image
                src="/assets/images/logo-dark.webp"
                alt={ alt }
                width={ width }
                height={ height }
                className="absolute inset-0 hidden object-contain dark:block"
                priority
            />
        </Link>
    );
}

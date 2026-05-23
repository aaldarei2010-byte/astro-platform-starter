"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-[#a6783f]"
                viewBox="0 0 696 316"
                fill="none"
                aria-hidden="true"
            >
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.08 + path.id * 0.025}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.2, 0.5, 0.2],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export interface HeroProps {
    brand?: string;
    tagline?: string;
    description?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
}

export function Hero({
    brand = "توب تن للأسر المنتجة",
    tagline = "من القوع إلى بيوت الناس… طعم محلي وأثر مستدام",
    description = "توب تن هو محل في القوع يدعم الأسر المنتجة في بيع الأطعمة الشعبية، الحلويات، القهوة، والمشروبات، ويحوّل مهارات الطبخ المنزلي إلى مصدر دخل وفرصة نجاح.",
    primaryLabel = "شاهد منتجاتنا",
    primaryHref = "#shelves",
    secondaryLabel = "تواصل معنا",
    secondaryHref = "#contact",
}: HeroProps) {
    const words = brand.split(" ");

    return (
        <section className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fbf7f0] via-[#faf6ef] to-[#f1e9d9]">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-5 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.4 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e4d8c2] bg-white/70 px-4 py-1.5 text-sm font-medium text-[#7a6a55] backdrop-blur">
                        <MapPin className="h-4 w-4 text-[#c8a24b]" />
                        القوع — العين · منذ أبريل ٢٠١٩
                    </span>

                    <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-[1.15] tracking-tight">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block ml-3 last:ml-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[#5a3a22] to-[#a6783f]"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mx-auto mb-4 max-w-2xl text-xl sm:text-2xl font-bold text-[#6f4e2e]"
                    >
                        {tagline}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="mx-auto mb-10 max-w-2xl text-base sm:text-lg leading-relaxed text-[#7a6a55]"
                    >
                        {description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="h-13 rounded-full px-8 text-base font-bold shadow-lg shadow-[#a6783f]/20 transition hover:-translate-y-0.5"
                        >
                            <a href={primaryHref}>
                                {primaryLabel}
                                <ArrowLeft className="mr-1 h-5 w-5" />
                            </a>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-13 rounded-full border-[#d8c6a6] bg-white/70 px-8 text-base font-bold text-[#6f4e2e] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
                        >
                            <a href={secondaryHref}>{secondaryLabel}</a>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

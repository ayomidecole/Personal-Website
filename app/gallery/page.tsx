import { MondrianGrid } from "./MondrianGrid";

const galleryImages: { src: string; alt: string }[] = [
  { src: "/gallery/01.png", alt: "Person traveling through time in a black hole" },
  { src: "/gallery/02.png", alt: "Abstract digital art of an ongoing soccer game" },
  { src: "/gallery/03.png", alt: "Cyberpunk soccer" },
  { src: "/gallery/04.png", alt: "Industrial Age factory" },
  { src: "/gallery/05.png", alt: "Synthwave soccer" },
  { src: "/gallery/06.png", alt: "Modern digital art" },
  { src: "/gallery/07.png", alt: "Abstract digital art" },
  { src: "/gallery/08.png", alt: "Abstract cosmic digital art" },
  { src: "/gallery/09.png", alt: "DALL·E Wars image comparison" },
  { src: "/gallery/10.png", alt: "Person traveling through a black hole" },
  { src: "/gallery/11.png", alt: "Mystical collection of written articles in vaporware" },
  { src: "/gallery/12.png", alt: "Abstract digital art" },
  { src: "/gallery/13.png", alt: "Cyberpunk soccer game" },
  { src: "/gallery/14.png", alt: "Person traveling through time in a black hole" },
  { src: "/gallery/15.png", alt: "Post-modern representation of traveling through time in a black hole" },
  { src: "/gallery/16.png", alt: "Soccer background" },
  { src: "/gallery/17.png", alt: "Expressive oil painting of a media mashup" },
  { src: "/gallery/18.png", alt: "Person traveling through time in a black hole" },
  { src: "/gallery/19.png", alt: "Post-modern representation of a person in a black hole" },
  { src: "/gallery/20.png", alt: "Industrial Age factory" },
  { src: "/gallery/21.png", alt: "Abstract digital art" },
  { src: "/gallery/22.png", alt: "Futuristic painting" },
  { src: "/gallery/23.png", alt: "Abstract digital art" },
  { src: "/gallery/24.png", alt: "Abstract digital art" },
  { src: "/gallery/25.png", alt: "DALL·E Wars" },
  { src: "/gallery/26.png", alt: "Abstract digital art" },
  { src: "/gallery/27.png", alt: "Abstract digital art" },
  { src: "/gallery/28.png", alt: "Person traveling through time in a black hole" },
  { src: "/gallery/29.png", alt: "Mystical collection of books in vaporware" },
  { src: "/gallery/30.png", alt: "Abstract digital art" },
  { src: "/gallery/31.png", alt: "Article papers" },
  { src: "/gallery/32.png", alt: "Expressive oil painting of a media mashup" },
  { src: "/gallery/33.png", alt: "Modern digital art of deep tech" },
  { src: "/gallery/34.png", alt: "Modern digital art" },
  { src: "/gallery/35.png", alt: "Abstract digital art" },
  { src: "/gallery/36.png", alt: "Expressive oil pixel multi-color painting" },
  { src: "/gallery/37.png", alt: "Human with a dinosaur in the storms of Jupiter" },
];

export default function Gallery() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 flex items-baseline gap-2 font-mono text-2xl font-bold tracking-tight text-[var(--foreground)]">
        <span className="terminal-prompt">&gt;</span>
        <span>Gallery</span>
        <span className="terminal-cursor" aria-hidden />
      </h1>
      <p className="mb-8 font-mono text-sm text-[var(--muted)]">
        &gt; AI-generated images
      </p>
      {galleryImages.length === 0 ? (
        <div className="panel rounded-lg border border-[var(--border)] bg-[var(--surface)] px-6 py-12 text-center">
          <p className="text-[var(--muted)]">
            No images yet. Add images to <code className="text-[var(--accent)]">public/gallery/</code> and
            add their paths to the <code className="text-[var(--accent)]">galleryImages</code> array in{" "}
            <code className="text-[var(--accent)]">app/gallery/page.tsx</code>.
          </p>
        </div>
      ) : (
        <MondrianGrid images={galleryImages} />
      )}
    </div>
  );
}

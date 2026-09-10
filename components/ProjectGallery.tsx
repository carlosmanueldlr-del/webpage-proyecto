import { Photo } from "./ArchPhoto";
import { RevealImage, RevealText } from "./Reveal";
import type { ProjectImage } from "@/lib/projects";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Counter({ index, total }: { index: number; total: number }) {
  return (
    <span className="absolute bottom-3 right-3 bg-ink/70 px-2 py-1 text-micro tracking-label text-paper sm:bottom-4 sm:right-4">
      {pad(index)} / {pad(total)}
    </span>
  );
}

function Caption({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="mt-3 text-micro uppercase tracking-label text-stone">{text}</p>;
}

export default function ProjectGallery({
  images,
  projectName,
}: {
  images: ProjectImage[];
  projectName: string;
}) {
  const total = images.length;
  const rows: React.ReactNode[] = [];
  let i = 0;
  let rowKey = 0;

  while (i < images.length) {
    const pattern = rowKey % 3;
    rowKey += 1;

    if (pattern === 0) {
      const img = images[i];
      rows.push(
        <div key={rowKey} className="w-full">
          <RevealImage>
            <div className="relative">
              <Photo seed={img.seed} src={img.src} ratio="landscape" alt={`${projectName} — ${i + 1}`} />
              <Counter index={i + 1} total={total} />
            </div>
          </RevealImage>
          <div className="editorial-container">
            <Caption text={img.caption} />
          </div>
        </div>,
      );
      i += 1;
    } else if (pattern === 1 && i + 1 < images.length) {
      const a = images[i];
      const b = images[i + 1];
      rows.push(
        <div key={rowKey} className="editorial-container grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <RevealImage>
              <div className="relative">
                <Photo seed={a.seed} src={a.src} ratio={a.ratio} alt={`${projectName} — ${i + 1}`} />
                <Counter index={i + 1} total={total} />
              </div>
            </RevealImage>
            <Caption text={a.caption} />
          </div>
          <div className="sm:pt-10">
            <RevealImage delay={0.1}>
              <div className="relative">
                <Photo seed={b.seed} src={b.src} ratio={b.ratio} alt={`${projectName} — ${i + 2}`} />
                <Counter index={i + 2} total={total} />
              </div>
            </RevealImage>
            <Caption text={b.caption} />
          </div>
        </div>,
      );
      i += 2;
    } else {
      const img = images[i];
      rows.push(
        <div key={rowKey} className="editorial-container">
          <div className="mx-auto max-w-2xl">
            <RevealImage>
              <div className="relative">
                <Photo seed={img.seed} src={img.src} ratio={img.ratio} alt={`${projectName} — ${i + 1}`} />
                <Counter index={i + 1} total={total} />
              </div>
            </RevealImage>
            <Caption text={img.caption} />
          </div>
        </div>,
      );
      i += 1;
    }
  }

  return <div className="flex flex-col gap-20 sm:gap-28">{rows}</div>;
}

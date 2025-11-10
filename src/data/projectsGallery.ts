import greenProjectPreview from '@/assets/green_project_preview.png';
import floralFiftyNine from '@/assets/floralfiftynine.png';
import chromeCameoPreview from '@/assets/chrome_cameo_preview.png';
import aiPromptPreview from '@/assets/ai_prompt.png';
import samanthaPreview from '@/assets/samantha.png';

// Local GalleryProject type (mirrors the deleted ProjectGallery component shape)
type GalleryProject = {
  id: string;
  title: string;
  tag?: string;
  href: string;
  cover: string;
  alt?: string;
  ratio?: '4:5' | '16:9' | '1:1';
};

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "graphic-design-gallery",
    title: "Graphic Design Gallery",
    tag: "Design Portfolio",
    href: "/project/graphic-design-gallery",
    cover: greenProjectPreview,
    alt: "Graphic Design Gallery creative portfolio showcase",
    ratio: "4:5"
  },
  {
    id: "floral-design-svg",
    title: "Floral Design SVG",
    tag: "Web App",
    href: "/project/floral-design-svg",
    cover: floralFiftyNine,
    alt: "Floral Design SVG illustration generator",
    ratio: "4:5"
  },
  {
    id: "cameo-store",
    title: "Cameo Store",
    tag: "E-commerce",
    href: "/project/cameo-store",
    cover: chromeCameoPreview,
    alt: "Cameo Store minimal e-commerce interface",
    ratio: "16:9"
  },
  {
    id: "icon-library",
    title: "American Heritage Icons",
    tag: "Icon System",
    href: "/project/icon-library",
    cover: samanthaPreview,
    alt: "American Heritage icon system library",
    ratio: "4:5"
  },
  {
    id: "ai-prompt-studio-vehicles",
    title: "AI Prompt Studio",
    tag: "AI Tooling",
    href: "/project/ai-prompt-studio-vehicles",
    cover: aiPromptPreview,
    alt: "AI Prompt Studio vehicle generation interface",
    ratio: "16:9"
  },
];

import meLeft from '@/assets/me_left2.webp';
import wallLeft from '@/assets/wall_left.webp';
import wallRight from '@/assets/wall_right.webp';
import left2 from '@/assets/left_2.webp';
import right2 from '@/assets/right_2.webp';
import farRight from '@/assets/far_right.webp';
import pizzaMan from '@/assets/pizza_man.webp';

export const GALLERY_IMAGES = [
  {
    src: farRight,
    alt: 'Gallery image - far right',
  },
  {
    src: pizzaMan,
    alt: 'Pizza man',
  },
  {
    src: wallLeft,
    alt: 'Gallery wall panorama - left section',
  },
  {
    src: wallRight,
    alt: 'Gallery wall panorama - right section',
  },
  {
    src: meLeft,
    alt: 'Self portrait - left',
  },
  {
    src: left2,
    alt: 'Gallery image - left 2',
  },
  {
    src: right2,
    alt: 'Gallery image - right 2',
  },
] as const;

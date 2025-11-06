import meLeft from '@/assets/me_left2.png';
import wallLeft from '@/assets/wall_left.png';
import wallRight from '@/assets/wall_right.png';
import left2 from '@/assets/left_2.png';
import right2 from '@/assets/right_2.png';
import farRight from '@/assets/far_right.png';

export const GALLERY_IMAGES = [
  {
    src: farRight,
    alt: 'Gallery image - far right',
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

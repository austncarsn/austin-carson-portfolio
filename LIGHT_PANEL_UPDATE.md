# Light Frosted Glass Panel Update

## Changes Needed

Replace the dark frosted glass panel with a light one for better readability:

### 1. Frosted Glass Panel (line ~218)
```tsx
<div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-white/98 via-white/95 to-white/80 backdrop-blur-xl -z-10" />
```

### 2. Accent Line (line ~220)
```tsx
<div className="absolute inset-x-0 bottom-[65%] h-[1px] bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent -z-10" />
```

### 3. Text Colors - Change all portrait variant text to dark:
- Category: `text-neutral-700`
- Year: `text-neutral-600`  
- Divider dot: `bg-neutral-400`
- Title: `text-neutral-900`
- Role: `text-neutral-700`
- Subtitle: `text-neutral-800`
- Description: `text-neutral-700`

### 4. Button Colors for Portrait:
- Primary button: `bg-neutral-900 text-white hover:bg-neutral-800`
- Secondary button: `border-neutral-300 text-neutral-900 hover:bg-neutral-100 hover:border-neutral-400`
- GitHub button: `bg-neutral-200/80 text-neutral-900 border-neutral-300 hover:bg-neutral-200`

This creates a crisp, high-contrast design with excellent readability!

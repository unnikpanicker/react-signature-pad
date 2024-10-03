export interface IconColor {
  clear?: string;
  copy?: string;
  download?: string;
}

export interface SignaturePadProps {
  width: number;
  height: number;
  penColor?: string;
  onCopy?: (dataURL: string) => void;
  onDownload?: (dataURL: string) => void;
  onClear?: () => void;
  download?: boolean;
  downloadFilename?: string;
  downloadFormat?: "image/png" | "image/jpeg";
  padStyleClassName?: React.CSSProperties;
  iconColor?: IconColor;
}

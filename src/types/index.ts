export interface IconColor {
  clear?: string;
  save?: string;
  download?: string;
}

export interface SignaturePadProps {
  width?: number;
  height?: number;
  theme?: "light" | "dark";
  onSave?: (dataURL: string) => void;
  onDownload?: (dataURL: string) => void;
  onClear?: () => void;
  download?: boolean;
  downloadFilename?: string;
  downloadFormat?: "image/png" | "image/jpeg";
  padStyles?: React.CSSProperties;
  iconColor?: IconColor;
}

type BlackOrWhite = "white" | "black";
export interface THEME {
  penColor: {
    light: BlackOrWhite;
    dark: BlackOrWhite;
  };
  backGroundColor: {
    light: BlackOrWhite;
    dark: BlackOrWhite;
  };
}

import { useEffect, useRef, useState } from "react";
import { THEME } from "../utils/theme";

const useSignaturePad = (
  width: number,
  height: number,
  theme: "light" | "dark" = "light",
  downloadFilename: string = "signature",
  downloadFormat: "image/png" | "image/jpeg" = "image/png",
  onCopy?: (dataURL: string) => void,
  onDownload?: (dataURL: string) => void,
  onClear?: () => void
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isClear, SetIsClear] = useState(true);
  const [penColor, setPenColor] = useState<"white" | "black">(
    THEME.penColor[theme]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      context.fillStyle = `${
        downloadFormat === "image/png" ? "transparent" : "white"
      }`;
      context.fillRect(0, 0, width, height);
      context.lineCap = "round";
      context.strokeStyle = penColor;
      context.lineWidth = 2;
    }
  }, [penColor]);

  const clearCanvas = () => {
    if (!isClear) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = `${
          downloadFormat === "image/png" ? "transparent" : "white"
        }`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        onClear && onClear();
        SetIsClear(true);
      }
    }
  };

  const startDrawing = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    setIsDrawing(true);
    SetIsClear(false);
    const { offsetX, offsetY } = getPosition(event);

    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const draw = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!isDrawing || !canvas || !context) return;

    const { offsetX, offsetY } = getPosition(event);

    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getPosition = (
    event:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();

    if (event.type.includes("touch")) {
      const touch = (event as React.TouchEvent).touches[0];
      return {
        offsetX: touch.clientX - (rect?.left ?? 0),
        offsetY: touch.clientY - (rect?.top ?? 0),
      };
    }

    const { offsetX, offsetY } = event.nativeEvent as MouseEvent;
    return { offsetX, offsetY };
  };

  const handleCopy = () => {
    if (canvasRef.current && !isClear) {
      const dataURL = canvasRef.current.toDataURL();
      onCopy && onCopy(dataURL);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas && !isClear) {
      const originalPenColor = penColor;
      setPenColor("black");

      const dataURL = canvas.toDataURL(downloadFormat);
      const fileName = `${downloadFilename}.${downloadFormat.split("/")[1]}`;
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = fileName;
      link.click();
      setPenColor(originalPenColor);
      onDownload && onDownload(dataURL);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgSrc = event.target?.result as string;
        if (imgSrc) {
          SetIsClear(false)
          drawImageOnCanvas(imgSrc);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImageOnCanvas = (imageSrc: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      clearCanvas();
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    }
  };

  return {
    canvasRef,
    penColor,
    isClear,
    clearCanvas,
    draw,
    handleCopy,
    handleDrop,
    handleDownload,
    startDrawing,
    stopDrawing,
  };
};

export default useSignaturePad;

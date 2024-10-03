import React, { useRef, useEffect, useState } from "react";
import Icons from "./Icons";
import { type SignaturePadProps } from "../types";

const SignaturePad: React.FC<SignaturePadProps> = ({
  width,
  height,
  penColor = "black",
  onCopy,
  onDownload,
  onClear,
  download = false,
  downloadFilename = "signature",
  downloadFormat = "image/png",
  padStyleClassName = {},
  iconColor = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isClear, SetIsClear] = useState(true);

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
    if (canvasRef.current && !isClear) {
      const dataURL = canvasRef.current.toDataURL(downloadFormat);
      const fileName = `${downloadFilename}.${downloadFormat.split("/")[1]}`;
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = fileName;
      link.click();
      onDownload && onDownload(dataURL);
    }
  };

  return (
    <div style={{ position: "relative", width: width, height: height }}>
      <canvas
        role="img"
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={padStyleClassName}
      ></canvas>
      <div
        onClick={clearCanvas}
        style={{
          position: "absolute",
          left: "6px",
          bottom: "5px",
          cursor: !isClear ? "pointer" : "auto",
        }}
      >
        <Icons
          iconType="clear"
          fillColor={isClear ? "#BFBFBF" : iconColor.clear}
        />
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "6px",
          bottom: "5px",
        }}
      >
        <div
          onClick={handleCopy}
          style={{ marginRight: "10px", cursor: !isClear ? "pointer" : "auto" }}
        >
          <Icons
            iconType="copy"
            fillColor={isClear ? "#BFBFBF" : iconColor.copy}
          />
        </div>
        {download && (
          <div
            onClick={handleDownload}
            style={{ cursor: !isClear ? "pointer" : "auto" }}
          >
            <Icons
              iconType="download"
              fillColor={isClear ? "#BFBFBF" : iconColor.download}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignaturePad;

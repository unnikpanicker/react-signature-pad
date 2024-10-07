import React from "react";
import Icons from "./Icons";
import { type SignaturePadProps } from "../types";
import useSignaturePad from "../hooks/useSignaturePad";
import { THEME } from "../utils/theme";

const SignaturePad: React.FC<SignaturePadProps> = ({
  width = 300,
  height = 150,
  onCopy,
  onDownload,
  onClear,
  theme = "light",
  download = false,
  downloadFilename = "signature",
  downloadFormat = "image/png",
  padStyles = {},
  iconColor = {},
}) => {
  const {
    canvasRef,
    isClear,
    clearCanvas,
    draw,
    handleCopy,
    handleDownload,
    startDrawing,
    stopDrawing,
  } = useSignaturePad(
    width,
    height,
    theme,
    downloadFilename,
    downloadFormat,
    onCopy,
    onDownload,
    onClear
  );

  const defaultPadStyles: React.CSSProperties = {
    position: "relative",
    width: width,
    height: height,
    background: THEME.backGroundColor[theme],
  };

  return (
    <div
      role="img"
      style={{
        ...padStyles,
        ...defaultPadStyles,
      }}
    >
      <canvas
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
            role="icon-download"
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

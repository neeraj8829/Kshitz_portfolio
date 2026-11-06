import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#F7F1E8",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#D96C4A",
          fontWeight: 800,
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderRadius: "8px",
          border: "1.5px solid rgba(43, 36, 32, 0.15)",
        }}
      >
        K
      </div>
    ),
    {
      ...size,
    }
  );
}


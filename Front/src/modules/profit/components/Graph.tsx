import {
  createChart,
  LineStyle,
  LineData,
  ColorType,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import style from "../styles/Graph.module.css";

interface ChartProps {
  data: LineData[];
  onClose: () => void;
}
const textColor = "black";

export default function Graph({ data, onClose }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "white" },
          textColor,
        },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        handleScroll: false,
        handleScale: false,
      });
      chart.timeScale().fitContent();

      const lineSeries = chart.addAreaSeries({
        lineColor: "#2962FF",
        lineWidth: 3,
        topColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0.28)",
        lineStyle: LineStyle.Solid,
      });

      lineSeries.setData(data);
      const handleResize = () => {
        chart.resize(
          chartContainerRef.current!.clientWidth,
          chartContainerRef.current!.clientHeight
        );
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
      };
    }
  }, [data]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.closeButtonContainer}>
        <button className={style.closeButton} onClick={handleClose}>
          X
        </button>
      </div>
      <div className={style.principalContainer_chart} ref={chartContainerRef} />
    </div>
  );
}

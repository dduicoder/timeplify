import { FC, useState } from "react";

import classes from "./Chart.module.scss";

type data = {
  x: number;
  y: number;
};

type PropsType = {
  xTotal: number;
  yTotal: number;
  datas: data[];
};

const Chart: FC<PropsType> = ({ xTotal, yTotal, datas }) => {
  const [maxX, setMaxX] = useState(xTotal);
  const [maxY, setMaxY] = useState(yTotal);

  return (
    <>
      <div className={classes.control}>
        <label htmlFor="x">Set maximum X</label>
        <input
          id="x"
          type="number"
          value={maxX}
          onChange={(e) => setMaxX(Number.parseInt(e.target.value))}
        />
        <label htmlFor="y">Set maximum Y</label>
        <input
          id="y"
          type="number"
          value={maxY}
          onChange={(e) => setMaxY(Number.parseInt(e.target.value))}
        />
      </div>
      <section className={classes.container}>
        <div className={classes.graduation}>
          <span>{maxY}</span>
          <span>{Math.round(maxY / 2)}</span>
          <span>0</span>
        </div>
        <div className={classes.chart}>
          {datas.map((data, i) => (
            <div
              className={classes.item}
              key={i}
              data-coord={`(${data.x}, ${data.y})`}
              style={{
                left: `${(100 * data.x) / maxX}%`,
                bottom: `${(100 * data.y) / maxY}%`,
              }}
            />
          ))}
        </div>
        <div className={classes.graduation}>
          <span>0</span>
          <span>{Math.round(maxX / 2)}</span>
          <span>{maxX}</span>
        </div>
      </section>
    </>
  );
};

export default Chart;

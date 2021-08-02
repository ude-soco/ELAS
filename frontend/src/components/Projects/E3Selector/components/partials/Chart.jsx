/* Radar Chart generation for the course details.
 * Draws either just the average ratings, or, if
 * available, both the average and course-specific
 */

import React from "react";

import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

import avg from "../../data/avg_ratings.json";

export default function RChart(props) {
    const avg_data = {
        fairness: avg.fairness,
        support: avg.support,
        material: avg.material,
        comprehensibility: avg.comprehensibility,
        fun: avg.fun,
        interesting: avg.interesting,
        gradefort: avg.grade_effort
    }
    const courseData = {
        fairness: parseFloat(props.fairness) || 0,
        support: parseFloat(props.support) || 0,
        material: parseFloat(props.material) || 0,
        comprehensibility: parseFloat(props.comprehensibility) || 0,
        fun: parseFloat(props.fun) || 0,
        interesting: parseFloat(props.interesting) || 0,
        gradefort: parseFloat(props.gradefort) || 0
    }
    const data = [
      {
        data: avg_data,
        meta: { color: "#C0C0C0" },
      },
      {
        data: courseData,
        meta: { color: "#F2994A" },
      },
    ];

    const captions = {
      // columns
      fairness: "Fairness",
      support: "Support",
      material: "Material",
      comprehensibility: "Conprehensibility",
      fun: "Fun",
      interesting: "Interesting",
      gradefort: "Grade/Effort",
    };

    return (
      <div class="chart">
        <RadarChart
          captions={captions}
          data={data}
          size={250}
        />
      </div>
    );
}

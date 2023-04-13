import React, { useState } from 'react';

const Report = () => {
  const [selectMonth, setSelectMonth] = useState('');
  const [reportData, setReportData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/report/${selectMonth}`);
      
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectMonthFormatted = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
  }).format(new Date(`${selectMonth}-01`));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="selectMonth">月間レポート</label>
        <input
          type="month"
          id="selectMonth"
          name="selectMonth"
          value={selectMonth}
          onChange={(e) => setSelectMonth(e.target.value)}
        />
        <button type="submit">見る</button>
      </form>

      <div>
        <h2>{`${selectMonthFormatted}のレポート`}</h2>

        <ul>
          {reportData.map((data) => (
            <li key={data.id}>
              {data.tab} - {data.item} - {data.date} - {data.item} - {data.amount} - {data.memo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Report;

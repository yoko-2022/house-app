import React, { useState,useEffect } from 'react';
import Chart from './Chart';

const Report = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = ('0' + (date.getMonth() + 1)).slice(-2);
  const [selectMonth, setSelectMonth] = useState(yyyy + '-' + mm);
  const [reportData, setReportData] = useState([]);
  const [incomePercentage, setIncomePercentage] = useState({});
  const [expensePercentage, setExpensePercentage] = useState({});
  const incomeItems = ['給料', 'おこづかい', '賞与', '副業', '投資', '臨時収入'];
  const expenseItems = ['食費','日用品','衣服','美容','交際費','医療費','教育費','光熱費','交通費','通信費','家賃'];
  
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
  
  useEffect(() => {
    if (selectMonth !== '') {
      fetchData();
    }
  }, [selectMonth]);
  
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/report/${selectMonth}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const selectYearMonth = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(`${selectMonth}-01`));
  
  const calculateTotalAmount = (item) => {
    const filteredData = reportData
    .filter((cur) =>
      cur.tab === item);
    const total = filteredData
    .reduce((acc, cur) => 
      acc + cur.amount
    , 0);
    return total;
  };

  const calculateTotalItems = (items) => {
    return items.reduce((acc, cur) => {
      const itemTotal = reportData
      .filter((item) =>
        item.item === cur)
      .reduce((itemAcc, itemCur) =>
        itemAcc + itemCur.amount
      , 0);
      return { ...acc, [cur]: itemTotal };
    }, {});
  }
  
  // reportData の値が変更されたときに実行される処理
  useEffect(() => {
    const calcTotalIncome = calculateTotalAmount("tabIncome");
    const calcTotalExpense = calculateTotalAmount("tabExpense");
    
    const totalIncomeItems = calculateTotalItems(incomeItems);
    const totalExpenseItems = calculateTotalItems(expenseItems);
    
    const calculatePercentage = (obj, total) => {
      const newObj = {};
      for (const [key, value] of Object.entries(obj)) {
        newObj[key] = Number(((value / total) * 100).toFixed(2));
      }
      return newObj;
    };
    
    const incomePercentage = calculatePercentage(totalIncomeItems, calcTotalIncome);
    const expensePercentage = calculatePercentage(totalExpenseItems, calcTotalExpense);
    
    setIncomePercentage(incomePercentage);
    setExpensePercentage(expensePercentage);
  }, [reportData]);
  
  return (
    <div className='report'>
      <form onSubmit={handleSubmit}>
        <input
          type="month"
          id="selectMonth"
          name="selectMonth"
          value={selectMonth}
          onChange={(e) => setSelectMonth(e.target.value)}
        />
        <label htmlFor="selectMonth">のレポートを</label>
        <button type="submit">表示する</button>
      </form>
      <div className="title">
        <h2>{`${selectYearMonth}の収入`}</h2>
        <h2>{`${selectYearMonth}の支出`}</h2>
      </div>
      <Chart incomePercentage={incomePercentage} expensePercentage={expensePercentage}/>
      <div className="item">
        <div>
          {Object.keys(calculateTotalItems(incomeItems)).map((key) => (
            <dl key={key}>
              <dt>{key}</dt>
              <dd>{calculateTotalItems(incomeItems)[key]}</dd>
            </dl>
          ))}
        </div>
        <div>
          {Object.keys(calculateTotalItems(expenseItems)).map((key) => (
            <dl key={key}>
              <dt>{key}</dt>
              <dd>{calculateTotalItems(expenseItems)[key]}</dd>
            </dl>
          ))}
        </div>
      </div>
      <div className="report-txt">
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>項目</th>
              <th>金額</th>
              <th>メモ</th>
            </tr>
          </thead>
          <tbody>
            {reportData.filter((data) => data.tab === 'tabIncome').map((data) => (
              <tr key={data.id}>
                <td>{data.date.slice(5)}</td>
                <td>{data.item}</td>
                <td>{data.amount}</td>
                <td>{data.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>項目</th>
              <th>金額</th>
              <th>メモ</th>
            </tr>
          </thead>
          <tbody>
            {reportData.filter((data) => data.tab === 'tabExpense').map((data) => (
              <tr key={data.id}>
                <td>{data.date.slice(5)}</td>
                <td>{data.item}</td>
                <td>{data.amount}</td>
                <td>{data.memo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
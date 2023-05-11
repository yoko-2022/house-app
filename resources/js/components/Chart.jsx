import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ incomePercentage, expensePercentage }) => {
  const dataIncome = {
    labels: Object.keys(incomePercentage),
    datasets: [
      {
        label: 'Income',
        data: Object.values(incomePercentage),
        backgroundColor: [
          '#eda184',
          '#6eb7db',
          '#df81a2',
          '#e19b3b',
          '#efd3bd',
          '#8abeb9'
        ],
        borderColor: [
          '#eda184',
          '#6eb7db',
          '#df81a2',
          '#e19b3b',
          '#efd3bd',
          '#8abeb9'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const dataExpense = {
    labels: Object.keys(expensePercentage),
    datasets: [
      {
        label: 'Expense',
        data: Object.values(expensePercentage),
        backgroundColor: [
          '#eda184',
          '#6eb7db',
          '#df81a2',
          '#e19b3b',
          '#efd3bd',
          '#8abeb9'
        ],
        borderColor: [
          '#eda184',
          '#6eb7db',
          '#df81a2',
          '#e19b3b',
          '#efd3bd',
          '#8abeb9'
        ],
        borderWidth: 1,
      },
    ],
  }; 

  return (
    <div className='data'>
      <div>
        <Doughnut
          data={dataIncome}
          width='100%'
          options={{ maintainAspectRatio: false }}
          />
      </div>
      <div>
        <Doughnut
          data={dataExpense}
          width='100%'
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default Chart;
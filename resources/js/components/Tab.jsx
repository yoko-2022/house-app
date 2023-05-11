import { useState } from 'react';
import Report from './Report';
import Form from './Form';

const Tab = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className='tab'>
      <h1>家計簿アプリ</h1>
      <button
        className={activeTab === 'tab1' ? 'IsActive' : ''}
        onClick={() => setActiveTab('tab1')}>
        日々の記録
      </button>
      <button
        className={activeTab === 'tab2' ? 'IsActive' : ''}
        onClick={() => setActiveTab('tab2')}>
        月間レポート
      </button>
      {activeTab === 'tab1' ? <Form /> : <Report />}
    </div>
  );
};

export default Tab;